<template>
  <div class="svg-icon">
      <img :src="srcMap[name]" />
  </div>
</template>
<script>
import menu from '../assets/svg/menu.svg'
import pc from '../assets/svg/pc.svg'
import user from '../assets/svg/user.svg'
import tag from '../assets/svg/tag.svg'
import block from '../assets/svg/block.svg'
import del from '../assets/svg/del.svg'
import edit from '../assets/svg/edit.svg'
import love from '../assets/svg/love.svg'
import light from '../assets/svg/light.svg'
import up from '../assets/svg/up.svg'
import send from '../assets/svg/send.svg'
import star from '../assets/svg/star.svg'
import share from '../assets/svg/share.svg'

export default {
  data () {
    return {
      srcMap: {
        menu, pc, user, tag, block, del, share,
        edit, love, light, up, send, star
      }
    }
  },
  props: ['name']
}
</script>

<style lang="sass" scoped>
.svg-icon
  max-width: 54px
  max-height: 54px
</style>
