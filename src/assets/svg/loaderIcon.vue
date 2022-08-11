<template>
  <div class="loader">
    <span class="loader__inner"></span>
  </div>
</template>

<style lang="scss" scoped>
  .loader {
    height: 60px;
    width: 60px;
    background-color: #FBFAF9;
    border-radius: 50px;
    border-left: 2px solid #C99D7A;
    border-top: 2px solid #C99D7A;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>