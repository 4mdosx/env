<template lang="pug">
  .archive
    .section
      h2 Tags
      .tag-box(v-for="tag in tags", :key="tag.tag_id")
        .tag  
          nuxt-link(:to="{name: 'archive-id', params: {id: tag.tag_id}}") # {{tag.name}}
    .section
      h2 Project
</template>

<script>
import api from '~/vendor/api'

export default {
  layout: 'blog',
  data () {
    return {
      tags: []
    }
  },
  async asyncData (ctx) {
    const tags = await api.get('/tag') || []
    return {tags}
  }
}
</script>

<style lang="sass" scoped>
  .tag-box
    display: inline-block
    width: 25%
    margin-top: 1rem
</style>
