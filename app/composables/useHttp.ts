import type { UseFetchOptions } from '#app'

export const useHttp = <T>(url: string | (() => string), options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig()

  return useFetch<T>(url, {
    baseURL: config.public.apiBase as string,
    ...options,
    onRequest(ctx: any) {
      ctx.options.headers = ctx.options.headers || {}

      const token = useCookie('accessToken')

      if (token.value) {
        if (Array.isArray(ctx.options.headers)) {
          ctx.options.headers.push(['Authorization', `Bearer ${token.value}`])
        } else if (ctx.options.headers instanceof Headers) {
          ctx.options.headers.set('Authorization', `Bearer ${token.value}`)
        } else {
          ctx.options.headers['Authorization'] = `Bearer ${token.value}`
        }
      }

      if (Array.isArray(ctx.options.headers)) {
        ctx.options.headers.push(['X-Client-Source', 'blob'])
      } else if (ctx.options.headers instanceof Headers) {
        ctx.options.headers.set('X-Client-Source', 'blob')
      } else {
        ctx.options.headers['X-Client-Source'] = 'blob'
      }

      if (!ctx.options.method || ctx.options.method.toUpperCase() === 'GET') {
        ctx.options.query = ctx.options.query || {}
        ctx.options.query._t = Date.now()
      }

      if (options.onRequest) {
        if (Array.isArray(options.onRequest)) {
          options.onRequest.forEach((hook: any) => hook(ctx))
        } else {
          (options.onRequest as Function)(ctx)
        }
      }
    },
    onResponseError(ctx: any) {
      console.error('API Error:', ctx.response.status, ctx.response._data)
      if (options.onResponseError) {
        if (Array.isArray(options.onResponseError)) {
          options.onResponseError.forEach((hook: any) => hook(ctx))
        } else {
          (options.onResponseError as Function)(ctx)
        }
      }
    }
  } as any)
}
