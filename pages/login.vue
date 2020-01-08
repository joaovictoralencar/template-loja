<template>
  <div class="container-form">
    <div v-if="!signin" class="login">
      <h1>Faça Login</h1>
      <form @submit.prevent="login()" class="form">
        <input
          v-model="email"
          class="input-label"
          type="text"
          name="email"
          placeholder="Username"
          required
        >
        <input
          v-model="password"
          class="input-label"
          type="password"
          name="password"
          placeholder="Password"
          required
        >
        <input type="submit" class="button--grey" value="Logar">
      </form>
      <button @click="toggleRegistration" class="button--grey">
        Não tem uma conta? Cadastre-se aqui.
      </button>
    </div>
    <div v-else class="signin">
      <h1>Preencha seus dados</h1>
      <form @submit.prevent="registration()" class="form">
        <input
          v-model="username"
          class="input-label"
          type="text"
          name="username"
          placeholder="Fulano123"
          required
        >
        <input
          v-model="email"
          class="input-label"

          type="text"
          name="email"
          placeholder="email@email.com"
          required
        >
        <input
          v-model="password"
          class="input-label"
          type="password"
          name="password"
          placeholder="Password"
          required
        >
        <input type="submit" class="button--grey">
      </form>
      <p>
        <button @click="toggleRegistration" class="button--grey">
          Voltar para o login
        </button>
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  head () {
    return {
      title: 'Login'
      // meta: [
      //   { name: "twitter:title", content: this.product.title },
      //   { name: "twitter:description", content: 'this.product.content '},
      //   { name: "twitter:image", content: "https://i.imgur.com/UYP2umJ.png" },
      //   { name: "twitter:card", content: "summary_large_image" }
      // ]
    }
  },
  data () {
    return {
      signin: false,
      username: '',
      email: '',
      password: ''

    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.email = ''
        this.password = ''
      } catch (e) {
        console.error('error', e.response.data.message)
      }
    },
    async registration () {
      try {
        await this.$axios.post('api/users/register', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.username = ''
        this.email = ''
        this.password = ''
      } catch (e) {
        console.error(e.response.data.message)
      }
    },
    toggleRegistration () {
      this.signin = !this.signin
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  h1 {
    text-align: center;
  }
}
.form{
  background-color:#377086;
  padding: 50px;
  margin: 30px 0;
  border-radius: 5px;
  width: 332px;
}
.form,
.container-form, .login, .signin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-label{
  height: 30px;
  margin: 10px 0;
  width: 100%;
}
.button--grey {
  margin: 0 0 10px 0;
}
</style>
