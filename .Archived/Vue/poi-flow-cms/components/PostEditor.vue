<template lang="pug">
.post-editor
  vs-tabs
    vs-tab(vs-label='Title')
      form.basic-form
        vs-input(vs-label="Title", :vs-placeholder='draft.title', v-model='draft.title')
        vs-input(vs-label="Summary", :vs-placeholder='draft.summary', v-model='draft.summary')
        vs-input(vs-label="URI_NAME"
          :vs-placeholder='draft.uri_name'
          v-model='draft.uri_name'
        )
    vs-tab(vs-label='Tag')
      .chip-select
        .chip(v-for="(tag, index) in tags", :key="tag[0]", @click="select(tag[0], tag[1])")
          template(v-if="postTag[tag[0]]")
            vs-chip(vs-icon='check_circle', vs-color='success') {{tag[1].name}}
          template(v-else)
            vs-chip(vs-color="primary") {{tag[1].name}}
    vs-tab(vs-label='Content')
      .editor-box
        mavonEditor#editor(
          v-model="draft.content"
          defaultOpen="edit"
          :subfield="false"
          :toolbars="toolBarConf"
          @save="save"
        )
</template>

<script>
// https://github.com/hinesboy/mavonEditor
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import cloneDeep from 'lodash'
import toolBarConf from '../assets/editor-toolbar'

const empty = {
  title: '',
  summary: '',
  uri_name: '',
  tag: [],
  content: ''
}
export default {
  data () {
    return {
      draft: Object.assign({}, empty),
      toolBarConf
    }
  },
  computed: {
    postTag () {
      let tagMap = {}
      this.draft.tag.forEach(tag => {
        tagMap[tag.tag_id] = tag
      })
      return tagMap
    }
  },
  props: {
    post: {
      default () {
        return Object.assign({}, empty)
      }
    },
    tags: {
      required: true
    },
    create: {
      default: false
    }
  },
  watch: {
    post (post) {
      this.draft = {...post}
    }
  },
  methods: {
    select (tagId, tag) {
      if (this.postTag[tagId]) {
        this.draft.tag = this.draft.tag.filter(tag => tag.tag_id !== tagId)
      } else {
        this.draft.tag = [...this.draft.tag, tag]
      }
    },
    save () {
      this.$emit('save', {...this.draft})
    }
  },
  components: {
    mavonEditor
  }
}
</script>
<style lang="sass" scoped>
.editor-box
  margin-top: 3px
  height: 650px
  overflow: scroll
.basic-form
  padding: 0 15px
.chip-select
  display: flex
  width: 375px
  flex-wrap: wrap
  min-height: 500px
  justify-content: flex-start
  align-content: start
  .chip
    width: auto
    height: 40px
#editor
  min-height: 675px
</style>