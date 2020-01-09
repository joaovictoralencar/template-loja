<template>
  <div class="container">
    <Form
      :labels="labels"
      :submitFunction="registration"
      :formTitle="'Adicione seu produto'"
      :submitText="'Adicionar'"
      @name-listener="updateName"
      @price-listener="updatePrice"
      @description-listener="updateDescription"
      @filePath-listener="updateFilePath"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
import Form from '~/components/Form.vue'

export default {
  components: {
    Form
  },
  data () {
    return {
      name: '',
      description: '',
      price: 0,
      filePath: '',
      labels: [
        { title: 'Nome', name: 'name', type: 'text', placeholder: 'Super produto', required: true },
        { title: 'Preço', name: 'price', type: 'number', placeholder: '99.99', required: true },
        { title: 'Descrição', name: 'description', type: 'text', placeholder: 'Super descrição', required: false },
        { title: 'Imagem do Produto', name: 'password', type: 'file', placeholder: 'produto.png', required: false }
      ]
    }
  },
  methods: {
    async registration () {
      try {
        console.log(this.filePath)
        await this.$axios.post('api/products/register', {
          name: this.name,
          description: this.description,
          price: this.price,
          filePath: this.filePath
        })
        this.name = ''
        this.description = ''
        this.price = 0
        this.filePath = ''
      } catch (e) {
        console.error(e.response.data.message)
      }
    },
    updateName (e) {
      this.name = e
    },
    updatePrice (e) {
      this.price = e
    },
    updateDescription (e) {
      this.description = e
    },
    updateFilePath (e) {
      this.filePath = e
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
