<template>
  <div class="modal">
    <router-link
      class="modal__logo-link"
      to="/"
    >
      <img src="@/assets/images/academyLogo.png" class="modal__logo" />
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
      height: 100vh;
      background-color: #FBFAF9;
      &__spiral {
        position: absolute;
        right: -40px;
        top: -80px;
      }
      &__butterflies {
        position: absolute;
        left: 0;
        bottom: 0;
      }
      &__logo-link {
        position: absolute;
        top: 85px;
        left: calc((100% - 190px)/2);
      }
      &__logo {
        pointer-events: none;
        user-select: none;
      }
    }
</style>