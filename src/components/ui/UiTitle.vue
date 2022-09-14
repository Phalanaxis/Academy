<template>
  <h2>
    <slot />
  </h2>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  h2 {
    margin: 0 0 30rem 0;
    font-family: Montserrat;
    font-size: 40rem;
    font-weight: 600;
    line-height: 60rem;
    color: #644C5C;
    @media screen and (max-width: 680px) {
      font-size: 24px;
      line-height: 30px;
    }
  }
</style>