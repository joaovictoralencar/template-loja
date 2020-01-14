<template>
  <section class="links">
    <product-view
      v-for="product in products"
      :key="product.id"
      :product="product"
      :edit="true"
      @editProduct="editProduct(product)"
      @removeProduct="removeProduct(product)"
    />
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
    async editProduct (product) {
      // try {
      //   await this.$axios.patch('api/products/delete', { data: { id: product.id } })
      // } catch (e) {
      //   // eslint-disable-next-line no-console
      //   console.error(e.response.data.message)
      // }
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
</style>
