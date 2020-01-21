<template>
  <nav class="nav">
    <div class="top-side">
      <div class="logo-container">
        <nuxt-link :to="{ name: 'index' }" class="logo text-lg">
          <logo class="logo header" />
        </nuxt-link>
        <!-- <span class="subheader">O importante é se sentir bem</span> -->
      </div>
      <div>
        <SearchBar />
      </div>
      <dropdown-login v-if="$auth" class="dropdown-login" />
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
import Logo from '~/components/Logo.vue'
import SearchBar from '~/components/SearchBar.vue'
import DropdownLogin from '~/components/DropdownLogin.vue'

export default {
  components: {
    Logo,
    SearchBar,
    DropdownLogin
  },
  methods: {
    goToHome () {
      alert('aaaaaaaaaaa')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped lang="scss">
nav {
margin-bottom: 40px;
  font-weight: lighter;
  letter-spacing: 0.5px;
  /* position: fixed;
  top: 0; */
  width: 100%;
  .top-side {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.8rem;
    background-color: $white;
  }
  .bottom-side {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    background-color: $dark-pink;
  }
}
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  flex-direction: column;
  .logo{
    width: 150px;
    &:hover{
      cursor: pointer;
    }
  }
}
.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nav .subheader {
  font-size: 0.9rem;
  color: $grey-text;
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
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: $main-bg-color;
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
