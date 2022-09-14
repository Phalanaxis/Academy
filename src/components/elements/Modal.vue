<template>
  <div class="modal">
    <div ref="modalRef" class="modal__block">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  setup (_, { emit }) {
    function outsideHendler (e) {
      if (e.target.className === "modal") {
        emit('outside')
      }
    }
    const modalRef = ref(null)
    onClickOutside(modalRef, outsideHendler)
    return { modalRef }
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    width: 100%;
    height: 100%;
    background-color: #644C5C90;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 11;
    &::after {
      content: '';
      position: absolute;
      width: 50px;
      height: 6px;
      transform: rotate(-45deg);
      border-radius: 30px;
      background-color: #F4EBE4;
      top: 50px;
      right: 70px;
      display: block;
      cursor: pointer;
      @media screen and (max-width: 680px) {
        top: 30px;
        right: 10px;
      }
    }
    &::before {
      content: '';
      position: absolute;
      width: 50px;
      height: 6px;
      transform: rotate(45deg);
      border-radius: 30px;
      background-color: #F4EBE4;
      top: 50px;
      right: 70px;
      display: block;
      cursor: pointer;
      @media screen and (max-width: 680px) {
        top: 30px;
        right: 10px;
      }
    }

    &__block {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #F4EBE4;
      border-radius: 30px;
      padding: 40px 110px;
      @media screen and (max-width: 1280px) {
        padding: 30px 60px;
      }
      @media screen and (max-width: 680px) {
        max-height: 80%;
        padding: 30px 10px;
      }
    }
  }
</style>