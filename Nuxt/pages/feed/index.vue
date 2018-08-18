<template lang="pug">
  .posts
    PostList(:list="list" linkName="feed-post-id")
    b-pagination(:total='count', :current.sync='page', :per-page='size', @change="fetchData")
</template>

<script>
import api from '~/vendor/api'
import PostList from '~/components/PostList'

export default {
  layout: 'blog',
  data () {
    return {
      list: [],
      count: 0,
      size: 15,
      page: 1
    }
  },
  async asyncData () {
    let res = await api.get('/post') || {list: [], count: 0, size: 15, page: 1}
    return res
  },
  methods: {
    async fetchData (setPage = 1) {
      if (setPage) this.page = setPage
      let {list = [], count = 0, page = 1, size = 15} = await api.get(
        `/post`, 
        {
          page: this.page,
          size: this.size
        })
      Object.assign(this, {
        list,
        count,
        page,
        size
      })
    }
  },
  mounted () {
    this.fetchData()
  },
  components: {
    PostList
  }
}
</script>