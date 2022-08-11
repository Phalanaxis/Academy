<template>
  <div class="password-change">
    <modal-slot class="password-change__slot">
      <auth-figures />
      <div class="password-change__title">Придумайте новый пароль</div>
      <n-input class="password-change__input" type="password" @blur="passwordValidHandler(password)" round clearable placeholder="Введите новый пароль" v-model:value="password.value" :status="password.isValid" />
      <n-input class="password-change__input" type="password" @blur="passwordRepeatValidHandler(repeatPassword)" round clearable placeholder="Повторите новый пароль" v-model:value="repeatPassword.value" :status="repeatPassword.isValid" />
      <round-button 
        class="password-change__enter-button"
        buttonPlaceholder="Сохранить"
        @buttonEvent="savePassword()"
      />
    </modal-slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useProfileStore } from '@/stores/profile'
import modalSlot from '@/components/ui/modalSlot.vue'
import RoundButton from '@/components/ui/RoundButton.vue'
import authFigures from '@/components/elements/authFigures.vue'

export default {
  components: {
    modalSlot,
    RoundButton,
    authFigures
  },
  setup() {
    const profile = useProfileStore()
    const route = useRoute()
    const router = useRouter()
    const password = ref({
      value: '',
      isValid: ''
    })
    const repeatPassword = ref({
      value: '',
      isValid: ''
    })
    const message = useMessage()
    function savePassword () {
      if (password.value.isValid === 'success' && repeatPassword.value.isValid === 'success') {
        const data = {
          code: route.query.code,
          password: password.value.value,
          passwordConfirmation: repeatPassword.value.value
        }
        profile.resetPassword(data).then((result) => {
          if(result === 'success') {
            message.success('Пароль успешно изменен')
            router.push('/')
          } else {
            message.error('Что то пошло не так')
          }
        })
      } else {
        password.value.isValid = 'error'
        repeatPassword.value.isValid = 'error'
        message.error('Введите новый пароль и повторите его')
      }
    }
    function passwordValidHandler (item) {
      const regEx = /^([a-zA-Z0-9\u0400-\u04FF\?!_()-])*$/
      if (item.value.length < 8 || regEx.test(item.value) === false) {
        item.isValid = 'error'
      } else {
        item.isValid = 'success'
      }
    }
    function passwordRepeatValidHandler (item) {
      const regEx = /^([a-zA-Z0-9\u0400-\u04FF\?!_()-])*$/
      if (item.value.length < 8 || regEx.test(item.value) === false || item.value !== password.value.value) {
        item.isValid = 'error'
      } else {
        item.isValid = 'success'
      }
    }
    return {
      profile,
      password,
      message,
      repeatPassword,
      savePassword,
      passwordValidHandler,
      passwordRepeatValidHandler
    }
  }
}
</script>

<style lang="scss" scoped>
  .password-change {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__slot {
      height: 470px;
    }
    &__title {
      pointer-events: none;
      display: flex;
      justify-content: center;
      font-size: 16px;
      line-height: 20px;
      color: #78353E;
      margin: 0 0 80px 0;
    }
    &__input {
      width: 410px;
      margin: 0 0 20px 0;
    }
    &__enter-button {
      margin: 50px 0 0 0;
    }
  }
</style>