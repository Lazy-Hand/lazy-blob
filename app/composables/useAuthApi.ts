import type { LoginDto, LoginResult, UserEntity, ApiResultWithData, ApiResult } from '~/types'

export const useAuthApi = () => {
  const login = async (credentials: LoginDto) => {
    const { data, error, pending } = await useHttp<ApiResultWithData<LoginResult>>(
      '/api/login',
      {
        method: 'POST',
        body: credentials
      }
    )

    return {
      data: computed(() => data.value?.data),
      error,
      pending
    }
  }

  const getUserInfo = async () => {
    const { data, error, pending } = await useHttp<ApiResultWithData<UserEntity>>(
      '/api/userInfo',
      {
        method: 'GET'
      }
    )

    return {
      data: computed(() => data.value?.data),
      error,
      pending
    }
  }

  const logout = async () => {
    const { data, error, pending } = await useHttp<ApiResult>(
      '/api/logout',
      {
        method: 'POST'
      }
    )

    return {
      data,
      error,
      pending
    }
  }

  return {
    login,
    getUserInfo,
    logout
  }
}
