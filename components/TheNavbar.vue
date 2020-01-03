<template>
  <nav class="nav">
    <div class="logo">
      <nuxt-link :to="{ name: 'index' }" class="logo text-lg">
        Makeup Market
      </nuxt-link>
      <span class="subheader">O importante é se sentir bem</span>
    </div>
    <nuxt-link
      v-if="!$auth.loggedIn"
      :to="{ name: 'login' }"
      class="login text-xs"
    >
      Você ainda não está logado(a). Por favor, faça login.
    </nuxt-link>
    <div v-else>
      <p>Olá, {{ $auth.user }}</p>
      <button @click="logout" class="button--grey text-base">
        Logout
      </button>
    </div>
  </nav>
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

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 70px;
  font-weight: lighter;
  letter-spacing: 0.5px;
}
.nav .logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nav .logo .subheader {
  opacity: 0.7;
  font-size: 0.9rem;
  color: white;
}
.nav .nav-content {
  font-size: 1rem;
}
.nav-content ul {
  display: flex;
  list-style: none;
}
.nav-content ul li {
  padding: 2px 10px;
}
.nav-content ul li:not(:first-of-type) {
  border-left: 1px solid rgb(255, 255, 255, 0.2);
}
</style>
