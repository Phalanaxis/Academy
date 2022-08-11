<template>
  <div class="authentification__form-switcher">
    <router-link
      :class="{'authentification__form-radio': true, 'authentification__form-radio_disabled': this.$route.path !== '/authentification'}"
      to="/authentification"
    >
      Вход
    </router-link>
    <router-link
      :class="{'authentification__form-radio': true, 'authentification__form-radio_disabled': this.$route.path !== '/registration'}"
      to="/registration"
    >
      Регистрация
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .authentification {
    &__form-switcher {
      display: flex;
      justify-content: center;
      margin: 0 0 40px 0;
    }
    &__form-radio {
      text-decoration: none;
      color: #78353E;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.03ch;
      backface-visibility: hidden;
      transform-origin: center;
      transition: transform .2s;
      &:hover {
        transform: scale(1.1);
      }
      &:nth-child(1) {
        margin: 0 50px 0 0;
      }
      &_disabled {
        color: #C9AEB2;
      }
    }
  }
</style>