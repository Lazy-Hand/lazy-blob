<script setup lang="ts">
const { userInfo, displayName, userAvatar, logout, fetchUserInfo } = useAuth()
const { t } = useI18n()

definePageMeta({
  middleware: ['auth']
})

onMounted(() => {
  if (!userInfo.value) {
    fetchUserInfo()
  }
})

const isEditing = ref(false)
const editForm = reactive({
  nickname: '',
  email: '',
  mobile: ''
})

const startEdit = () => {
  if (userInfo.value) {
    editForm.nickname = userInfo.value.nickname
    editForm.email = userInfo.value.email
    editForm.mobile = userInfo.value.mobile
  }
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveProfile = () => {
  isEditing.value = false
}

const handleLogout = async () => {
  await logout()
}

const genderText = computed(() => {
  if (!userInfo.value) return ''
  const genderMap: Record<string, string> = {
    '0': t('profile.genderUnknown'),
    '1': t('profile.genderMale'),
    '2': t('profile.genderFemale')
  }
  return genderMap[userInfo.value.gender] || t('profile.genderUnknown')
})

const statusText = computed(() => {
  if (!userInfo.value) return ''
  return userInfo.value.status === '1' ? t('profile.statusNormal') : t('profile.statusDisabled')
})
</script>

<template>
  <div class="container mx-auto px-4 sm:px-8 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">
          {{ t('profile.title') }}
        </h1>
        <p class="mt-2 text-muted-foreground">
          {{ t('profile.subtitle') }}
        </p>
      </div>

      <ClientOnly>
        <div v-if="userInfo" class="space-y-6">
        <div class="rounded-lg border bg-card p-6">
          <div class="flex items-start gap-6">
            <img
              :src="userAvatar"
              :alt="displayName"
              class="h-24 w-24 rounded-full border-2 border-border"
            >
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold">
                    {{ displayName }}
                  </h2>
                  <p class="text-sm text-muted-foreground">
                    @{{ userInfo.username }}
                  </p>
                </div>
                <Button v-if="!isEditing" @click="startEdit">
                  {{ t('profile.editProfile') }}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-lg border bg-card p-6">
          <h3 class="text-lg font-semibold mb-4">
            {{ t('profile.basicInfo') }}
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div v-if="!isEditing">
              <label class="text-sm font-medium text-muted-foreground">
                {{ t('profile.username') }}
              </label>
              <p class="mt-1 text-foreground">
                {{ userInfo.username }}
              </p>
            </div>
            <div>
              <label class="text-sm font-medium text-muted-foreground">
                {{ t('profile.nickname') }}
              </label>
              <p v-if="!isEditing" class="mt-1 text-foreground">
                {{ userInfo.nickname }}
              </p>
              <Input
                v-else
                v-model="editForm.nickname"
                class="mt-1"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-muted-foreground">
                {{ t('profile.email') }}
              </label>
              <p v-if="!isEditing" class="mt-1 text-foreground">
                {{ userInfo.email }}
              </p>
              <Input
                v-else
                v-model="editForm.email"
                class="mt-1"
                type="email"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-muted-foreground">
                {{ t('profile.mobile') }}
              </label>
              <p v-if="!isEditing" class="mt-1 text-foreground">
                {{ userInfo.mobile || t('profile.mobileNotSet') }}
              </p>
              <Input
                v-else
                v-model="editForm.mobile"
                class="mt-1"
                type="tel"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-muted-foreground">
                {{ t('profile.gender') }}
              </label>
              <p class="mt-1 text-foreground">
                {{ genderText }}
              </p>
            </div>
            <div>
              <label class="text-sm font-medium text-muted-foreground">
                {{ t('profile.status') }}
              </label>
              <p class="mt-1 text-foreground">
                <Badge :variant="userInfo.status === '1' ? 'default' : 'secondary'">
                  {{ statusText }}
                </Badge>
              </p>
            </div>
          </div>

          <div v-if="isEditing" class="mt-6 flex gap-3">
            <Button @click="saveProfile">
              {{ t('profile.save') }}
            </Button>
            <Button variant="outline" @click="cancelEdit">
              {{ t('profile.cancel') }}
            </Button>
          </div>
        </div>

        <div class="rounded-lg border bg-card p-6">
          <h3 class="text-lg font-semibold mb-4">
            {{ t('profile.accountActions') }}
          </h3>
          <div class="space-y-3">
            <Button variant="outline" class="w-full justify-start" @click="handleLogout">
              <span class="i-lucide-log-out mr-2" />
              {{ t('profile.logout') }}
            </Button>
          </div>
        </div>
      </div>
      </ClientOnly>
    </div>
  </div>
</template>
