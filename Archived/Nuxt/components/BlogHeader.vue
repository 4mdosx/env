<template lang="pug">
  header
    .logo
      router-link.mgl-15(:to="{name:'index'}") Chaosd's Studio
    nav
      router-link.mgl-15(:to="{name:'feed'}") Feed
      router-link.mgl-15(:to="{name:'archive'}") Archive
      router-link.mgl-15(:to="{name:'about'}") About
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
@import "~/assets/variable.sass";
header
  z-index: $header-z-index
  box-shadow: 0 2px 15px 0 rgba(0,0,0,.05)
  background: #fff
  left: 0
  top: 0
  position: fixed
  width: 100%
  height: 55px
  display: flex
  align-items: center
  justify-content: space-between
  padding-left: 50px
  padding-right: 20px
  transition: all .3s ease
  .logo
    font-size: 1.2rem
    font-weight: 500
    line-height: 55px
    color: #ddd
    font-family: "Orbitron", sans-serif
    text-shadow: 0 0 1px #000, 0 0 5px #000, 0 0 15px #228dff
    a
      color: #ddd
  a
    display: inline-block
    padding: 0 6px
    height: 100%
    position: relative
  nav
    .nuxt-link-exact-active, .nuxt-link-active
      &::after
        position: absolute
        top: -21px
        width: 100%
        height: 10px
        content: ""
        background: #3273dc
        left: 50%;
        transform: translate(-50%)
        transition: all .3s ease
        border-radius: 20px
</style>
