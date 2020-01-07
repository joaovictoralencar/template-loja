<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        Template Loja
      </h1>
      <h2 class="subtitle">
        Home Page
      </h2>
      <div class="links">
        <nuxt-link
          v-for="product in products"
          :key="product.id"
          :to="{ name: 'products-id', params: { id: product.id } }"
          class="button--grey"
        >
          {{ product.name }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console */

import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  head () {
    return {
      title: 'Home Page 🍕',
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
  // mounted () {
  //   this.getProducts()
  // },
  // methods: {
  //   async getProducts () {
  //     try {
  //       await this.$axios.get('products/all').then((response) => {
  //         console.log(response.data.products)
  //       })
  //     } catch (e) {
  //       console.error(e.response.data.message)
  //     }
  //   }
  // }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
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
}
</style>
