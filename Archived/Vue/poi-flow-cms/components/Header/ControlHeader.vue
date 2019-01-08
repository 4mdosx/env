<template lang="pug">
  header.header
    .header-title
      sIcon.icon(:name="icon")
      span.text {{title}}
    .control
      slot(name="btns")
</template>

<script>
import sIcon from '../Icon'

export default {
  props: ['title', 'icon'],
  components: {
    sIcon
  }
}
</script>

<style lang="sass" scoped>
.header
  height: 48px
  width: 100%
  box-shadow: 0 2px 0 0 #f5f5f5
  background-color: #fff
  padding: 0 1rem
  .icon
    height: 1.2rem
    width: 1.2rem
    position: absolute
    top: 16px
  .text
    position: relative
    left: 20px
    top: 1px
    width: 12em
  .control
    position: absolute
    right: 15px
    top: .75rem
  .icon-btn
    cursor: pointer
    display: inline-block
    height: 1.5rem
    width: 1.5rem
.mini-input
    width: 18em
    position: absolute
    top: -17px
    left: 50px
</style>
