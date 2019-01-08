<template lang="pug">
.page.preview
  template(v-if="showPost")
    Header(title="Editor" icon="light")
      template(slot="btns")
        .icon-btn.mgl-10(@click="del")
          sIcon(name="del")
        .icon-btn.mgl-10(@click="known")
          sIcon(name="up")
    vs-tabs
      vs-tab(vs-label='Title')
        form.basic-form
          vs-input(vs-label="Title", :vs-placeholder='form.title', v-model='form.title')
          vs-input(vs-label="Summary", :vs-placeholder='form.summary', v-model='form.summary')
          vs-input(vs-label="URI_NAME"
            :vs-placeholder='form.uri_name'
            v-model='form.uri_name'
            disabled="true"
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
            v-model="form.content"
            defaultOpen="edit"
            :subfield="false"
            :toolbars="toolBarConf"
            @save="save"
          )
  template(v-else)
    sIcon.placeholder(name="light", slot="icon")
  vs-progress.loading-bar(vs-indeterminate='', vs-color='primary', v-if="loading")
  vs-progress.loading-bar(vs-indeterminate='', vs-color='warning', v-if="storeLoading")
</template>

<script>
import { mavonEditor } from 'mavon-editor' // https://github.com/hinesboy/mavonEditor
import 'mavon-editor/dist/css/index.css'
import cloneDeep from 'lodash'

import sIcon from '../components/Icon'
import Header from '../components/Header/ControlHeader'
import { update, remove } from '../api/post'
import toolBarConf from '../assets/editor-toolbar'

export default {
  data () {
    return {
      loading: false,
      form: {
        title: '',
        summary: '',
        uri_name: '',
        tag: [],
        content: ''
      },
      toolBarConf
    }
  },
  methods: {
    select (tagId, tag) {
      if (this.postTag[tagId]) {
        this.form.tag = this.form.tag.filter(tag => tag.tag_id !== tagId)
      } else {
        this.form.tag = [...this.form.tag, tag]
      }
    },
    async save () {
      try {
        if (this.loading) this.$vs.notify({title:'Warning',text:'加载未完成...',color:'warning'})
        this.loading = true
        await update(this.post.doc_id, this.form)
        this.$store.commit('updatePostCountAdd')
        this.$vs.notify({title:'Success',text:'内容更新成功',color:'success'})
      } catch (error) {
        this.$vs.notify({title:'Failure',text: error.message, color:'danger'})
      } finally {
        this.loading = false
      }
    },
    async del () {
      try {
        if (this.loading) this.$vs.notify({title:'Warning',text:'加载未完成...',color:'warning'})
        this.loading = true
        await removePost(this.post.doc_id)
        this.$store.commit('updatePostCountAdd')
        this.$store.commit('blurPost')
        this.$vs.notify({title:'Success',text:'删除成功',color:'success'})
      } catch (error) {
        this.$vs.notify({title:'Failure',text: error.message, color:'danger'})
      } finally {
        this.loading = false
      }
    },
    known () {
      this.$store.commit('blurPost')
    }
  },
  watch: {
    post (post) {
      this.form = {...post}
    }
  },
  computed: {
    storeLoading () {
      return this.$store.state.loading.post
    },
    showPost () {
      return this.$store.getters.showPost
    },
    post () {
      return this.$store.state.post.focus
    },
    tags () {
      return this.$store.getters.tagsList || []
    },
    postTag () {
      let tagMap = {}
      this.form.tag.forEach(tag => {
        tagMap[tag.tag_id] = tag
      })
      return tagMap
    }
  },
  components: {
    Header, sIcon, mavonEditor
  }
}
</script>
<style lang="sass" scoped>
.placeholder
  margin: 0 auto
  margin-top: 270px
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