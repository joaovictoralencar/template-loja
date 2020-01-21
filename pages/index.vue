<template>
  <section class="container">
    <logo class="logo big" />
    <h1 class="title">
      Love and Makeup
    </h1>
    <h2 class="subtitle">
      Conheça nossos produtos
    </h2>
    <section class="links">
      <product-view
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </section>
  </section>
</template>

<script>
/* eslint-disable no-console */

import Logo from '~/components/Logo.vue'
import ProductView from '~/components/ProductView.vue'

export default {
  components: {
    Logo,
    ProductView
  },
  head () {
    return {
      meta: [
        { name: 'twitter:title', content: 'Nuxt Fundamentals by Vue School' },
        { name: 'twitter:description', content: 'Nuxt + Vue School = 🍕' },
        { name: 'twitter:image', content: 'https://i.imgur.com/UYP2umJ.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
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

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
}
.links {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
