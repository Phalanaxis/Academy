<template>
  <div class="menu">
    <router-link to="/">
      <img src="../assets/images/academyLogo.png" class="menu__logo">
    </router-link>
    <nav class="menu__navigations">
      <router-link
        v-for="(el, index) in navigations"
        :key="index"
        :to="el.path"
        :style="{ color: el.color }"
        :class="{'menu__link': true, 'menu__link-active': $route.path === el.path || $route.path === el.path + '/' + $route.params.id || $route.path === '/profile' }"
      >
        <span v-html="el.svg" />{{ el.title }}</router-link>
    </nav>
    <telegram-contacts class="telegram" />
  </div>
</template>

<script>
import TelegramContacts from '../components/elements/TelegramContacts.vue'
export default {
  components: {
    TelegramContacts
  },
  props: {
    navigations: Array
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/core.scss';
  .menu {
    width: 26%;
    height: 100vh;
    box-sizing: border-box;
    background-color: #F4EBE4;
    padding: 40px 74px;
    background-image: url(../assets/svg/sideMenuBackground.svg);
    background-position: 40% bottom;
    background-repeat: no-repeat;
    position: relative;
    background-size: contain;
    &__logo {
      width: 100%;
      height: auto;
    }
    &__navigations {
      display: flex;
      flex-wrap: wrap;
      margin: 54px 0;
    }
    &__link {
      display: flex;
      align-items: center;
      width: 100%;
      font-family: Montserrat;
      font-size: 18rem;
      font-weight: 600;
      line-height: 30px;
      text-decoration: none;
      margin: 18rem 0;
      opacity: 0.3;
      transition: opacity .3s;
      span {
        min-width: 34rem;
        width: 34rem;
        height: 34rem;
        margin: 0 26rem 0 0;
        ::v-deep(svg) {
          width: 100%;
          height: 100%;
        }
      }
      &:hover {
        opacity: 1;
      }
      &-active {
        opacity: 1;
      }
    }
  }
  .telegram {
    position: absolute;
    bottom: 74px;
    left: 74px;
    border-radius: 50%;
    width: 22%;
    height: auto;
    ::v-deep(svg) {
      width: 100%;
      height: 100%;
    }
  }
</style>