<template>
  <div class="form-container">
    <h1 class="form-title">
      {{ formTitle }}
    </h1>
    <form @submit.prevent="submitFunction" enctype="multipart/form-data" class="form">
      <div v-for="label in labels" :key="label.name" class="input-label">
        <label :ref="label.title" :for="label.name" class="input-title">
          {{ label.title || label.name }}:
        </label>
        <input
          v-model="label.bind"
          @input="showInfo($event, label.name, label.type)"
          @focus="paintInputOnFocus(label.title)"
          @blur="paintInputOnBlur(label.title)"
          :type="label.type"
          :name="label.name"
          :placeholder="label.placeholder || ''"
          :required="label.required || false"
          :ref="label.name"
        >
      </div>
      <input :like="submitText" type="submit" class="input-submit">
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
    },
    paintInputOnFocus (labelTitle) {
      this.$refs[labelTitle][0].classList.add('focus')
    },
    paintInputOnBlur (labelTitle) {
      this.$refs[labelTitle][0].classList.remove('focus')
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.form {
  margin: 30px 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.form-container {
  min-width: 520px;
  width: auto;
  .input-label {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100% !important;
    margin: 0.5rem 0;
    color: #FC44AC;
    input {
      width: 100%;
      height: 30px;
      border: 0;
      outline: 0;
      border-bottom: 2px solid #FC44AC;
      background-color: #fdf3f3 !important;
      padding: 5px;
    }
    input[type='file']{
      display: flex;
      align-items: flex-end;
    }
    .input-title{
      height: 30px;
      border: 0;
      outline: 0;
      border-bottom: 2px solid #FC44AC;
      background-color: #fdf3f3;
      padding-right: 1rem;
      &.focus{
        border-color: #C705C4;
      }
    }
    input:focus {
      border-color: #C705C4;
      outline: 1px dotted #000;
      outline-offset: -2px;
    }
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fdf3f3 inset;
}
  .input-submit {
    margin: 1rem 0 0 0;
    background-image: linear-gradient(#FC008F, #C705C4);
    background-color: transparent;
    border: none;
    border-radius: 10px;
    padding: 1rem 2rem;
    color: white;
    &:hover{
      cursor: pointer;
    }
  }
}

</style>
