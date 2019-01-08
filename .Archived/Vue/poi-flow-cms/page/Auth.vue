<template lang="pug">
  .page.auth
    .root-user-card(v-if="auth")
      h1
        span Hi,
        span.tag.is-info {{roleName[auth.roleName] || '萌新'}}
        span {{auth.name}}
      .right-end
        vs-button(@click="$store.dispatch('clearAuth')", vs-type="danger-filled") 退出
        vs-button.mgl-10(@click="$emit('minimal')") 最小化
    form.auth-form(v-else)
      legend 
        span 登陆
      vs-input(vs-label-placeholder="Username.email", name="username",  v-model="form.username")
      vs-input(vs-label-placeholder="Password", name="password", vs-type="password" v-model="form.password")
      vs-button.is-pulled-right(@click="submit", :class="{'button is-loading': isLoading}") submit
</template>

<script>
const emptyForm = {
  username: '',
  password: ''
}
export default {
  data () {
    return {
      form: Object.assign({}, emptyForm),
      roleName: {
        root: '大佬'
      }
    }
  },
  computed: {
    auth () {
      return this.$store.state.user.auth
    },
    token () {
      return this.$store.state.user.token
    },
    isLoading () {
      return this.$store.state.loading.user
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('submitAuth', this.form)
    },
    reset () {
      this.form = Object.assign({}, emptyForm)
    }
  }
}
</script>

<style lang="sass" scoped>
.auth
  min-height: 100px
.auth-form
  padding-top: 5px
.tag
  margin: 0 5px
  position: relative
  top: -2px
.code
  word-wrap: break-word
  word-break: break-all
.right-end
  position: absolute
  right: 10%
  bottom: 10%
</style>
