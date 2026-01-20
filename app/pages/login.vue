<script setup lang="ts">
const { login } = useAuthApi()
const { setToken, fetchUserInfo } = useAuth()
const { t } = useI18n()

const form = reactive({
  username: '',
  password: ''
})

const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''

  if (!form.username || !form.password) {
    error.value = t('auth.usernameRequired')
    return
  }

  isLoading.value = true

  try {
    const { data, error: loginError } = await login(form)

    if (loginError.value) {
      error.value = t('auth.loginError')
      return
    }

    if (data.value?.accessToken) {
      setToken(data.value.accessToken)
      await fetchUserInfo()
      await navigateTo('/')
    } else {
      error.value = t('auth.loginNoToken')
    }
  } catch (e) {
    error.value = t('auth.loginNetworkError')
    console.error('Login error:', e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight">
          {{ t('auth.loginTitle') }}
        </h2>
        <p class="mt-2 text-muted-foreground">
          {{ t('auth.loginSubtitle') }}
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium">
              {{ t('auth.username') }}
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-0 px-3 py-2 text-foreground bg-background shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              :placeholder="t('auth.username')"
              :disabled="isLoading"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium">
              {{ t('auth.password') }}
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 block w-full rounded-md border-0 px-3 py-2 text-foreground bg-background shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              :placeholder="t('auth.password')"
              :disabled="isLoading"
            >
          </div>
        </div>

        <div v-if="error" class="rounded-md bg-destructive/10 p-4">
          <p class="text-sm text-destructive">
            {{ error }}
          </p>
        </div>

        <Button
          type="submit"
          class="w-full"
          :disabled="isLoading"
        >
          <span v-if="isLoading">{{ t('auth.loginButtonLoading') }}</span>
          <span v-else>{{ t('auth.loginButton') }}</span>
        </Button>
      </form>
    </div>
  </div>
</template>
