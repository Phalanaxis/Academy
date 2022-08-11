<template>
  <div class="restoration">
    <modal-slot class="restoration__slot">
      <auth-figures />
        <div class="restoration__title">Забыли пароль?</div>
        <div v-if="profile.status === 'standing'" class="restoration__standing">
          <n-input class="restoration__input" name="mail" @blur="validateMail()" round clearable placeholder="Email" v-model:value="mailValue" :status="isMailValid" />
          <div class="restoration__description">Введите адрес электронной почты, который вы использовали для регистрации. Вам будет отправлено письмо с инструкциями по сбросу пароля.</div>
        </div>
        <div v-else-if="profile.status === 'success'" class="restoration__success">
          Письмо успешно отправлено на ваш Email.
        </div>
        <round-button 
          class="restoration__enter-button"
          buttonPlaceholder="Отправить письмо"
          @buttonEvent="sendMail()"
          :disabled="profile.status === 'success'"
        />
        <div class="restoration__authentification-link-block">
          Помните свой пароль?
          <router-link class="restoration__authentification-link" to="/authentification">
            Войти
          </router-link>
        </div>
    </modal-slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useProfileStore } from '@/stores/profile'
import modalSlot from '@/components/ui/modalSlot.vue'
import RoundButton from '@/components/ui/RoundButton.vue'
import authFigures from '@/components/elements/authFigures.vue'
export default {
  name: 'restoration',
  components: {
    modalSlot,
    RoundButton,
    authFigures
  },
  setup() {
    const profile = useProfileStore()
    const mailValue = ref('')
    const isMailValid = ref('')
    const message = useMessage()
    profile.status = 'standing'
    function sendMail () {
      if (isMailValid.value === 'success') {
        profile.restorePassword(mailValue.value)
      } else {
        message.error('Введите адрес электронной почты')
      }
    }
    function validateMail () {
      const regEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (mailValue.value.length < 3 || regEx.test(mailValue.value) === false) {
        isMailValid.value = 'error'
      } else {
        isMailValid.value = 'success'
      }
    }
    return {
      profile,
      mailValue,
      isMailValid,
      sendMail,
      validateMail
    }
  }
}
</script>

<style lang="scss" scoped>
  .restoration {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__slot {
      height: 470px;
      width: 630px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__success {
      font-size: 24px;
      line-height: 32px;
      font-weight: 600;
      color: #78353E;
      text-align: center;
      margin: 65px 0 0 0;
    }
    &__title {
      pointer-events: none;
      display: flex;
      justify-content: center;
      font-size: 16px;
      line-height: 20px;
      color: #78353E;
      margin: 0 0 40px 0;
    }
    &__input {
      width: 410px;
      margin: 0 0 20px 0;
    }
    &__description {
      color: #78353E;
    }
    &__enter-button {
      width: 410px;
      margin: 120px 0 0 0;
    }
    &__authentification-link-block {
      display: flex;
      justify-content: center;
      color: #78353E;
      margin: 20px 0 0 0;
    }
    &__authentification-link {
      margin: 0 0 0 5px;
      color: #644c5c;
    }
  }
</style>