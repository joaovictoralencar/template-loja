<template>
  <div class="form-container">
    <h1 class="form-title">
      {{ formTitle }}
    </h1>
    <form @submit.prevent="submitFunction" enctype="multipart/form-data" class="form">
      <div v-for="label in labels" :key="label.name" class="input-label">
        <label :ref="label.title" :for="label.name" :class="'label-'+label.type" class="input-title">
          {{ label.title || label.name }}:
          <span id="fileName" v-if="label.type === 'file'" :ref="label.type+'Name'">Nenhuma imagem selecionada</span>
          <label :for="label.name" v-if="label.type === 'file'" class="input-file-button">
            Selecionar imagem
          </label>
        </label>
        <input
          v-if="label.type !== 'text-area'"
          v-model="label.bind"
          @input="showInfo($event, label.name, label.type)"
          @focus="paintInputOnFocus(label.title)"
          @blur="paintInputOnBlur(label.title)"
          :class="'input-'+label.type"
          :id="label.name"
          :type="label.type"
          :name="label.name"
          :placeholder="label.placeholder || ''"
          :required="label.required || false"
          :ref="label.name"
        >
        <textarea
          v-else
          v-model="label.bind"
          @input="showInfo($event, label.name, label.type)"
          @focus="paintInputOnFocus(label.title)"
          @blur="paintInputOnBlur(label.title)"
          :class="'input-'+label.type"
          :id="label.name"
          :type="label.type"
          :name="label.name"
          :placeholder="label.placeholder || ''"
          :required="label.required || false"
          :ref="label.name"
        />
      </div>
      <input :value="submitText" type="submit" class="input-submit">
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
  data () {
    return {
      fileName: null
    }
  },
  methods: {
    showInfo (event, labelName, labelType) {
      if (labelType !== 'file') { this.$emit(labelName + '-listener', event.target.value) } else {
        const file = this.$refs[labelName][0].files[0]
        this.$emit(labelName + '-listener', file)
        this.fileName = file.name
        this.$refs.fileName[0].textContent = this.fileName
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
  display: flex;
  align-items: center;
  flex-direction: column;
}
.form-container {
  max-width: 580px;
  width: auto;
  .input-label {
    display: flex;
    width: 100% !important;
    margin: 0.5rem 0;
    color: $pink;
    min-height: 30px;
    font-size: 16px;
    input {
      width: 100%;
      height: 30px;
      border: 0;
      outline: 0;
      border-bottom: 2px solid $pink;
      background-color: $main-bg-color !important;
      font-size: 16px;
      color: $grey-text;
    }
    #fileName{
      color: $grey-text-light;
      padding-right: 0.5rem;
    }
    .input-file{
      display: none;
    }
    .input-title{
      height: 30px;
      border: 0;
      outline: 0;
      border-bottom: 2px solid $pink;
      background-color: $main-bg-color;
      padding-right: 1rem;
      line-height: 1.8;
      &.focus{
        border-color:  $purple;
      }
      &.label-file {
        width: 100%;
        cursor: pointer;
      }
    }
    input:focus {
      border-color: $purple;
      outline: 1px dotted $black;
      outline-offset: -2px;
    }
    .input-file-button{
      min-height: 30px;
      background-image: linear-gradient(.25turn, $pink, $purple);
      cursor: pointer;
      float: right;
      padding: 0.1rem 1rem;
      margin: -6px -17px 0px 0px;
      border-radius: 10px;
      color: $white;
    }
    .input-text-area{
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
      width: 100%;
      height: 30px;
      min-height: 30px;
      border: 0;
      outline: 0;
      border-bottom: 2px solid $pink;
      background-color: $main-bg-color !important;
      font-size: 16px;
      color: $grey-text;
      &:focus{
        border-color: $purple;
        outline: 1px dotted $black;
        outline-offset: -2px;
      }
    }
  }
  input:-webkit-autofill, select:-webkit-autofill {
    box-shadow: 0 0 0 30px $main-bg-color inset;
    -webkit-box-shadow: 0 0 0 30px $main-bg-color inset;
    -webkit-text-fill-color: $grey-text !important;
    -webkit-text-size-adjust: auto;
    font: 300 16px Arial;
  }
  .input-submit {
    margin: 1rem 0 0 0;
    background-image: linear-gradient(.25turn, $pink, $purple);
    background-color: transparent;
    border: none;
    border-radius: 10px;
    padding: 1rem 2rem;
    color: $white;
    &:hover{
      cursor: pointer;
    }
  }
}

</style>
