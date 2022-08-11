<template>
  <section class="profile">
    <ui-title>Профиль</ui-title>
    <div class="profile__block">
      <ui-card class="profile__card">
        <div class="profile__avatar">
          <input id="avatar" type="file" @change="setAvatar">
          <label for="avatar">
            <img v-if="profile.avatarImage" :src="'http://194.58.123.83:1339' + profile.avatarImage.url" alt="" class="profile__avatar-photo">
            <div v-else class="profile__avatar-plug"/>
            <div class="profile__avatar-edit">Заменить фото</div>
          </label>
        </div>
        <div class="profile__info">
          <input-profile ref="surname" @setProfile="setProfile" title="Фамилия" :value="profile.surName" type="surname" />
          <input-profile ref="name" @setProfile="setProfile" title="Имя" :value="profile.name" type="name" />
          <input-profile ref="middlename" @setProfile="setProfile" title="Отчество" :value="profile.middleName" type="middlename" />
          <input-profile ref="phone" @setProfile="setProfile" title="Телефон" :value="profile.phoneNumber" type="phone" />
        </div>
      </ui-card>
    </div>
    <div class="profile__children">
      <ui-card v-for="(el, index) in profile.children"
        :key="index"
        class="profile__child"
      >
        <div class="profile__child-title">Ребенок</div>
        <div class="profile__child-name">{{ el.name }}</div>
        <div class="profile__child-old">{{ el.old }}</div>
      </ui-card>
      <ui-card @click="switchModal" class="profile__child-button">
        Добавить ребенка
      </ui-card>
    </div>
    <modal @outside="switchModal" v-if="isModal">
      <div class="modal__title">Заполните информацию о ребенке</div>
      <n-input class="modal__input" v-model:value="formChild.input.value" :status="formChild.input.isValid" type="text" round clearable placeholder="Имя ребенка" />
      <n-date-picker class="modal__input" v-model:value="formChild.date.value" :status="formChild.date.isValid" :first-day-of-week="0" round clearable placeholder="Дата рождения" />
      <button @click="addChild" class="modal__button">Сохранить</button>
    </modal>
  </section>
</template>

<script>
import { useProfileStore } from '@/stores/profile'
import { useMessage } from 'naive-ui'
import UiTitle from '../components/ui/UiTitle.vue'
import UiCard from '../components/ui/UiCard.vue'
import InputProfile from '../components/elements/inputProfile.vue'
import Modal from '../components/elements/Modal.vue'
export default {
  components: {
    UiTitle,
    UiCard,
    InputProfile,
    Modal
  },
  data () {
    return {
      value: null,
      isValue: null,
      isModal: false,
      formChild: {
        input: {
          value: null,
          isValid: null
        },
        date: {
          value: null,
          isValid: null
        }
      }
    }
  },
  emits: {
    change: Object
  },
  methods: {
    setAvatar (props) {
      if (props.target.files.length > 1) {
        this.warningAvatar()
      }
      this.profile.setAvatar({
        type: 'avatar',
        form: props
      })
      .then(result => result ? this.successAvatar() : this.warningAvatar())
    },
    switchModal () {
      this.isModal = !this.isModal
    },
    setProfile (props) {
      this.profile.putProfile(props)
      .then((res) => {
        if (res?.id) {
          this.$refs[props.type].successHendler()
        } else {
          this.$refs[props.type].errorHendler()
        }
      })
    },
    addChild () {
      this.formChild.input.value ? this.formChild.input.isValid === 'success' : this.formChild.input.isValid === 'error'
      this.formChild.date.value ? this.formChild.date.isValid === 'success' : this.formChild.date.isValid === 'error'
      if (this.formChild.input.value && this.formChild.date.value) {
        this.profile.createChild({
          name: this.formChild.input.value,
          age: this.formChild.date.value
        })
      }
    }
  },
  setup() {
    const message = useMessage()
    const profile = useProfileStore()
    return {
      warningAvatar () { message.warning('Нужно загрузить 1 файл') },
      successAvatar () { message.success('Аватар загружен успешно') },
      profile
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  &__block {
  }
  &__card {
    background-color: #F5F3EF;
    display: flex;
  }
  &__avatar {
    position: relative;
    margin: 16px 40px 0 20px;
    #avatar {
      display: none;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 104px;
      height: 104px;
      border-radius: 50%;
      z-index: 2;
      transition: background-color .3s;
    }
    &::after {
      position: absolute;
      content: '';
      top: 32px;
      left: 50%;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      z-index: 2;
      transform: translate(-50%, 0);
      background-image: url('@/assets/svg/editPan.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-color: #839389;
      opacity: 0;
      transition: opacity .3s;
    }
    &:hover {
      cursor: pointer;
      .profile__avatar-edit {
        border-color: #6D6D6D;
      }
      &::before {
        background-color: #00000040;
        
      }
      &::after {
        opacity: 1;
      }
    }
    &-photo {
      display: block;
      border-radius: 50%;
      width: 104px;
      height: 104px;
    }
    &-plug {
      display: block;
      border-radius: 50%;
      width: 104px;
      height: 104px;
      background-color: #839389;
      background-image: url('@/assets/svg/sideMenuBackground.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    &-edit {
      display: inline-block;
      font-family: Montserrat;
      font-size: 12px;
      font-weight: 500;
      line-height: 12px;
      letter-spacing: 0.02em;
      text-align: center;
      color: #6D6D6D;
      border-bottom: 1px solid transparent;
      transition: border-color .3s;
      cursor: pointer;
    }
  }
  &__info {
    display: flex;
    flex-wrap: wrap;
    margin: 16px 0 0;
    }
  &__children {
    margin: 30px 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 30px;
  }
  &__child {
    height: 124px;
    background-color: #C89C7A50;
    width: calc(33% - 20px);
    &-title {
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      color: #B79172;
      margin: 0 0 10px;
    }
    &-name {
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 500;
      line-height: 19px;
      color: #78353E;
    }
    &-old {
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      color: #78353E;
      margin: 0 0 10px;
    }
    &-button {
      cursor: pointer;
      height: 124px;
      width: calc(33% - 20px);
      background-color: #F5F3EF;
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 500;
      line-height: 19px;
      text-align: center;
      color: #6D6D6D;
      padding: 70px 0 0;
      position: relative;
      &::after {
        position: absolute;
        top: 22px;
        left: 50%;
        transform: translate(-50%, 0);
        content: '';
        background-image: url('@/assets/svg/crossChild.svg');
        background-repeat: no-repeat;
        width: 28px;
        height: 28px;
      }
    }
  }
}
.modal {
  &__title {
    font-family: Montserrat;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: #78353E;
    margin: 0 0 30px;
  }
  &__input {
    margin: 0 0 20px;
  }
  &__button {
    cursor: pointer;
    background-color: #78353E;
    color: #fff;
    width: 410px;
    border: none;
    border-radius: 9em;
    padding: 12px 0;
    margin: 20px 0 0;
  }
}
</style>