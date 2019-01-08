<template lang="pug">
  nav.menu.page
    p.menu-label Source
      ul.menu-list
        li
          router-link(:to="{name: 'post'}") Weblog
        li(@click="disableNotify") 
          a.disabled Read Mark
        li(@click="disableNotify") 
          a.disabled Undo Schema
    p.menu-label Achieve
      ul.menu-list
        li
          router-link(:to="{name: 'home',}", exact) Dashboard
        li
          router-link(:to="{name: 'tag'}") Tag
        li
          a.disabled Visualization
          ul
            li(@click="disableNotify") 
              a.disabled UV
    p.menu-label Service
       ul.menu-list
        li(@click="disableNotify") 
          a.disabled User
        li(@click="disableNotify") 
          a.disabled Setting
    p.menu-label Monitor
</template>
<script>
export default {
  methods: {
    disableNotify () {
      this.$vs.notify({title:'Warning',text:'当前不可用',color:'warning'})
    }
  }
}
</script>

<style lang="sass" scoped>
.menu 
  a
    text-transform: none
  .router-link-active
    background-color: #3273dc
    color: #fff
</style>
