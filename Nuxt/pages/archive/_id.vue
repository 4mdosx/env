<template lang="pug">
  .archive
    .main
      template(v-if="tag.name")
        h1 # {{tag.name}}
        PostList(:list="list", linkName="archive-post-id")
        b-pagination(:total='count', :current.sync='page', :per-page='size', @change="fetchData")
      template(v-else)
        span(@click="reload") 内容获取失败, 点击重试
</template>

<script>
import api from '~/vendor/api'
import PostList from '~/components/PostList'

export default {
  layout: 'blog',
  data () {
    return {
      tag: {},
      list: [],
      count: 0,
      size: 15,
      page: 1
    }
  },
  async asyncData ({params}) {
    let tag = await api.get(`/tag/${params.id}`)
    let {list, count, page, size} = await api.get(`/post/query`, {
      tag: params.id
    }) || {}
    return { tag, list, count, page, size }
  },
  methods: {
    async fetchData (setPage = 1) {
      let {list = [], count = 0, page = 1, size = 15} = await api.get(
        `/post`, 
        {
          page: this.page || setPage,
          size: this.size
        })
      || {}
      Object.assign(this, {
        list,
        count,
        current,
        size
      })
    },
    reload () {
      location.reload()
    }
  },
  components: {
    PostList
  }
}
</script>

<style lang="sass" scoped>
.archive
  padding-top: 55px
  min-height: 100vh
.main
  width: 800px
.tag
  margin-bottom: .3rem
</style>
