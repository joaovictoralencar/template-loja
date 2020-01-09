<template>
  <div>
    <h1>{{ formTitle }}</h1>
    <form @submit.prevent="submitFunction" enctype="multipart/form-data" class="form">
      <div v-for="label in labels" :key="label.name" class="input-label">
        {{ label.title || label.name }}:
        <input
          v-model="label.bind"
          @input="showInfo($event, label.name, label.type)"
          :type="label.type"
          :name="label.name"
          :placeholder="label.placeholder || ''"
          :required="label.required || false"
          :ref="label.name"
        >
      </div>
      <input :like="submitText" type="submit" class="button--grey">
    </form>
  </div>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true
    },
    submitFunction: {
      type: Function,
      required: true,
      default () {
        alert('provide a submit function')
      }
    },
    formTitle: {
      type: String,
      required: false,
      default: 'Formulário'
    },
    submitText: {
      type: String,
      required: false,
      default: 'Enviar'
    }
  },
  methods: {
    showInfo (event, labelName, labelType) {
      if (labelType !== 'file') { this.$emit(labelName + '-listener', event.target.value) } else {
        const file = this.$refs[labelName][0].files[0]
        this.$emit(labelName + '-listener', file)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.form {
  background-color: #377086;
  padding: 40px;
  margin: 30px 0;
  border-radius: 5px;
  width: auto;
}
.form,
.container-form,
.login,
.signin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-label {
  input {
    height: 30px;
    width: 100%;
  }
  margin: 10px 0;
  width: 100%;
}
.button--grey {
  margin: 0 0 10px 0;
}
</style>
