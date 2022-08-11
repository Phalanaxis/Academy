<template>
  <div class="google-form">
    <loaderIcon v-if="profile.status !== 'redirectToRegistration'" />
    <modal-slot v-else class="google-form__modal">
      <h2 class="google-form__title">Создание новой учетной записи на основе учетной записи Google</h2>
      <n-input class="google-form__input" name="mail" round clearable :placeholder="profile.email" disabled/>
      <n-input class="google-form__input" @blur="validateDefault(this.GoogleFormValue.name)" round clearable placeholder="Имя" v-model:value="GoogleFormValue.name.value" :status="GoogleFormValue.name.isValid" />
      <n-input class="google-form__input" @blur="validateDefault(this.GoogleFormValue.surname)" round clearable placeholder="Фамилия" v-model:value="GoogleFormValue.surname.value" :status="GoogleFormValue.surname.isValid" />
      <n-input class="google-form__input" @blur="validateDefault(this.GoogleFormValue.middleName)" round clearable placeholder="Отчество" v-model:value="GoogleFormValue.middleName.value" :status="GoogleFormValue.middleName.isValid" />
      <n-input class="google-form__input" name="phone" @blur="validatePhone(this.GoogleFormValue.phone)" round clearable placeholder="Телефон" v-model:value="GoogleFormValue.phone.value" :status="GoogleFormValue.phone.isValid" />
      <round-button class="google-form__button" @click="sendData()" buttonPlaceholder="Отправить" />
    </modal-slot>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useRoute } from 'vue-router'
import modalSlot from '@/components/ui/modalSlot.vue'
import RoundButton from '@/components/ui/RoundButton.vue'
import loaderIcon from '@/assets/svg/loaderIcon.vue'

export default {
  components: {
    modalSlot,
    RoundButton,
    loaderIcon
  },
  setup() {
    const profile = useProfileStore()
    const route = useRoute()
    const GoogleFormValue = ref({
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
      }
    })
    
    onMounted (() => {
      profile.getGoogleAuth(route.query.access_token)
    })

    function validateDefault (item) {
      if (item.value.length > 4) {
        item.isValid = 'success'
      } else {
        item.isValid = 'error'
      }
    }

    function validatePhone (item) {
      if (item.value.length !== 11) {
        item.isValid = 'error'
      } else {
        item.isValid = 'success'
      }
    }

    function sendData () {
      const data = {
        name: this.GoogleFormValue.name.value,
        middleName: this.GoogleFormValue.middleName.value,
        surName: this.GoogleFormValue.surname.value,
        phoneNumber: this.GoogleFormValue.phone.value
      }
      this.profile.setAdditionalData(data)
    }

    return {
      profile,
      GoogleFormValue,
      validateDefault,
      validatePhone,
      sendData
    }
  },
  watch: {
    'profile.status': {
      handler() {
        if (this.profile.status === 'success') {
          this.$router.push('/')
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .google-form {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    &__modal {
      width: 630px;
      height: 560px;
    }
    &__title {
      margin: 0 0 40px 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.03ch;
      color: #78353E;
      text-align: center;
    }
    &__input {
      cursor: default;
      margin: 20px 0 0 0;
      &:deep(.n-input__input-el) {
        cursor: default;
      }
    }
    &__button {
      margin: 40px 0 0 0;
    }
  }
</style>