<template lang="pug">
  .page
    Header(title="Edit Post", icon="star")
      template(slot="btns")
        .icon-btn.mgl-10(@click="del")
          sIcon(name="del")
        .icon-btn.mgl-10(@click="known")
          sIcon(name="up")
    PostEditor(:tags="tags" @save="submit" :post="doc")
    vs-progress.loading-bar(vs-indeterminate='', vs-color='primary', v-if="loading")
</template>

<script>
import Header from '../../components/Header/ControlHeader'
import PostEditor from '../../components/PostEditor'
import sIcon from '../../components/Icon'
import * as postModel from '../../api/post'

export default {
  data () {
    return {
      doc: null,
      loading: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    tags () {
      return this.$store.getters.tagsList || []
    }
  },
  watch: {
    id () {
      this.fetchDoc()
    }
  },
  methods: {
    validate (post) {
      let valid = true
      Object.entries(post).forEach(entry => {
        if (!entry[1].length) {
          this.$vs.notify({title: 'Error', text: entry[0] + ' 不能为空',color: 'danger'})
          valid = false
        }
      })
      return valid
    },
    async submit (post) {
      if (this.validate(post)) {
        try {
          this.loading = true
          await postModel.update(this.id, {...post, doctype: 'markdown'})
          this.$vs.notify({title:'Success',text:'创建成功',color:'success'})
          this.$router.push({name: 'post'})
        } catch (error) {
          this.$vs.notify({title:'Failure',text: error.message, color:'danger'})
        } finally {
          this.loading = false
        }
      }
    },
    async del () {
      try {
        if (this.loading) this.$vs.notify({title:'Warning',text:'加载未完成...',color:'warning'})
        this.loading = true
        await postModel.remove(this.id)
        this.$store.commit('updatePostCountAdd')
        this.$store.commit('blurPost', this.id)
        this.$router.push({name: 'post'})
        this.$vs.notify({title:'Success',text:'删除成功',color:'success'})
      } catch (error) {
        this.$vs.notify({title:'Failure',text: error.message, color:'danger'})
      } finally {
        this.loading = false
      }
    },
    known () {
      this.$router.push({name: 'post'})
    },
    async fetchDoc () {
      let res = await postModel.fetchContent(this.id)
      if (res) {
        this.doc = res
      }
    }
  },
  async mounted () {
    if (!this.tags.length) {
      await this.$store.dispatch('fetchTag')
    }
    this.fetchDoc() 
  },
  components: {
    sIcon, Header, PostEditor
  }
}
</script>