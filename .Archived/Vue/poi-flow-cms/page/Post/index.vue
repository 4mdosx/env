<template lang="pug">
  .page
    .post
      ListView_Post(
        :fetchMore="fetchMore"
        :updateFlag="updateCount"
        :loading.sync="loading"
      )
      router-link.add-btn(:to="{name: 'post-create'}") 
        vs-button.code(vs-type='primary-gradient') New Post()
      vs-progress.loading-bar(vs-indeterminate='', vs-color='primary', v-if="loading")
</template>

<script>
import ListView_Post from '../../components/ListView/Post'
import * as postModel from '../../api/post'

export default {
  data () {
    return { loading: false }
  },
  methods: {
    fetchMore (params) {
      return postModel.fetchList(params)
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tagsList || []
    },
    updateCount () {
      return this.$store.state.post.updateCount
    }
  },
  mounted () {
    if (!this.tags.length) {
      this.$store.dispatch('fetchTag')
    }
  },
  components: { ListView_Post }
}
</script>
<style lang="sass" scoped>
.page
  margin: 0 -10px
  margin-top: -0.2rem
  height: 675px
  overflow: scroll
.post
  padding-bottom: 120px
.add-btn
  position: absolute
  bottom: 5px
  left: 5px
</style>
