<template>
  <nav class="nav">
    <div class="top-side">
      <div class="logo-container navbar-item">
        <nuxt-link :to="{ name: 'index' }" class="logo text-lg">
          <logo class="logo header" />
        </nuxt-link>
      </div>
      <SearchBar class="search-bar navbar-item" />
      <dropdown-login v-if="$auth" class="dropdown-login navbar-item" />
      <div @click="openCart" class="navbar-item cart">
        <svg
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 489 489"
          style="enable-background:new 0 0 489 489;"
          xml:space="preserve"
          width="25px"
          height="25px"
        ><g><g>
          <path d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3   c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1   C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462   H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41   c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#CF308A" />
        </g></g> </svg>
        <div class="cart-number">
          {{ cart.length }}
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
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  mounted () {
    const ccart = this.$cookies.get('cart')
    if (ccart) { console.log('aa', ccart) };
  },
  methods: {
    goToHome () {
      this.$router.push({ path: '/' })
    },
    openCart () {
      this.$router.push({ name: 'cart' })
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
  font-weight: lighter;
  letter-spacing: 0.5px;
  width: 100%;
  padding: 0 10rem;
  .top-side {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: $main-bg-color;
    .navbar-item {
      margin: 0.5rem;
    }
  }
  .bottom-side {
    display: flex;
    align-items: center;
    width: 100%;
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
.cart {
  display: flex;
  align-items: center;
  &:hover{
    cursor: pointer;
  }
  .cart-number{
    background-color: black;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    font-size: 12px;
    color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    position: relative;
    bottom: -10px;
    left: -12px;
  }
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
  padding: 0.8rem;
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.dropbtn:hover {
  background-color: black;
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

.search-bar{
  display: flex;
  margin-left: 2rem !important;
  margin-right: 2rem !important;
}
</style>
