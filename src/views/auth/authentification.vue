<template>
  <div class="authentification">
    <modal-slot class="authentification__slot">
      <auth-figures />
      <auth-switch />
      <div @click="test()">
      </div>
      <n-input class="authentification__input" type="text" round clearable placeholder="Логин" v-model:value="formValue.login.value" :status="formValue.login.isValid" />
      <n-input class="authentification__input" type="password" clearable round placeholder="Пароль" v-model:value="formValue.password.value" :status="formValue.password.isValid" />
      <div class="authentification__additional-buttons">
        <n-checkbox
          class="authentification__checkbox"
          v-model:checked="rememberMe"
        >
          Запомнить меня
        </n-checkbox>
        <router-link
          class="authentification__restore-button"
          to="/restoration"
        >
          Забыли пароль?
        </router-link>
      </div>
      <round-button 
        class="authentification__enter-button"
        buttonPlaceholder="Войти"
        @click="login()"
      />
      <p class="authentification__social-networks-text">
        Или войдите через социальные сети
      </p>
      <div class="authentification__social-networks">
        <a href="http://vps.sloy.design:1339/api/connect/vk">
          <vk-icon class="authentification__social-networks-icon vk" />
        </a>
        <a href="http://vps.sloy.design:1339/api/connect/google">
          <google-icon class="authentification__social-networks-icon google" />
        </a>
      </div>
    </modal-slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useProfileStore } from '@/stores/profile'
import modalSlot from '@/components/ui/modalSlot.vue'
import RoundButton from '@/components/ui/RoundButton.vue'
import authSwitch from '@/components/elements/authSwitch.vue'
import authFigures from '@/components/elements/authFigures.vue'
import vkIcon from '@/assets/svg/vkIcon.vue'
import googleIcon from '@/assets/svg/googleIcon.vue'
import loaderIcon from '@/assets/svg/loaderIcon.vue'
export default {
  name: 'authentification',
  components: {
    modalSlot,
    RoundButton,
    authSwitch,
    authFigures,
    vkIcon,
    googleIcon,
    loaderIcon
  },
  setup() {
    const router = useRouter()
    const profile = useProfileStore()
    const message = useMessage()
    const rememberMe = ref(false)
    const formValue = ref({
      login: {
        value: null,
        isValid: null
      },
      password: {
        value: null,
        isValid: null
      }
    })
    function login () {
      if (formValue.value.login.value !== '' || formValue.value.password.value !== '') {
        const data = {
          login: formValue.value.login.value,
          password: formValue.value.password.value
        }
        profile.loginUser(data, rememberMe)
        .then((result) => {
          if (result === 'success') {
            router.push('/')
          } else {
            formValue.value.login.isValid = 'error'
            formValue.value.login.value = ''
            formValue.value.password.isValid = 'error'
            formValue.value.password.value = ''
            message.error('Логин или пароль введены неверно')
          }
        })
      } else {
        formValue.value.login.isValid = 'error'
        formValue.value.password.isValid = 'error'
        message.error('Введите логин и пароль')
      }
    }
    return {
      profile,
      rememberMe,
      formValue,
      login
    }
  }
}
</script>

<style lang="scss" scoped>
  .authentification {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__slot {
      height: 470px;
      width: 630px;
    }
    &__input {
      width: 410px;
      margin: 0 0 20px 0;
      &:deep(.n-input__input-el) {
        // стили
      }
    }
    &__additional-buttons {
      display: flex;
      justify-content: space-between;
    }
    &__restore-button {
      text-decoration: none;
      color: #78353E;
      font-size: 12px;
    }
    &__enter-button {
      margin: 40px 0 0 0;
    }
    &__social-networks-text {
      color: #A17278;
      letter-spacing: 0.03ch;
      font-size: 16px;
      line-height: 20px;
      margin: 40px 0 0 0;
      display: flex;
      justify-content: center;
    }
    &__social-networks {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0 0 0;
    }
    &__social-networks-icon {
      fill: #A17278;
      transition: fill .3s;
      cursor: pointer;
    }
  }
  .vk {
    transition: fill .3s;
    margin: 0 15px 0 0;
    &:hover {
      fill: #5181b8;
    }
  }
  .google {
    transition: fill .3s;
    &:hover {
      fill: #de4c30;
    }
  }
</style>