<template>
  <div class="file">
    <svg class="file__svg" width="80" height="103" viewBox="0 0 80 103" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.000976562 23.3223V87.4602C0.000976562 95.7444 6.71669 102.46 15.001 102.46H64.9999C73.2842 102.46 79.9999 95.7444 79.9999 87.4602V15C79.9999 6.71573 73.2842 0 64.9999 0H23.3233L0.000976562 23.3223Z" fill="#E0DBDE"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 23.3224L23.3222 0.00024618V8.32241C23.3222 16.6067 16.6064 23.3224 8.32216 23.3224H0Z" fill="#644C5C"/>
    </svg>
    <div class="file__box">
      <div class="file__name">
        Теория
      </div>
      <a target="_blank" class="file__link">
        <svg class="file__arrow" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13.2485" cy="13.6082" r="12.7661" transform="rotate(90 13.2485 13.6082)" stroke="#93828D" stroke-width="0.964997"/>
          <path d="M13.2467 18.9263L16.1748 15.9982L15.5483 15.3853L13.6825 17.2511L13.6825 8.50769L12.8109 8.50769L12.8109 17.2511L10.9451 15.3853L10.3186 15.9982L13.2467 18.9263Z" fill="#93828D"/>
        </svg>
        <div class="file__text">
          Скачать
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    

    return {}
  },
  props: {
    text: {
      type: String,
      default: 'Какой-то файл'
    },
    url: {
      type: Object,
      default: () => {}
    },
    link: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  position: relative;
  display: flex;
  width: fit-content;
  &__box {
    padding: 5px 0 0 10px;
  }
  &__name {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: #644C5C;
  }
  &__link {
    position: absolute;
    bottom: 15px;
    display: flex;
    cursor: pointer;
  }
  &__text {
    color: #93828D;
    margin-left: 13px;
  }
  &:hover {
  .file__svg {
      animation: jump .7s;
      transition-timing-function: ease-in-out;
    }
  }
}

@keyframes jump {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(5deg);
  }
  66% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>