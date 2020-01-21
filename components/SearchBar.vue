<template>
  <div class="search-input-container">
    <input class="search-input" type="text" placeholder="Que produto procuras?">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.search-input-container {
    margin: 1rem;
    .search-input {
      padding: 0.5rem 0.8rem;
      width: 300px;
      border: solid 1.5px;
      border-color: $dark-pink;
      outline: 0;
      font-size: 16px;
      border-radius: 20px;
    }
}

</style>
