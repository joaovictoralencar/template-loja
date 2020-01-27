<template>
  <section>
    <header>
      <h1 class="title">
        Love and Makeup
      </h1>
      <h2 class="subtitle">
        Conheça nossos produtos
      </h2>
    </header>
    <section class="products">
      <product-view
        v-for="product in products"
        :key="product.id"
        :product="product"
      >
        <template v-slot:bottomButtons>
          <section class="btn-controller">
            <button @click="buy(product)" class="btn editar">
              Comprar
            </button>
          </section>
        </template>
      </product-view>
    </section>
  </section>
</template>

<script>
/* eslint-disable no-console */

import ProductView from '~/components/ProductView.vue'

export default {
  components: {
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
  },
  methods: {
    buy (product) {
      this.$store.commit('addToCart', product)
      const cart = this.$store.getters.getCart
      console.log(cart)
      this.$cookies.set('cart', cart, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 60px;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 36px;
  color: #526488;
  word-spacing: 5px;
}
.products{
  padding-top: 15px;
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  flex-wrap: wrap !important;
  align-items: center;
}
</style>
