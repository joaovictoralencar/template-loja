<template>
  <div class="modal-mask">
    <!-- ESTUDAR SOBRE SLOTS -->
    <section class="modal-container">
      <header :style="{ backgroundColor: color}" class="modal-header">
        >
        <h2>{{ title }}</h2>
      </header>
      <article class="modal-content">
        <p>{{ message }}</p>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Mensagem',
      required: false
    },
    message: {
      type: String,
      default: 'Esta é a mensagem que eu queria te passar',
      required: true
    },
    color: {
      type: String,
      default: '#000',
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  .modal-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 300px;
    .modal-header{
      border-bottom: $pink;
      height: 50px;
    }
    .modal-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100px;
    }
  }
}
</style>
