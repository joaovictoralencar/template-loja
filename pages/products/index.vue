<template>
  <div>
    <div class="links">
      <nuxt-link
        v-for="product in products"
        :key="product.id"
        :to="{ name: 'products-id', params: { id: product.id } }"
        class="button--grey"
      >
        {{ product.name }}
        <img v-if="product.filePath" :src="product.filePath" :alt="'uma foto de ' + product.name" class="product-image">
      </nuxt-link>
    </div>
  </div>
</template>

<script>
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

</style>
