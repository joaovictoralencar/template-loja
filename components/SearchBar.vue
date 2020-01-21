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
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        width: 300px;
        border-color: $grey-text-light;
        border: solid 1px;
        outline: 0;
        border-radius: 8px;
    }
}

</style>
