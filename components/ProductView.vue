<template>
  <section>
    <article class="product-container">
      <header>
        <nuxt-link :to="{ name: 'products-id', params: { id: product.id } }">
          <h2> {{ product.name }} </h2>
        </nuxt-link>
      </header>
      <p class="product-price">
        R${{ product.price }}
      </p><p />
      <figure v-if="product.filePath" class="product-image-container">
        <nuxt-link :to="{ name: 'products-id', params: { id: product.id } }">
          <img :src="product.filePath" :alt="'uma foto de ' + product.name" class="product-image">
        </nuxt-link>
        <!-- <figcaption>{{ product.name }}</figcaption> -->
      </figure>
      <slot name="bottomButtons" />
    </article>
  </section>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {
          name: 'Produto',
          price: 99.99,
          description: 'Um produto muito legal',
          filePath: 'images/products/batom.jpg',
          updatedAt: Date.now(),
          createdAt: Date.now()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.product-container{
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .product-image-container{
    margin: 1rem;
    width: 200px;
    height: 200px;
    background-color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    .product-image{
      width: 100%;
    }
  }
}

</style>
