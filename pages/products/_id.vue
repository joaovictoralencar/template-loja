<template>
  <div class="container">
    <article>
      <h1 class="title">
        {{ product.name }}
      </h1>
      <p>R$: {{ product.price }}</p>
      <p>{{ product.description }}</p>
    </article>
    <aside v-if="relatedProducts.length > 0">
      <h3>Products you might enjoy</h3>
      <ul>
        <li v-for="related in relatedProducts" :key="related.id">
          <nuxt-link :to="{ name: 'products-id', params: { id: related.id } }">
            {{ related.name }}
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: this.product.name,
      meta: [
        { name: 'twitter:title', content: this.product.name },
        { name: 'twitter:description', content: this.product.content },
        { name: 'twitter:image', content: 'https://i.imgur.com/UYP2umJ.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    product () {
      return this.$store.state.products.all.find(product => product.id === Number(this.id))
    },
    relatedProducts () {
      return this.$store.state.products.all.filter(product => product.id !== Number(this.id))
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('products/fetchProduct', params.id)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  padding: 1rem;
}
article * {
  margin-bottom: 1rem;
}
aside {
  min-width: 280px;
  max-width: 280px;
  padding-left: 2rem;
}
.title {
  font-size: 2rem;
}
</style>
