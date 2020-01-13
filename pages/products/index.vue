<template>
  <section class="links">
    <nuxt-link
      v-for="product in products"
      :key="product.id"
      :to="{ name: 'products-id', params: { id: product.id } }"
    >
      <product-view :product="product" />
    </nuxt-link>
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
