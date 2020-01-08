<template>
  <div class="container-form">
    <Form :labels="labels" :submit="registration" :formTitle="'Faça Login'" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import Form from '~/components/Form.vue'

export default {
  components: {
    Form
  },
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
      labels: [
        { title: 'Nome', name: 'name', type: 'text', placeholder: 'Fulano', required: true },
        { title: 'E-mail', name: 'email', type: 'text', placeholder: 'fulano@gmail.com', required: true },
        { title: 'Senha', name: 'password', type: 'password', placeholder: '*******', required: true }
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
