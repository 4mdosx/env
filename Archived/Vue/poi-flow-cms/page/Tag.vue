<template lang="pug">
  .page
    .input-box
      vs-input(vs-icon='search' vs-placeholder='检索' v-model='searchTagName' disabled)
      vs-input(vs-icon='add' vs-placeholder='新增' v-model='newTagName' @keyup.enter="addTag")
    hr
    .tags
      .chip(v-for="(tag, index) in tags", :key="tag[0]")
        vs-chip(vs-color="primary")
          router-link(:to="{name: 'achieve-tag', params: {id: tag[0]}}") {{tag[1].name}}
    vs-progress.loading-bar(vs-indeterminate='', vs-color='warning', v-if="loading || isLoading")
</template>

<script>
import { create } from '../api/tag'

export default {
  data () {
    return {
      searchTagName: '',
      newTagName: '',
      loading: false
    }
  },
  methods: {
    async addTag () {
      try {
        if (this.loading) {
          this.$vs.notify({title: 'Warning', text: '加载中...', color: 'warning'})
          return
        }
        this.loading = true
        await create({
          name: this.newTagName
        })
        this.loading = false
        this.$store.dispatch('fetchTag')
      } catch (error) {
        this.$vs.notify({title: 'Error', text: error.message, color: 'danger'})
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tagsList || []
    },
    isLoading () {
      return this.$store.state.loading.tag
    }
  },
  mounted () {
    if (!this.tags.length) {
      this.$store.dispatch('fetchTag')
    }
  }
}
</script>
<style lang="sass">
.input-box
  .con-input
    margin: 10px 0 !important
.tags
  padding-bottom: 2rem
.chip .con-vs-chip
  cursor: pointer !important
  transition: background-color .3s
.chip:hover .con-vs-chip
  color: rgb(255,71,87)
  background-color: rgba(255,71,87, .2) !important
.chip:hover .vs-chip a
  color: rgb(255,71,87)
</style>
