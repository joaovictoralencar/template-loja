<template>
  <div class="container">
    <h1>Preencha com os dados do produto</h1>
    <form @submit.prevent="registration()" class="form">
      <input
        v-model="name"
        class="input-label"
        type="text"
        name="name"
        placeholder="Makeup"
        required
      >
      <input
        v-model="description"
        class="input-label"
        type="text"
        name="description"
        placeholder="A super cool product"
        required
      >
      <input
        v-model="price"
        class="input-label"
        type="number"
        name="price"
        placeholder="199.99"
        required
      >
      <input type="submit" class="button--grey">
    </form>
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  data () {
    return {
      name: '',
      description: '',
      price: ''
    }
  },
  methods: {
    async registration () {
      try {
        await this.$axios.post('api/products/register', {
          name: this.name,
          description: this.description,
          price: this.price
        })
        this.name = ''
        this.description = ''
        this.price = ''
      } catch (e) {
        console.error(e.response.data.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
