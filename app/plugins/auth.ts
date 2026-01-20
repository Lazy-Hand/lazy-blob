export default defineNuxtPlugin(async () => {
  const { isAuthenticated, fetchUserInfo, userInfo } = useAuth()

  if (import.meta.client && isAuthenticated.value && !userInfo.value) {
    await fetchUserInfo()
  }
})
