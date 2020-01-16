<template>
  <section class="container">
    <Form
      :labels="labels"
      :submitFunction="editProduct"
      :formTitle="'Adicione seu produto'"
      :submitText="'Adicionar'"
      @name-listener="updateName"
      @price-listener="updatePrice"
      @description-listener="updateDescription"
      @filePath-listener="updateFilePath"
    />
    <FeedbackModal v-if="showModal" :message="feedBackMessage" :color="feedBackColor" />
  </section>
</template>

<script>
/* eslint-disable no-console */
import Form from '~/components/Form.vue'
import FeedbackModal from '~/components/FeedbackModal.vue'

export default {
  components: {
    Form,
    FeedbackModal
  },
  data () {
    return {
      showModal: false,
      message: '',
      color: '',
      name: 'produto',
      description: 'mt bom',
      price: 600,
      filePath: {}
    }
  },
  computed: {
    feedBackMessage () {
      return this.message
    },
    feedBackColor () {
      return this.color
    },
    productId () {
      return this.$route.params.productId
    },
    product () {
      return this.$store.state.products.all.find(product => product.id === Number(this.productId))
    },
    labels () {
      return [
        { title: 'Nome', name: 'name', type: 'text', required: false, value: 'this.product.name' },
        { title: 'Preço', name: 'price', type: 'number', required: false, value: 'this.product.price' },
        { title: 'Descrição', name: 'description', type: 'text-area', required: false, value: 'this.product.description' },
        { title: 'Imagem do Produto', name: 'filePath', type: 'file', required: false, value: 'this.product.filePath' }
      ]
    }
  },
  created () {
    if (!this.product) {
      this.$router.push({ name: 'products' }) // salvar nos cookies qual é o id q o usuário ta editando
    }
  },
  methods: {
    async editProduct () {
      try {
        const formData = new FormData()
        formData.append('filePath', this.filePath)
        formData.append('name', this.name)
        formData.append('price', this.price)
        formData.append('description', this.description)
        await this.$axios.post('api/products/register', formData)
        // await this.$axios.patch('api/products/delete', { data: { id: product.id } })
        this.showModal = true
        this.message = name + ' foi adicionado com sucesso!'
        this.color = 'green'
        this.name = ''
        this.description = ''
        this.price = 0
        this.filePath = {}
      } catch (e) {
        console.error(e.response.data.message)
        this.showModal = true
        this.color = 'green'
        this.message = 'Algo deu errado'
      }
    },
    // async editProduct (product) {
    //   try {
    //     await this.$axios.patch('api/products/delete', { data: { id: product.id } })
    //   } catch (e) {
    //     // eslint-disable-next-line no-console
    //     console.error(e.response.data.message)
    //   }
    // },
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
