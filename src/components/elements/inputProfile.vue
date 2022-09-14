<template>
<div
  :class="{
    'list': true,
    'list_wait': isWait,
    'list_edit': isEdit,
    'list_error': isError,
    'list_success': isSuccess
  }"
  @click="switchEdit">
  <div class="list__title">
    {{ title }}
  </div>
    <input
      v-show="isEdit"
      :ref="type + 'input'"
      class="list__input"
      type="text"
      :value="value"
      @input="inputHendler"
      @keydown.enter="endEdit"
    >
  <div v-show="!isEdit" class="list__value">{{ value }}</div>
</div>

</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    type: String
  },
  emits: {
    setProfile: Object
  },
  expose: ['successHendler', 'errorHendler'],
  data () {
    return {
      isEdit: false,
      innerValue: '',
      isError: false,
      isSuccess: false,
      isWait: false
    }
  },
  methods: {
    switchEdit () {
      if (!this.isEdit) {
        this.isEdit = !this.isEdit
        setTimeout(() => {this.$refs[(this.type + 'input')].focus()}, 0);
      }
    },
    endEdit () {
      if (this.value === this.inputValue) {
        this.isEdit = !this.isEdit
      } else {
        this.isEdit = !this.isEdit
        this.isWait = true
        this.$emit('setProfile', {
          type: this.type,
          value: this.inputValue
        })
      }
    },
    inputHendler (e) {
      this.inputValue = e.target.value
    },
    errorHendler () {
      this.isWait = false
      this.isError = true
      setTimeout(() => {this.isError = false}, 3000)
    },
    successHendler () {
      this.isWait = false
      this.isSuccess = true
      setTimeout(() => {this.isSuccess = false}, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    width: 50%;
    margin: 0 0 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media screen and (max-width: 1280px) {
      width: 100%;
    }
    @media screen and (max-width: 680px) {
      margin: 0 0 30px;
    }
    &_edit {
      .list__title::after {
        background-color: #839389;
        animation: pulse;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        transition-timing-function: linear;
      }
    }
    &_error {
      .list__title::after {
        background-color: #78353E;
        background-image: url('@/assets/svg/cross.svg');
      }
    }
    &_success {
      .list__title::after {
        background-color: #644C5C;
        background-image: url('@/assets/svg/arrow.svg');
      }
    }
    &_wait {
      .list__title::after {
        background-color: #C89C7A;
        background-image: url('@/assets/svg/wait.svg');
        animation: roll;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        transition-timing-function: linear;
      }
    }
    &__title {
      display: inline-block;
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      letter-spacing: 0.02em;
      color: #6D6D6D;
      margin: 0 0 10px;
      position: relative;
      &::after {
        position: absolute;
        content: '';
        top: -4px;
        right: -28px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        z-index: 2;
        background-image: url('@/assets/svg/editPan.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 12px 12px;
        transition: background-color .3s;
      }
    }
    &__value {
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #000;
      height: 24px;
      width: 100%;
    }
    &__input {
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #000;
      background-color: transparent;
      padding: 0;
      border: none;
      height: 24px;
      width: 260px;
    }
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #839389;
    }
    50% {
      box-shadow: 0 0 0 4px #83938940;
    }
    100% {
      box-shadow: 0 0 0 0 #839389;
    }
  }
  @keyframes roll {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>