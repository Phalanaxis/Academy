<template>
  <div v-if="action.actions !== null && action.actions.length > 0" class="actions">
    <div
      class="actions__item"
      v-for="item in action.actions"
      @click="openModal(item.attributes.title, item.attributes.text, item.attributes.image)"
      :key="item.id"
    >
      <div class="actions__info">
        <h4 :class="{'actions__title': true, 'actions__title_white': item.attributes.image.data !== null}">{{ item.attributes.title }}</h4>
        <div v-if="item.attributes.image.data === null" class="actions__text" v-html="item.attributes.text" />
      </div>
      <tree-horizontal v-if="item.attributes.image.data === null" class="actions__empty-tree" />
      <img class="actions__background-image" v-if="item.attributes.image.data !== null" :src="link + item.attributes.image.data.attributes.url" />
      <heart v-if="item.attributes.image.data !== null" class="actions__background-heart" />
    </div>
  </div>
  <div v-else>
    В данный момент специальные предложения отсутствуют
  </div>
  <modal class="modal" @outside="switchModal" v-if="isOpened">
    <div class="modal__container">
      <h4 class="modal__title">
        {{ modalTitle }}
      </h4>
      <div class="modal__text-box">
        <div class="modal__text" v-html="modalText" />
        <div v-if="modalImage !== null" class="modal__image-container">
          <img class="modal__image" :src="link + modalImage" />
        </div>
      </div>
      <square-button @click="switchModal" buttonPlaceholder="Ок" class="modal__close-button" />
    </div>
  </modal>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import { useActionsStore } from '@/stores/actions'
  import Modal from '@/components/elements/Modal.vue'
  import treeHorizontal from '@/assets/svg/icons/treeHorizontal.vue'
  import Heart from '@/assets/svg/icons/heart.vue'
  import SquareButton from '@/components/ui/SquareButton.vue'
  export default {
    components: {
      Modal,
      treeHorizontal,
      Heart,
      SquareButton
    },
    setup () {
      const action = useActionsStore()
      const isOpened = ref(false)
      const modalTitle = ref('')
      const modalText = ref('')
      const modalImage = ref('')
      const link = import.meta.env.VITE_UPLOADS_LINK

      function switchModal () {
        isOpened.value = !isOpened.value
      }
      function openModal (title, text, image) {
        modalTitle.value = title
        modalText.value = text
        if (image.data !== null) {
          modalImage.value = image.data.attributes.url
        } else {
          modalImage.value = null
        }
        switchModal()
      }
      
      onMounted(() => {
        action.fetchActions()
      })

      return {
        action,
        isOpened,
        switchModal,
        openModal,
        modalTitle,
        modalText,
        modalImage,
        link
      }
    }
  }
</script>

<style lang="scss" scoped>
  .actions {
    margin: 25rem 0 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    @media screen and (max-width: 1280px) {
      grid-template-columns: 1fr;
    }
    &__item {
      position: relative;
      max-width: 100%;
      height: 250rem;
      border-radius: 20px;
      overflow: hidden;
      padding: 30rem;
      background-color: #C4B0B1;
      cursor: pointer;
    }
    &__info {
      height: 100%;
      width: 50%;
      @media screen and (max-width: 680px) {
        width: 100%;
      }
    }
    &__title {
      position: relative;
      z-index: 2;
      margin: 0 0 10px 0;
      font-size: 20rem;
      line-height: 30rem;
      color: #644C5C;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      &_white {
        color: #FFF;
      }
    }
    &__text {
      font-weight: 500;
      font-size: 14rem;
      line-height: 21rem;
      color: #644C5C;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__empty-tree {
      position: absolute;
      top: 0;
      right: 0;
      width: calc(50% - 20px);
      height: 100%;
      @media screen and (max-width: 1280px) {
        width: auto;
      }
      @media screen and (max-width: 680px) {
        opacity: 0.1;
      }
    }
    &__background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &__background-heart {
      position: absolute;
      bottom: 20rem;
      right: 21rem;
      fill: #FFF;
      transform-origin: center;
      transition: fill .3s, transform .3s;
      animation: shake 1s linear infinite;
      animation-play-state: paused;
      &:hover {
        fill: #801406;
        animation-play-state: running;
      }
    }
  }
  .modal {
    &__container {
      width: calc(850rem - 220px);
      height: calc(560rem - 80px);
      display: flex;
      flex-direction: column;
      @media screen and (max-width: 1280px) {
        width: 540px;
      }
      @media screen and (max-width: 680px) {
        width: 280px;
        margin: 0 0 60px 0;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    &__text-box {
      display: flex;
      @media screen and (max-width: 680px) {
        flex-direction: column-reverse;
      }
    }
    &__title {
      font-size: 20rem;
      line-height: 30rem;
      color: #644C5C;
      margin: 20rem 0 40rem 0;
      display: -webkit-box;
      @media screen and (max-width: 680px) {
        margin: 0 0 20px 0;
      }
    }
    &__text {
      margin: 0 35rem 0 0;
      width: 60%;
      font-size: 14rem;
      line-height: 21rem;
      color: #644C5C;
      display: -webkit-box;
      -webkit-line-clamp: 13;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      @media screen and (max-width: 1280px) {
        width: 50%;
        margin: 0 30px 0 0;
      }
      @media screen and (max-width: 680px) {
        margin: 0;
        width: 100%;
      }
    }
    &__image-container {
      width: calc(40% - 35rem);
      border-radius: 20px;
      @media screen and (max-width: 1280px) {
        width: calc(50% - 30px);
      }
      @media screen and (max-width: 680px) {
        width: 100%;
        height: 200px;
        margin: 0 0 20px 0;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: cover;
    }
    &__close-button {
      position: absolute;
      bottom: 40px;
      width: 30%;
      @media screen and (max-width: 680px) {
        bottom: 20px;
        width: calc(100% - 20px);
        margin: 30px 0 0 0;
      }
    }
  }
  @keyframes shake {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: scale(1.08) rotate(10deg);
    }
  }
</style>