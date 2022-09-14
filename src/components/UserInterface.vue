<template>
  <div v-if="isOpened" class="mobile-menu-blocker" />
  <div :class="{'menu': true, 'menu-opened': isOpened}">
    <div class="menu__scroll-line">
      <router-link to="/">
        <img src="../assets/svg/academyLogo.svg" class="menu__logo">
      </router-link>
      <Transition name="fade" mode="out-in">
        <nav v-if="!isDetailed" class="menu__navigations">
          <router-link
            v-for="(el, index) in navigations"
            :key="index"
            :to="el.path"
            :style="{ color: el.color }"
            :class="{'menu__link': true, 'menu__link-active': route.path === el.path || route.path === el.path + '/' + route.params.id || route.path === '/profile' || route.path === '/cart' }"
          >
            <span v-html="el.svg" />{{ el.title }}</router-link>
        </nav>
        <div v-else class="menu__item-navigations">
          <n-collapse
            v-if="detailedMenu"
            class="menu__item-block"
            default-expanded-names="item-menu"
            accordion
          >
            <detailed-side-menu
              v-for="(item, index) in detailedMenu"
              :key="index"
              :block="item"
              :blockIndex="index + 1"
            />
          </n-collapse>
        </div>
      </Transition>
      <hr class="menu__divide-line" />
      <div v-if="profile.name !== null" class="top-bar__container-mobile">
        <router-link class="top-bar__icon-container" to="/profile">
          <img v-if="profile.avatarImage" class="top-bar__profile-icon  top-bar__profile-icon-mobile top-bar__profile-image" :src="link + profile.avatarImage.url" />
          <div v-else class="top-bar__profile-icon" />
        </router-link>
        <div class="top-bar__profile-info">
          <router-link to="/profile" v-if="profile.name !== null" class="top-bar__name" v-html="profile.name + ' ' + profile.surName" />
          <div v-if="$route.path === '/profile'" class="top-bar__exit-button" @click="topBarButton()">
            Выход
          </div>
          <div v-else class="top-bar__exit-button" @click="redirectToProfile()">
            Профиль
          </div>
        </div>
      </div>
      <telegram-contacts class="telegram" />
    </div>
  </div>
  <!-- top-bar -->
  <div class="page-container" id="page">
    <div v-if="profile.name !== null" class="top-bar__container">
      <router-link :to="cartLink">
        <n-badge class="top-bar__baidge" :value="products.inCart.length">
          <cartIcon class="top-bar__cart-icon" />
        </n-badge>
      </router-link>
      <router-link class="top-bar__icon-container desktop" to="/profile">
        <img v-if="profile.avatarImage" class="top-bar__profile-icon top-bar__profile-image" :src="link + profile.avatarImage.url" />
        <div v-else class="top-bar__profile-icon" />
      </router-link>
      <div class="top-bar__profile-info desktop">
        <router-link to="/profile" v-if="profile.name !== null" class="top-bar__name" v-html="profile.name + ' ' + profile.surName" />
        <div v-if="$route.path === '/profile'" class="top-bar__exit-button" @click="topBarButton()">
          Выход
        </div>
        <div v-else class="top-bar__exit-button" @click="redirectToProfile()">
          Профиль
        </div>
      </div>
      <div :class="{'top-bar__burger': true, 'top-bar__burger-opened': isOpened}" @click="switchMenu()">
        <div :class="{'top-bar__burger-part': true, 'top-bar__burger-part-opened': isOpened}" />
        <div :class="{'top-bar__burger-part': true, 'top-bar__burger-part-opened': isOpened}" />
        <div :class="{'top-bar__burger-part': true, 'top-bar__burger-part-opened': isOpened}" />
      </div>
    </div>
    <router-link class="top-bar__logo-mobile-link" to="/">
      <img class="top-bar__logo-mobile" src="@/assets/svg/academyLogo.svg" />
    </router-link>
    <router-view/>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useWebinarsStore } from '@/stores/webinars'
import { useProductsStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'
import TelegramContacts from './elements/TelegramContacts.vue'
import DetailedSideMenu from './elements/DetailedSideMenu.vue'
import { useProfileStore } from '@/stores/profile'
import cartIcon from '@/assets/svg/cartIcon.vue'
export default {
  components: {
    TelegramContacts,
    DetailedSideMenu,
    cartIcon
  },
  props: {
    navigations: Array
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const webinars = useWebinarsStore()
    const products = useProductsStore()
    const profile = useProfileStore()

    const isDetailed = ref(false)
    const detailedMenu = ref('')
    const isOpened = ref(false)

    const link = import.meta.env.VITE_UPLOADS_LINK
    const cartLink = ref('/cart')
    const buttonText = ref('')

    onMounted(() => {
      checkRoute()
      products.inCart = checkCart()
      cartLink.value = (route.path === '/cart') ? '/products' :  '/cart'
    })

    watch(route, () => {
      let element = document.getElementById('page')
      isOpened.value = false
      element.style.overflowY = 'scroll'
      checkRoute()
      if (route.path === '/cart') {
        cartLink.value = '/products'
      } else cartLink.value = '/cart'
    })

    function checkCart () {
      if (localStorage.getItem('inCart')) {
        return JSON.parse(localStorage.getItem('inCart'))
      } else {
        return []
      }
    }

    function switchMenu () {
      isOpened.value = !isOpened.value
      let element = document.getElementById('page')
      if (isOpened.value === true) {
        element.scrollTo(0,0)
        element.style.overflow = 'hidden'
      } else {
        element.style.overflowY = 'scroll'
      }
    }

    function checkRoute () {
      isDetailed.value = (route.path === '/courses/webinar/' + route.params.id || route.path === '/courses/' + route.params.id) ? true : false

      if (route.path === '/courses/' + route.params.id) {
        if (products.GET_FOUNDPRODUCT === null || products.GET_FOUNDPRODUCT.id !== Number(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))) {
          products.fetchOneProduct(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length))).then(() => {
            detailedMenu.value = products.GET_FOUNDPRODUCT.attributes.courseBlocks
          })
        } else {
          detailedMenu.value = products.GET_FOUNDPRODUCT.attributes.courseBlocks
        }
      } else if (route.path === '/courses/webinar/' + route.params.id) {
        if (webinars.GET_FOUNDWEBINAR === null || webinars.GET_FOUNDWEBINAR.id !== Number(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length)))) {
          webinars.fetchOneWebinar(atob(route.params.id.slice(route.params.id.lastIndexOf('-') + 1, route.params.id.length))).then(() => {
            detailedMenu.value = webinars.GET_FOUNDWEBINAR.attributes.blocks
          })
        } else {
          detailedMenu.value = webinars.GET_FOUNDWEBINAR.attributes.blocks
        }
      }
    }

    function topBarButton () {
      if(route.path === '/profile') {
        localStorage.removeItem('token')
        localStorage.removeItem('sessionType')
        sessionStorage.clear()
        router.push('/authentification')
      } else {
        router.push('/profile')
      }
    }

    function redirectToProfile () {
      router.push('/profile')
    }

    return {
      profile,
      webinars,
      products,
      isDetailed,
      detailedMenu,
      route,
      link,
      buttonText,
      isOpened,
      switchMenu,
      cartLink,
      topBarButton,
      redirectToProfile
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/core.scss';
  .menu {
    width: 26%;
    min-width: 400px;
    height: 100vh;
    box-sizing: border-box;
    background-color: #F4EBE4;
    padding: 40px 0 0 0;
    background-image: url(../assets/svg/sideMenuBackground.svg);
    background-position: 40% bottom;
    background-repeat: no-repeat;
    position: relative;
    background-size: contain;
    transition: transform .3s;
    @media screen and (max-width: 1280px) {
      width: 350px;
      min-width: 350px;
      z-index: 10;
      position: fixed;
      top: 0;
      right: -360px;
    }
    @media screen and (max-width: 680px) {
      width: 100%;
      right: -100%;
      min-width: unset;
    }
    &-opened {
      @media screen and (max-width: 1280px) {
        transform: translateX(-360px);
      }
      @media screen and (max-width: 680px) {
        transform: translateX(-100%);
      }
    }
    &__logo {
      width: 100%;
      height: auto;
      padding: 0 50px;
      @media screen and (max-width: 1280px) {
        display: none;
      }
    }
    &__scroll-line {
      @media screen and (max-width: 1280px) {
        margin: 90px 0 0 0;
        height: 100%;
        overflow-y: scroll;
      }
    }
    &__navigations {
      display: flex;
      flex-wrap: wrap;
      margin: 54px 50px;
      @media screen and (max-width: 1280px) {
        margin: 0 50px 50px 25px;
      }
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
    &__item-navigations {
      margin: 70px 50px;
    }
    &__divide-line {
      @media screen and (min-width: 1281px) {
        display: none;
      }
      margin: 0 25px;
      height: 1px;
      background-color: #C5B1B2;
      border: none;
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
      fill: #644C5C;
      width: 100%;
      height: 100%;
      transition: fill .3s;
    }
    &:hover {
      ::v-deep(svg) {
        fill: #09c;
      }
    }
    @media screen and (max-width: 1280px) {
      position: relative;
      bottom: unset;
      left: unset;
      margin: 0 0 0 25px;
      ::v-deep(svg) {
        width: 60px;
        height: 60px;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease-out;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .top-bar {
    &__container {
      z-index: 11;
      position: absolute;
      right: 75rem;
      top: 65rem;
      display: flex;
      @media screen and (max-width: 1280px) {
        right: 60px;
      }
      @media screen and (max-width: 680px) {
        top: 30px;
        right: 25px;
      }
      &-mobile {
        @media screen and (min-width: 1281px) {
          display: none;
        }
        margin: 30px 0 50px 0;
        display: flex;
      }
    }
    &__name {
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.02ch;
      color: #000;
    }
    &__baidge:deep(.n-badge-sup) {
      bottom: calc(100% - 12px)!important;
      left: 90%!important;
    }
    &__icon-container {
      position: relative;
      margin: 0 15px;
      @media screen and (max-width: 1280px) {
        margin: 0 25px;
      }
    }
    &__profile-info {
      position: relative;
      @media screen and (max-width: 1280px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    &__profile-icon {
      transition: box-shadow .3s;
      object-fit: cover;
      width: 44px;
      height: 44px;
      background-color: #829288;
      border-radius: 50px;
      &:hover {
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.25);
      }
      &-mobile {
        width: 60px;
        height: 60px;
      }
    }
    &__exit-button {
      position: absolute;
      cursor: pointer;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0.02ch;
      color: #6D6D6D;
      text-decoration: none;
      border-bottom: 1px solid #FBFAF9;
      transition: border-color .3s;
      &:hover {
        border-color: #6D6D6D;
      }
      @media screen and (max-width: 1280px) {
        position: relative;
        border-bottom: none;
      }
    }
    &__burger {
      @media screen and (min-width: 1281px) {
        display: none;
      }
      margin: 0 0 0 15px;
      padding: 16px 12px;
      width: 44px;
      height: 44px;
      background-color: #E4D7D8;
      border-radius: 50px;
      cursor: pointer;
      transition: background-color .3s;
      &-opened {
        background-color: #78353E;
      }
      &:hover {
        background-color: #78353E;
        .top-bar__burger-part {
          background-color: #FFF;
        }
      }
      &-part {
        content: '';
        width: 100%;
        height: 2px;
        background-color: #78353E;
        border-radius: 1px;
        transition: background-color .3s;
        &:nth-child(1) {
          transform-origin: center;
          transition: transform 0.4s ease-in-out;
        }
        &:nth-child(2) {
          margin: 3px 0;
          transition: transform 0.2s ease-in-out;
        }
        &:nth-child(3) {
          transform-origin: center;
          transition: transform 0.4s ease-in-out;
        }
        &-opened {
          &:nth-child(1) {
            transform: translateY(5px) rotate(45deg);
          }
          &:nth-child(2) {
            transform: scaleY(0);
          }
          &:nth-child(3) {
            transform: translateY(-5px) rotate(-45deg);
          }
          background-color: #FFF;
        }
      }
    }
    &__logo-mobile {
      @media screen and (min-width: 1281px) {
        display: none;
      }
      @media screen and (max-width: 1280px) {
        width: 160px;
        height: 70px;
        margin: 50px 0 0 60px;
      }
      @media screen and (max-width: 680px) {
        width: 100px;
        height: 40px;
        margin: 30px 0 0 25px;
      }
    }
  }
  .desktop {
    @media screen and (max-width: 1280px) {
      display: none;
    }
  }
  .mobile-menu-blocker {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #644C5C;
    opacity: 0.9;
  }
  .page-container {
    background-color: #FBFAF9;
    position: relative;
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    height: 100vh;
  }
</style>