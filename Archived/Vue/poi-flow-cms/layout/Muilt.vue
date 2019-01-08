<template lang="pug">
  .page.dashboard
    waterfall(:line-gap="385")
      waterfallSlot(
        :width="385"
        :height="677"
      )
        .card.standard-view
          .card-header
            Header(title="导航")
              sIcon(name="menu", slot="icon")
          .card-body
            Nav
      waterfallSlot(
        :width="385"
        :height="677"
      ) 
        .card.standard-view(v-if="$route.meta.nude")
          router-view
        .card.standard-view(v-else)
          .card-header
            Header(:title="$route.meta.title")
              sIcon(:name="$route.meta.icon", slot="icon")
          .card-body
            router-view
      //- TODO: bind $stroe.view
      waterfallSlot(
        :width="385"
        :height="677"
      ) 
        .card.standard-view
          Preview
      waterfallSlot(
        :width="385"
        :height="400"
      ) 
        .minimal(v-if="miniAuth || !isAuthed", @click="miniAuth = false")
          sIcon(name="user", slot="icon")
        .card(v-else)
          .card-header
            Header(title="Admin")
              sIcon(name="user", slot="icon")
          .card-body
            Auth(@minimal="miniAuth = true")
</template>

<script>
import { waterfall, waterfallSlot } from 'vue-waterfall'
import sIcon from '../components/Icon'
import Header from '../components/Header/DefaultHeader'
import Nav from '../page/Nav'
import Auth from '../page/Auth'
import Preview from '../page/Preview'

export default {
  data () {
    return {
      miniAuth: true,
      showPreview: false
    }
  },
  computed: {
    isAuthed () {
      return this.$store.getters.isAuthed
    },
    errors () {
      return this.$store.state.errors
    }
  },
  watch: {
    errors (errors) {
      this.$vs.notify({title:'错误', text: errors[0].message || 'mmm', color: 'danger'})
    }
  },
  components: {
    waterfall,
    waterfallSlot,
    sIcon,
    Header,
    Nav,
    Auth,
    Preview
  }
}
</script>
<style lang="sass" scoped>
.dashboard
  padding: 5px
.card
  position: relative
  overflow: hidden
  .card-header
    position: abslute
    width: 375px
  .card-body
    overflow-x: hidden
    overflow-y: scroll
    padding: 0 15px
    padding-top: .5rem
.minimal
  .svg-icon
    width: 44px
    height: 44px
    border: 1px solid #ccc
    border-radius: 50%
    cursor: pointer
    box-shadow: 0px 0px 5px 0px #3273dc
</style>
<style lang="sass">
.vue-waterfall-slot
  padding: 5px
</style>

