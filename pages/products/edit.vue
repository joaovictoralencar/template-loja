<template>
  <section>
    <Form
      :labels="labels"
      :submitFunction="editProduct"
      :formTitle="'Adicione seu produto'"
      :submitText="'Confirmar'"
      :product="product"
      @name-listener="updateName"
      @price-listener="updatePrice"
      @description-listener="updateDescription"
      @filePath-listener="updateFilePath"
    />
    <FeedbackModal v-if="showModal" :closeFunction="closeModal" :message="feedBackMessage" :color="feedBackColor" />
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
      filePath: 'produto.jpg'
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
      return this.$route.params.productId || this.$cookies.get('edit-productId')
    },
    product () {
      return this.$store.state.products.all.find(product => product.id === Number(this.productId))
    },
    labels () {
      return [
        { title: 'Nome', name: 'name', type: 'text', required: false, value: this.product.name },
        { title: 'Preço', name: 'price', type: 'number', required: false, value: this.product.price },
        { title: 'Descrição', name: 'description', type: 'text-area', required: false, value: this.product.description },
        { title: 'Imagem do Produto', name: 'filePath', type: 'file', required: false, value: this.product.filePath }
      ]
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('products/fetchAllProducts')
    if (params.id) { await store.dispatch('products/fetchProduct', params.id) }
  },
  mounted () {
    const idCookie = this.$cookies.get('edit-productId')
    if (!idCookie || idCookie !== this.productId) {
      this.$cookies.set('edit-productId', this.productId.toString(), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
      this.$router.push({ name: 'products' })
    },
    async editProduct (product) {
      try {
        const formData = new FormData()
        formData.append('filePath', this.filePath)
        formData.append('name', this.name)
        formData.append('price', this.price)
        formData.append('description', this.description)
        formData.append('productId', this.productId)
        await this.$axios.patch('api/products/edit', formData)
        this.showModal = true
        this.message = this.name + ' foi editado com sucesso!'
        this.color = 'green'
      } catch (e) {
        console.error(e.response.data.message)
        this.showModal = true
        this.color = 'red'
        this.message = 'Algo deu errado'
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
