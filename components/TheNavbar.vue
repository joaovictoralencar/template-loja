<template>
  <nav class="nav">
    <div class="top-side">
      <div class="logo">
        <nuxt-link :to="{ name: 'index' }" class="logo text-lg">
          Makeup Market
        </nuxt-link>
        <span class="subheader">O importante é se sentir bem</span>
      </div>
      <div v-if="$auth">
        <nuxt-link
          v-if="!$auth.loggedIn"
          :to="{ name: 'login' }"
          class="login text-xs"
        >
          Você ainda não está logado(a). Por favor, faça login.
        </nuxt-link>
        <div v-else>
          <p>Olá, {{ $auth.user.username }}</p>
          <button @click="logout" class="button--grey text-base">
            Logout
          </button>
        </div>
      </div>
    </div>
    <div class="bottom-side">
      <div class="dropdown">
        <button class="dropbtn">
          Gerenciar Produtos
          <i class="fa fa-caret-down" />
        </button>
        <div class="dropdown-content">
          <nuxt-link to="/products">
            Ver todos os produtos
          </nuxt-link>
          <nuxt-link to="/products/add">
            Adicionar produto
          </nuxt-link>
          <nuxt-link to="/products/edit">
            Editar/Remover produto
          </nuxt-link>
        </div>
      </div>
      <div v-if="$auth.loggedIn" class="dropdown">
        <button class="dropbtn">
          Gerenciar Conta
          <i class="fa fa-caret-down" />
        </button>
        <div class="dropdown-content">
          <nuxt-link to="/user">
            Ver meus dados
          </nuxt-link>
          <nuxt-link to="/user/edit">
            Editar meus dados
          </nuxt-link>
        </div>
      </div>
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

<style scoped lang="scss">
nav {
  margin-bottom: 70px;
  font-weight: lighter;
  letter-spacing: 0.5px;
  /* position: fixed;
  top: 0; */
  width: 100%;
  background-color: #112F41;
  .top-side {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: #112F41;
  }
  .bottom-side {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    background-color: $purple;
  }
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
  border-left: 1px solid rgb(255, 255, 255);
}
/* dropdown */

.dropdown {
  float: left;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
p {
  color: white;
}
</style>
