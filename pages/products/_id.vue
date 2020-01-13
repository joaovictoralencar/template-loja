<template>
  <section v-if="product" class="container product-id">
    <article class="container">
      <header>
        <h1 class="title">
          {{ product.name }}
        </h1>
      </header>
      <p>R$: {{ product.price }}</p>
      <figure v-if="product.filePath">
        <img :src="product.filePath" :alt="'uma foto de ' + product.name" class="product-image">
        <figcaption>{{ product.name }}</figcaption>
      </figure>
      <p>{{ product.description }}</p>
    </article>
    <aside v-if="relatedProducts.length > 0">
      <article>
        <header>
          <h3>Products you might enjoy</h3>
        </header>
        <ul>
          <li v-for="related in relatedProducts" :key="related.id">
            <nuxt-link :to="{ name: 'products-id', params: { id: related.id } }">
              {{ related.name }}
            </nuxt-link>
          </li>
        </ul>
      </article>
    </aside>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: this.product.name || 'teste',
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
    await store.dispatch('products/fetchAllProducts')
    await store.dispatch('products/fetchProduct', params.id)
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: relative;
  &.product-id {
    width: 100%;
  }
}
article * {
  margin-bottom: 1rem;
}
aside {
  min-width: 280px;
  max-width: 280px;
  padding-left: 2rem;
  position: absolute;
  right: 0%;
  top: 0%;
}
.title {
  font-size: 2rem;
}

</style>
