<template lang="pug">
  .page.dashboard
    waterfall(:line-gap="385")
      waterfallSlot(
        :width="385"
        :height="677"
      )
        .card.standard-view
          .card-header
            CardHeader(:title="'导航'")
              sIcon(name="menu", slot="icon")
          .card-body
            Menu
      waterfallSlot(
        :width="385"
        :height="677"
      )
        .card.standard-view
          h1 mmm2
      waterfallSlot(
        :width="385"
        :height="200"
      )
        .card
          h1 +++
</template>

<script>
import { waterfall, waterfallSlot } from 'vue-waterfall'
import Menu from '../components/MenuCard'
import sIcon from '../components/Icon'
import CardHeader from '../components/CardHeader'

export default {
  components: {
    sIcon,
    Menu,
    waterfall,
    CardHeader,
    waterfallSlot
  },
  mounted () {
    // console.log(svg)
  }
}
</script>
<style lang="sass" scoped>
.dashboard
  padding: 5px
.card
  position: relative
  .card-header
    position: fixed
    width: 375px
  .card-body
    padding: 0 15px
    padding-top: 3rem
</style>
<style lang="sass">
.vue-waterfall-slot
  padding: 5px
</style>

