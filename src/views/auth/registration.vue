<template>
  <div class="registration">
    <modal-slot class="registration__slot">
      <auth-figures />
      <auth-switch />
        <n-form class="registration__fields-container" :model="formValue">
          <n-input class="registration__input" @blur="validateLogin(this.formValue.login)" round clearable placeholder="Логин" v-model:value="formValue.login.value" :status="formValue.login.isValid" />
          <n-input class="registration__input" @blur="validateLogin(this.formValue.name)" round clearable placeholder="Имя" v-model:value="formValue.name.value" :status="formValue.name.isValid" />
          <n-input class="registration__input" @blur="validateLogin(this.formValue.surname)" round clearable placeholder="Фамилия" v-model:value="formValue.surname.value" :status="formValue.surname.isValid" />
          <n-input class="registration__input" @blur="validateLogin(this.formValue.middleName)" round clearable placeholder="Отчество" v-model:value="formValue.middleName.value" :status="formValue.middleName.isValid" />
          <n-input class="registration__input" name="phone" @blur="validatePhone(this.formValue.phone)" round clearable placeholder="Телефон" v-model:value="formValue.phone.value" :status="formValue.phone.isValid" />
          <n-input class="registration__input" name="mail" @blur="validateMail()" round clearable placeholder="Email" v-model:value="formValue.mail.value" :status="formValue.mail.isValid" />
          <n-input class="registration__input" type="password" @blur="passwordValidHandler(this.formValue.password)" round clearable placeholder="Пароль" v-model:value="formValue.password.value" :status="formValue.password.isValid" />
          <n-input class="registration__input" type="password" @blur="passwordRepeatValidHandler(this.formValue.repeatPassword)" round clearable placeholder="Повторите пароль" v-model:value="formValue.repeatPassword.value" :status="formValue.repeatPassword.isValid" />
        </n-form>
      <round-button 
        class="registration__enter-button"
        buttonPlaceholder="Зарегистрироваться"
        @click="validateAndRegister"
      />
    </modal-slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profile'
import modalSlot from '@/components/ui/modalSlot.vue'
import RoundButton from '@/components/ui/RoundButton.vue'
import authSwitch from '@/components/elements/authSwitch.vue'
import authFigures from '@/components/elements/authFigures.vue'
export default {
  components: {
    modalSlot,
    authFigures,
    authSwitch,
    RoundButton
  },
  setup() {
    const profile = useProfileStore()
    const message = useMessage()
    const router = useRouter()
    const formValue = ref({
      login: {
        value: '',
        isValid: ''
      },
      mail: {
        value: '',
        isValid: ''
      },
      name: {
        value: '',
        isValid: ''
      },
      surname: {
        value: '',
        isValid: ''
      },
      middleName: {
        value: '',
        isValid: ''
      },
      phone: {
        value: '',
        isValid: ''
      },
      password: {
        value: '',
        isValid: ''
      },
      repeatPassword: {
        value: '',
        isValid: ''
      }
    })
    profile.status = 'pending'

    function validateAndRegister () {
      let validationResult = true
      Object.values(formValue.value).forEach(item => {
        if ((item.isValid === '' || item.isValid === 'error')) {
          item.isValid = 'error'
          validationResult = false
        }
      })
      if (validationResult === true) {
        const data = {
          login: formValue.value.login.value,
          mail: formValue.value.mail.value,
          name: formValue.value.name.value,
          surname: formValue.value.surname.value,
          middleName: formValue.value.middleName.value,
          phone: formValue.value.phone.value,
          password: formValue.value.password.value,
        }
        profile.registerProfile(data).then((result) => {
          if(result === 'success') {
            message.error('Пользователь успешно зарегестрирован')
            router.push('/')
          } else {
            message.success('Что-то пошло не так, возможно такой пользователь уже существует')
          }
        })
      } else {
        message.error('Заполните все поля')
      }
    }

    function validateLogin (item) {
      if (item.value.length > 4) {
        item.isValid = 'success'
      } else {
        item.isValid = 'error'
      }
    }

    function validateMail () {
      const regEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (formValue.value.mail.value.length < 3 || regEx.test(formValue.value.mail.value) === false) {
        formValue.value.mail.isValid = 'error'
      } else {
        formValue.value.mail.isValid = 'success'
      }
    }

    function validatePhone (item) {
      if (item.value.length !== 11) {
        item.isValid = 'error'
      } else {
        item.isValid = 'success'
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
      if ((item.value.length < 8 || regEx.test(item.value) === false) || item.value !== this.formValue.password.value) {
        item.isValid = 'error'
      } else {
        item.isValid = 'success'
      }
    }

    return {
      profile,
      formValue,
      validateAndRegister,
      validateLogin,
      validateMail,
      validatePhone,
      passwordValidHandler,
      passwordRepeatValidHandler
    }
  },
  watch: {
    'profile.status': {
      handler () {
        if (this.profile.status === 'success') {
          this.$router.push('/')
        } else if (this.profile.status === 'error') {
          console.log('error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .registration {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 680px) {
      margin: 60px 0 0 0;
    }
    @media screen and (max-width: 470px) {
      height: auto;
      margin: 0;
    }
    &__fields-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      @media screen and (max-width: 680px) {
        width: 100%;
        grid-template-columns: 1fr;
      }
    }
    &__slot {
      height: 470px;
      padding: 40px 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media screen and (max-width: 680px) {
        height: auto;
        padding: 60px 20px;
        width: calc(100% - 50px);
      }
      @media screen and (max-width: 470px) {
        height: 100%;
        width: 100vw;
        padding: 60px 20px 20px 20px;
      }
    }
    &__input {
      width: 410px;
      @media screen and (max-width: 1280px) {
        width: 310px;
      }
      @media screen and (max-width: 680px) {
        width: 100%;
      }
    }
    &__enter-button {
      width: 410px;
      margin: 40px 0 0 0;
      @media screen and (max-width: 680px) {
        width: 100%;
        margin: 40px 0;
      }
    }
  }
</style>