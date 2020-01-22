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
    flex-grow: 1;
    .search-input {
      width: 100%;
      padding: 0.5rem 0.8rem;
      border: solid 1.5px;
      border-color: $dark-pink;
      outline: 0;
      font-size: 16px;
      border-radius: 20px;
    }
}

</style>
