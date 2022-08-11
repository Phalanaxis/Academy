<template>
  <div v-if="profile.name !== null" class="top-bar__container">
    <router-link :to="cartLink">
      <n-badge class="top-bar__baidge" :value="products.inCart.length">
        <cartIcon class="top-bar__cart-icon" />
      </n-badge>
    </router-link>
    <router-link class="top-bar__icon-container" to="/profile">
      <img v-if="profile.avatarImage" class="top-bar__profile-icon top-bar__profile-image" :src="link + this.profile.avatarImage.url" />
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
</template>

<script>
import { useProfileStore } from '@/stores/profile'
import { useProductsStore } from '@/stores/products'
import cartIcon from '@/assets/svg/cartIcon.vue'
import checkCart from '@/components/mixins/checkCart'
export default {
  mixins: [checkCart],
  components: {
    cartIcon
  },
  setup() {
    const profile = useProfileStore()
    const products = useProductsStore()
    return {
      profile,
      products
    }
  },
  data () {
    return {
      buttonText: '',
      link: import.meta.env.VITE_UPLOADS_LINK,
      cartLink: '/cart'
    }
  },
  mounted () {
    this.products.inCart = this.checkCart()
    this.cartLink = (this.$route.path === '/cart') ? '/products' :  '/cart'
  },
  watch: {
    '$route.path': {
      handler () {
        if (this.$route.path === '/cart') {
          this.cartLink = '/products'
        } else this.cartLink = '/cart'
      }
    }
  },
  methods: {
    topBarButton () {
      if(this.$route.path === '/profile') {
        localStorage.removeItem('token')
        localStorage.removeItem('sessionType')
        sessionStorage.clear()
        this.$router.push('/authentification')
      } else {
        this.$router.push('/profile')
      }
    },
    redirectToProfile () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-bar {
    &__container {
      position: absolute;
      right: 75px;
      top: 60px;
      display: flex;
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
      width: 44px;
      height: 44px;
      margin: 0 15px;
    }
    &__profile-icon {
      transition: box-shadow .3s;
      &:hover {
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.25);
      }
    }
    &__profile-info {
      position: relative;
    }
    &__profile-icon {
      width: 100%;
      height: 100%;
      background-color: #829288;
      border-radius: 50px;
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
    }
  }
</style>