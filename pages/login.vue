<template>
  <section>
    <Form
      :labels="labels"
      :submitFunction="login"
      :formTitle="'Faça Login'"
      :submitText="'Login'"
      @email-listener="updateEmail"
      @password-listener="updatePassword"
    />
  </section>
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
      email: '',
      password: '',
      labels: [
        { title: 'Email', name: 'email', type: 'text', placeholder: 'fulano@gmail.com', required: true },
        { title: 'Senha', name: 'password', type: 'password', placeholder: '*******', required: true }
      ]
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
        await this.$axios.patch('api/users/user/edit', {
          last_login: Date.now()
        })
      } catch (e) {
        console.error('error', e.response.data.message)
      }
    },
    updateEmail (e) {
      this.email = e
    },
    updatePassword (e) {
      this.password = e
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
