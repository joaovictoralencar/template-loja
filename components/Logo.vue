<template>
  <img class="NuxtLogo" src="/images/logo.png" alt="">
</template>
<style lang="scss" scoped>
.NuxtLogo {
  animation: 1s appear;
  max-width: 500px;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
