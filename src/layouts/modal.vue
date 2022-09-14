<template>
  <div class="modal">
    <router-link
      class="modal__logo-link"
      to="/"
    >
      <img src="@/assets/svg/academyLogo.svg" class="modal__logo" />
    </router-link>
    <vectorSpiral class="modal__spiral" />
    <butterflies class="modal__butterflies" />
    <router-view />
  </div>
</template>

<script>
import vectorSpiral from '@/assets/svg/vectorSpiral.vue'
import butterflies from '@/assets/svg/butterflies.vue'
export default {
  name: 'modal',
  components: {
    vectorSpiral,
    butterflies
  }
}
</script>

<style lang="scss" scoped>
    .modal {
      position: relative;
      width: 100%;
      max-height: 100vh;
      height: 100vh;
      background-color: #FBFAF9;
      overflow-y: scroll;
      @media screen and (max-width: 470px) {
        background-color: #F4EBE4;
        max-height: none;
      }
      &__spiral {
        position: fixed;
        right: -40px;
        top: -80px;
        @media screen and (max-width: 680px) {
          display: none;
        }
      }
      &__butterflies {
        position: fixed;
        left: 0;
        bottom: 0;
        @media screen and (max-width: 680px) {
          display: none;
        }
      }
      &__logo-link {
        position: absolute;
        top: 85px;
        left: calc((100% - 190px)/2);
        @media screen and (max-height: 860px) {
          top: 45px;
        }
        @media screen and (max-height: 700px) {
          display: none;
        }
      }
      &__logo {
        pointer-events: none;
        user-select: none;
      }
    }
</style>