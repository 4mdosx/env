<template lang="pug">
  .page
    .main
      template(v-if="loadSuccess")
        h1(style="font-size: 1.5rem") {{doc.title}}
        h2 {{doc.summary}}
        .section.status-bar.level
          .level-item.level-left
            Timer(:time="doc.update_at")
          .level-item.level-right
            | {{doc.doctype}}
        .section.content
          p(v-html="doc.content") {{doc.content}}
      template(v-else)
        span(@click="reload") 内容获取失败, 点击重试
    nav.side
      ul
        li.tag(v-for="tag in doc.tag" :key="tag.tag_id")
          nuxt-link(:to="{name: 'archive-id', params: {id: tag.tag_id}}")
            | # {{tag.name}}
</template>

<script>
import api from '~/vendor/api'
import Timer from '~/components/Timer'
import axios from 'axios'

export default {
  layout: 'blog',
  data () {
    return {
      doc: null,
      markdown: ''
    }
  },
  async asyncData ({params}) {
    let doc = await api.get(`/post/${params.id}`)
    if (doc && doc.doctype === 'markdown') {
      try {
        let { status, data } = await axios.post('https://api.github.com/markdown', 
          {
            'text': doc.content,
            'mode': 'markdown'
          })
        if (status === 200) {
          doc.content = data
        } else {
          throw new Error('github parser error')
        }
      } catch (error) {
        doc.content = error.message + doc.content
      }
    }
    return { doc }
  },
  computed: {
    loadSuccess () {
      return this.doc && typeof this.doc !== 'string'
    }
  },
  methods: {
    reload () {
      location.reload()
    }
  },
  components: {
    Timer
  }
}
</script>

<style lang="sass" scoped>
.page
  padding-top: 55px
  min-height: 100vh
.main
  width: 800px
.section
  padding: 2rem 0
.status-bar
  padding-bottom: 0
  border-bottom: 1px dashed rgba(0,0,0,0.2)
.side
  width: 100px
  position: fixed
  top: 55px
  right: 50px
  right: calc((100vw - 1000px) / 2)
  padding-top: 50px
.tag
  margin-bottom: .3rem
</style>
