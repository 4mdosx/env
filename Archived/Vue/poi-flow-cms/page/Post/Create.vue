<template lang="pug">
  .page.create
    Header(title="new Post", icon="star")
      template(slot="btns")
        .icon-btn.mgl-10(@click="known")
          sIcon(name="up")
    PostEditor(:tags="tags" @save="submit")
    vs-progress.loading-bar(vs-indeterminate='', vs-color='primary', v-if="loading")
</template>

<script>
import Header from '../../components/Header/ControlHeader'
import PostEditor from '../../components/PostEditor'
import sIcon from '../../components/Icon'
import * as postModel from '../../api/post'

export default {
  data () {
    return { loading: false }
  },
  computed: {
    tags () {
      return this.$store.getters.tagsList || []
    }
  },
  methods: {
    validate (post) {
      console.log(post)
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
          await postModel.create({...post, doctype: 'markdown'})
          this.$vs.notify({title:'Success',text:'创建成功',color:'success'})
          this.$router.push({name: 'post'})
        } catch (error) {
          this.$vs.notify({title:'Failure',text: error.message, color:'danger'})
        } finally {
          this.loading = false
        }
      }
    },
    known () {
      this.$router.push({name: 'post'})
    }
  },
  mounted () {
    if (!this.tags.length) {
      this.$store.dispatch('fetchTag')
    }
  },
  components: {
    sIcon, Header, PostEditor
  }
}
</script>
