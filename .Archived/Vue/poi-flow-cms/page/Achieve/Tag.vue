<template lang="pug">
  .page.achieve
    header.header
      .header-title
        sIcon.icon(name="block")
        vs-input.mini-input(
          v-if="isEditing"
          v-model="newTagName"
          :vs-placeholder="tag.name"
        )
        span.text(v-else, @dblclick="isEditing = true") {{tag.name}}
      .control
        .icon-btn(@click="toggleInput")
          sIcon(name="edit")
        .icon-btn.mgl-10(@click="$router.push({name: 'tag'})")
          sIcon(name="up")
    .main
      ListView_Post(
        :fetchMore="fetchMore"
        :updateFlag="tagId + updateCount"
        :loading.sync="loading"
      )
    vs-progress.loading-bar(vs-indeterminate='', vs-color='primary', v-if="loading")
    vs-progress.loading-bar(vs-indeterminate='', vs-color='warning', v-if="storeLoading")
</template>

<script>
import sIcon from '../../components/Icon'
import ListView_Post from '../../components/ListView/Post'
import * as tagModel from '../../api/tag'
import * as postModel from '../../api/post'

export default {
  data () {
    return {
      loading: false,
      isEditing: false,
      newTagName: ''
    }
  },
  computed: {
    tagId () {
      return this.$route.params.id
    },
    tag () {
      return this.$store.state.tag[this.tagId] || {}
    },
    tagName () {
      return this.tag.name
    },
    updateCount () {
      return this.$store.state.post.updateCount
    },
    storeLoading () {
      return this.$store.state.loading.post || this.$store.state.loading.tag
    }
  },
  watch: {
    tag (tag) {
      this.newTagName = tag.name
    }
  },
  methods: {
    fetchMore (params) {
      return postModel.fetchByTag(this.tagId, params)
    },
    async toggleInput () {
      if (this.isEditing) {
        this.isEditing = false
        await tagModel.update({id:this.tagId, name: this.newTagName})
        this.$store.dispatch('fetchTag')
      } else {
        this.isEditing = true
      }
    }
  },
  mounted () {
    if (!this.tag.name) {
      this.$store.dispatch('fetchTag')
    } else {
      this.newTagName = this.tag.name
    }
  },
  components: { sIcon, ListView_Post }
}
</script>

<style lang="sass" scoped>
.page
  padding: 0 2px
.main
  padding-top: 5px
  padding-bottom: 60px
  height: 675px
  overflow: scroll
.header
  height: 48px
  width: 100%
  box-shadow: 0 2px 0 0 #f5f5f5
  background-color: #fff
  padding: 0 1rem
  z-index: 10
  position: relative
  .icon
    height: 1.2rem
    width: 1.2rem
    position: absolute
    top: 16px
  .text
    position: relative
    left: 20px
    top: 1px
    width: 12em
  .control
    position: absolute
    right: 15px
    top: .75rem
  .icon-btn
    cursor: pointer
    display: inline-block
    height: 1.5rem
    width: 1.5rem
.mini-input
    width: 12em
    position: absolute
    top: -17px
    left: 50px
</style>
