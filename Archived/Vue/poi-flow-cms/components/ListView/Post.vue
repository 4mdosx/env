<template lang="pug">
  vs-list
    .vs-list-item(
      v-for="item in list"
      :key="item.doc_id"
    )
      .item-header(@click="fetchPost(item.doc_id)")
        vs-list-header(:vs-title='item.title')
      .item-body
        vs-list-item.white(:vs-title='item.summary')
        vs-list-item(:vs-subtitle="format(new Date(item.update_at), 'YY-MM-DD HH:mm')")
          .tag-bar
            vs-chip(
              v-for="tagItem in item.tag"
              :key="tagItem.tag_id"
              vs-color='primary') 
                router-link(:to="{name: 'achieve-tag', params: {id: tagItem.tag_id}}") {{tagItem.name}}
        router-link.link-btn(:to="`/post/${item.doc_id}`",)
          sIcon.icon(name="send")
    vs-pagination(:vs-total='total', :vs-current='page', :vs-max="6" ,@page="fetch")
</template>
<script>
import { format } from 'date-fns'
import sIcon from '../Icon'

export default {
  data () {
    return {
      list: [],
      count: 1,
      page: 1,
      size: 15
    }
  },
  props: ['fetchMore', 'updateFlag', 'loading'],
  watch: {
    updateFlag () {
      this.fetch()
    }
  },
  computed: {
    total () {
      return Math.floor(this.count / this.size + 1)
    }
  },
  methods: {
    format,
    fetchPost (id) {
      this.$store.dispatch('callPost', {id})
    },
    async fetch (page) {
      if (page) this.page = page
      if (this.fetchMore) {
        try {
          this.$emit('update:loading', true)
          let res = await this.fetchMore({
            page: this.page,
            size: this.size
          })
          if (res) {
            Object.assign(this, res)
          }
        } catch (error) {
          this.$vs.notify({title: 'Error', text: error.message, color: 'danger'})
        } finally {
          this.$emit('update:loading', false)
        }
      }
    }
  },
  async mounted () {
    this.fetch()
  },
  components: {
    sIcon
  }
}
</script>
<style lang="sass" scoped>
.item-header
  cursor: pointer
.item-body
  position: relative
.link-btn
  cursor: pointer
  position: absolute
  top: 0
  right: 5px
.icon
  height: 1rem
  width: 1rem
.white
  width: inherit
  white-space: normal
.tag-bar
  width: 250px
  overflow-x: scroll
  text-align: right
  padding-right: 15px
</style>
