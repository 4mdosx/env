<template lang="pug">
  header.header
    .icon
      slot(name="icon")
    span.text {{title}}
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="sass" scoped>
.header
  width: 100%
  box-shadow: 0 2px 0 0 #f5f5f5
  background-color: #fff
  padding: 0 1rem
  .icon, .text
    display: inline-block
  .icon
    height: 1rem
    width: 1rem
    position: relative
    top: 2px
    margin-right: 5px
</style>
