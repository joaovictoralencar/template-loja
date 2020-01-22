<template>
  <div class="dropdown-login-container">
    <div v-if="$auth.loggedIn">
      <p>Olá, {{ $auth.user.username }}</p>
      <button @click="logout" class="button--grey text-base">
        Logout
      </button>
    </div>
    <div v-else class="dropdown-login-container">
      <div class="dropdown">
        <nuxt-link
          :to="{ name: 'login' }"
          class="dropbtn"
        >
          <p>OLÁ, VISITANTE</p>
          <p class="login-text">
            Clique aqui para entrar
          </p>
        </nuxt-link>
        <div class="dropdown-content">
          <nav>
            <nuxt-link to="/login">
              Meus pedidos
            </nuxt-link>
            <nuxt-link to="/login">
              Minha conta
            </nuxt-link>
          </nav>
        </div>
      </div>
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
.dropdown-login-container {
  color: $dark-pink !important;
}
.login-text {
  color: $dark-pink !important;
  font-size: 0.7rem;
}
/* dropdown */

.dropdown {
  float: left;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
}

.dropdown-login .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  p {
    color: $black;
  }
}

.dropdown-content {
  display: none;
  padding-top: 2px;
  position: absolute;
  background-color: $main-bg-color;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 1rem;
  text-decoration: none;
  display: block;
  text-align: center;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
  nav {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }
}
</style>
