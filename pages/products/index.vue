<template>
  <section class="links">
    <product-view
      v-for="product in products"
      :key="product.id"
      :product="product"
    >
      <template v-slot:bottomButtons>
        <section class="btn-controller">
          <button @click="editProduct(product)" class="btn editar">
            Editar
          </button>
          <button @click="removeProduct(product)" class="btn remover">
            Remover
          </button>
        </section>
      </template>
    </product-view>
  </section>
</template>

<script>
import ProductView from '~/components/ProductView.vue'

export default {
  head () {
    return {
      title: 'Todos os nosso Produtos',
      meta: [
        { name: 'twitter:title', content: 'Nuxt Fundamentals by Vue School' },
        { name: 'twitter:description', content: 'Nuxt + Vue School = 🍕' },
        { name: 'twitter:image', content: 'https://i.imgur.com/UYP2umJ.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  components: {
    ProductView
  },
  computed: {
    products () {
      return this.$store.state.products.all
    }
  },
  async fetch ({ store }) {
    // dispatch action fetchAllProducts
    await store.dispatch('products/fetchAllProducts')
  },
  methods: {
    async removeProduct (product) {
      try {
        await this.$axios.delete('api/products/delete', { data: { id: product.id } })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.response.data.message)
      }
    },
    editProduct (product) {
      this.$router.push({ name: 'products-edit', params: { productId: product.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.links {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.btn-controller{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .editar, .remover {
        padding: 0.8rem;
        margin: 0 0.1rem;
        width: 80px;
      }
  }
</style>
