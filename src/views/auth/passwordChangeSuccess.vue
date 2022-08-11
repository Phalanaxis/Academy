<template>
  <div class="password-change-success">
    <modal-slot class="password-change-success__slot">
      <auth-figures />
      <div class="password-change-success__title">Пароль успешно<br>сохранен</div>
      <round-button 
        class="password-change-success__enter-button"
        buttonPlaceholder="Вернуться на страницу входа"
        @buttonEvent="returnToLogin()"
      />
    </modal-slot>
  </div>
</template>

<script>
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import modalSlot from '@/components/ui/modalSlot.vue'
import RoundButton from '@/components/ui/RoundButton.vue'
import authFigures from '@/components/elements/authFigures.vue'

export default {
  components: {
    modalSlot,
    RoundButton,
    authFigures
  },
  setup () {
    const message = useMessage()
    const router = useRouter()
    function returnToLogin () {
      router.push('/authentification')
    }
    return {
      message,
      returnToLogin
    }
  }
}
</script>

<style lang="scss" scoped>
  .password-change-success {
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
      text-align: center;
      font-weight: 600;
      font-size: 32px;
      line-height: 48px;
      color: #78353E;
      margin: 60px 0 68px 0;
    }
    &__input {
      width: 410px;
      margin: 0 0 20px 0;
    }
    &__enter-button {
      width: 410px;
      margin: 50px 0 0 0;
    }
  }
</style>