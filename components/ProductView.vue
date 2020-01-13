<template>
  <section class="container">
    <article class="product-container">
      <header>
        <h2> {{ product.name }} </h2>
      </header>
      <p class="product-price">
        R${{ product.price }}
      </p><p />
      <figure v-if="product.filePath" class="product-image-container">
        <img :src="product.filePath" :alt="'uma foto de ' + product.name" class="product-image">
        <!-- <figcaption>{{ product.name }}</figcaption> -->
      </figure>
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
  .product-price {
    color: green;
  }
  .product-image-container{
    max-width: 300px;
    .product-image{
      width: 100%;
    }
  }
}

</style>
