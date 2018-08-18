<template lang="pug">
  .home
    section.text
      h1 简单的首页
    nav.home_nav
      nuxt-link(:to="{name: 'feed'}", class="home_nav-link") Blog
      nuxt-link(:to="{name: 'toolbox'}", class="home_nav-link") ToolBox
      nuxt-link(:to="{name: 'about'}", class="home_nav-link") About
    footer.home_footer
      | powered by 
      a(href="https://github.com/warcryDoggie" target="_blank") warcryDoggie
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";

export default {
  components: {
    AppLogo
  }
}
</script>

<style scoped lang="sass">
.home
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  min-height: 100vh
  .text
    text-align: center
.home_nav
  position: fixed
  top: 15px
  right: 15px
  .home_nav-link
    margin-left: 10px
.home_footer
  position: fixed
  bottom: 0
  left: 0
  padding-left: 15px
</style>
