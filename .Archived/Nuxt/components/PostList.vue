<template lang="pug">
  section.section
    ul.post-list
      li.post-list_item(v-for="doc in list", :key="doc.doc_id")
        h2 
          nuxt-link(:to="{name: linkName, params: {id: doc.doc_id}}") {{doc.title}}
        p {{doc.summary}}
        .append-info.level
          Timer.time.level-tem.level-left(:time="doc.update_at")
          .item-tag.level-tem.level-right
            .tag.mgl-half-rem(v-for="tag in doc.tag" :key="tag.tag_id")
              nuxt-link(:to="{name: 'archive-id', params: {id: tag.tag_id}}")
                | # {{tag.name}}
</template>
<script>
import Timer from './Timer'

export default {
  props: ['list', 'linkName'],
  filters: {
    time (time) {
      return format(new Date(time), 'MM-DD HH:mm')
    }
  },
  components: {
    Timer
  }
}
</script>
<style lang="sass" scoped>
.section
  padding: 0
.post-list
  margin: 0
  padding: 0
  margin-bottom: 2rem
.post-list_item
  position: relative
  padding: 1rem 0rem 1rem 0rem
  border-bottom: 1px dashed rgba(0,0,0,0.2)
  p
    max-height: 135px
    word-break: break-all
    display: -webkit-box
    -webkit-line-clamp: 5 // 最多5行， 超过自杀
    -webkit-box-orient: vertical
    overflow: hidden
  .append-info
    position: relative
    margin-top: 1rem
  .time
    padding-top: 1px 
  .tag a
    color: inherit
</style>

