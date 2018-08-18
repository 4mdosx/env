<template lang="pug">
  .timer
    b-icon(icon="alarm")
    span {{formatTime}}
</template>

<script>
import { format } from 'date-fns'

export default {
  props: ['time'],
  computed: {
    formatTime () {
      return format(new Date(this.time), 'MM-DD HH:mm')
    }
  }
}
</script>

<style lang="sass" scoped>
.timer span
  line-height: 27px
</style>
