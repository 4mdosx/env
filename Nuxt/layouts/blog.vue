<template lang="pug">
  .layout_blog
    Header
    main.ssr_body
      nuxt
</template>

<script>
import Header from '~/components/BlogHeader'

export default {
  components: {
    Header
  }
}
</script>

<style lang="sass" scoped>
.ssr_body
  width: 800px
  margin: 0 auto
  padding-top: 55px
</style>
