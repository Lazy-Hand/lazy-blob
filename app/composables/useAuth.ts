import type { UserEntity } from '~/types'

export const useAuth = () => {
  const token = useCookie('accessToken', {
    default: () => '',
    watch: true,
    maxAge: 60 * 60 * 24 * 7
  })

  const userInfo = useState<UserEntity | null>('userInfo', () => null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const setUserInfo = (user: UserEntity | null) => {
    userInfo.value = user
  }

  const clearAuth = () => {
    token.value = ''
    userInfo.value = null
  }

  const logout = async () => {
    const { logout: logoutApi } = useAuthApi()
    await logoutApi()
    clearAuth()
    navigateTo('/login')
  }

  const fetchUserInfo = async () => {
    if (!token.value) return

    const { getUserInfo } = useAuthApi()
    const { data, error } = await getUserInfo()

    if (!error.value && data.value) {
      userInfo.value = data.value
    }
  }

  const displayName = computed(() => {
    return userInfo.value?.nickname || userInfo.value?.username || '用户'
  })

  const userAvatar = computed(() => {
    return userInfo.value?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
  })

  return {
    token,
    userInfo,
    isAuthenticated,
    setToken,
    setUserInfo,
    clearAuth,
    logout,
    fetchUserInfo,
    displayName,
    userAvatar
  }
}
