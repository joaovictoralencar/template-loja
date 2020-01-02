<template>
  <div class="login-form">
    <div v-if="!signin">
      <h1>Login Form</h1>
      <form @submit.prevent="login()">
        <input
          v-model="loginInfo.email"
          type="text"
          name="email"
          placeholder="Username"
          required
        >
        <input
          v-model="loginInfo.password"
          type="password"
          name="password"
          placeholder="Password"
          required
        >
        <input type="submit">
      </form>
      <p>
        <button @click="toggleRegistration" class="btn">
          Não tem uma conta ainda? Cadastre-se aqui.
        </button>
      </p>
    </div>
    <div v-else>
      <h1>Sign In Form</h1>
      <form @submit.prevent="registration()">
        <!-- <form v-if="!$store.state.authUser" @submit.prevent="login"> -->
        <input type="text" name="name" placeholder="Name" required>
        <input type="text" name="username" placeholder="Username" required>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        >
        <input class="submit" type="submit">
      </form>
      <p>
        <!-- <button class="btn" @click="toggleRegistration">
          Voltar para o login
        </button>-->
      </p>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Login'
      // meta: [
      //   { name: "twitter:title", content: this.post.title },
      //   { name: "twitter:description", content: 'this.post.content '},
      //   { name: "twitter:image", content: "https://i.imgur.com/UYP2umJ.png" },
      //   { name: "twitter:card", content: "summary_large_image" }
      // ]
    }
  },
  data () {
    return {
      signin: false,
      loginInfo: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$auth.loginWith('local', {
        data: this.loginInfo
      })
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        alert(e.message)
      }
    },
    registration () {
      alert('You are cadastrando')
    },
    toggleRegistration () {
      this.signin = !this.signin
    }
  }
}
</script>

<style></style>
