<template>
  <oval class="authentification__figure-first" />
  <snake class="authentification__figure-second" />
</template>

<script>
import oval from '@/assets/svg/icons/oval.vue'
import snake from '@/assets/svg/icons/snake.vue'
export default {
  components: {
    oval,
    snake
  }
}
</script>

<style lang="scss" scoped>
  .authentification {
    &__figure-first {
      user-select: none;
      position: absolute;
      top: 40px;
      left: -62px;
      cursor: pointer;
      &:hover {
        animation: pulse;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }
      &:active {
        animation: click;
        animation-duration: 1s;
        animation-iteration-count: 1;
      }
    }
    &__figure-second {
      user-select: none;
      position: absolute;
      bottom: -45px;
      right: -90px;
      cursor: pointer;
      &:hover {
        animation: shake;
        animation-duration: 2s;
        animation-iteration-count: infinite;
      }
      &:active {
        animation: click;
        animation-duration: 1s;
        animation-iteration-count: 1;
      }
    }
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes shake {
    0%  { -webkit-transform:     translate(2px, 1px) rotate(0deg); }
    10% { -webkit-transform:     translate(-1px, -2px) rotate(-2deg); }
    20% { -webkit-transform:     translate(-3px, 0px) rotate(3deg); }
    30% { -webkit-transform:     translate(0px, 2px) rotate(0deg); }
    40% { -webkit-transform:     translate(1px, -1px) rotate(1deg); }
    50% { -webkit-transform:     translate(-1px, 2px) rotate(-1deg); }
    60% { -webkit-transform:     translate(-3px, 1px) rotate(0deg); }
    70% { -webkit-transform:     translate(2px, 1px) rotate(-2deg); }
    80% { -webkit-transform:     translate(-1px, -1px) rotate(4deg); }
    90% { -webkit-transform:     translate(2px, 2px) rotate(0deg); }
    100%{ -webkit-transform:     translate(1px, -2px) rotate(-1deg); }
  }
  @keyframes click {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
</style>