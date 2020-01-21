<template>
  <div class="dropdown-login-container">
    <nuxt-link
      v-if="!$auth.loggedIn"
      :to="{ name: 'login' }"
      class="text-xs"
    >
      Olá, visitante
    </nuxt-link>
    <div v-else>
      <p>Olá, {{ $auth.user.username }}</p>
      <button @click="logout" class="button--grey text-base">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  color: $dark-pink !important;
}
</style>
