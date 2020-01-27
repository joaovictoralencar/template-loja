<template>
  <section v-if="cart" class="products">
    <product-view
      v-for="product in cart"
      :key="product.id"
      :product="product"
    /></product-view>
  </section>
</template>

<script>
import ProductView from '~/components/ProductView.vue'

export default {
  components: {
    ProductView
  },
  computed: {
    cart () {
      return this.$cookies.get('cart')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  &.products{
    padding-top: 15px;
    display: flex;
    flex-direction: row !important;
    justify-content: center;
    flex-wrap: wrap !important;
    align-items: center;
  }
}

</style>
