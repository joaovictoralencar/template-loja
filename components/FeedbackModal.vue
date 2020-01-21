<template>
  <div class="modal-mask">
    <!-- ESTUDAR SOBRE SLOTS -->
    <section class="modal-container">
      <header class="modal-header">
        <h2>{{ title }}</h2>
      </header>
      <article class="modal-content">
        <p :style="{ color: color}">
          {{ message }}
        </p>
      </article>
      <button @click="close" class="btn close">
        Fechar
      </button>
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
    },
    closeFunction: {
      type: Function,
      required: true,
      default () {
        alert('give me a function')
      }
    }
  },
  methods: {
    close () {
      if (this.closeFunction) {
        this.closeFunction()
      } else { alert('give me a functioaaaaan') }
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .modal-container{
    background-color: $white;
    border: 5px solid #ccc;
    border-radius: 10px;
    min-width: 300px;
    padding: 1rem 0;
    .modal-header{
      border-bottom: $pink;
      padding: 1rem 0;
    }
    .modal-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-height: 100px;
      padding: 1rem 0;
    }
  }
}
</style>
