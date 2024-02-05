<template>
  <div>
    <div class="pt-5 space-y-6">
      <UiInput placeholder="@username" label="Username" v-model="data.username" />
      <UiInput placeholder="********" label="Password" type="password" v-model="data.password" />
      <div class="flex items-center justify-center">
        <UiButton @on-click="handleLogin" liquid>Log In</UiButton>
      </div>
    </div>
  </div>
</template>
<script setup>

const { login } = useAuth()


const data = reactive({
  password: '',
  username: '',
  loading: false
})

async function handleLogin() {
  data.loading = true
  try {
    await login({ username: data.username, password: data.password })
  } catch (error) {
    alert(JSON.stringify(error))
  } finally {
    data.loading = false
  }
}
</script>
