<template>
  <div class="margin">
    <TheNavbar />
    <nuxt class="container" />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
export default {
  head () {
    return {
      title: 'Love and Makeup'
    }
  },
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">
.margin{
  margin: 0 10%;
}
</style>
