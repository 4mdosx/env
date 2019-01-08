<template lang="pug">
  .page
    .section
      a(href="https://github.com/chaosdogl")
        b-icon(icon="github-circle" size="is-large")
      a(href="https://twitter.com/warDoggie1711")
        b-icon(icon="twitter-circle" size="is-large")
      hr
      a.link(href="/")  Home
</template>

<style lang="sass" scoped>
.page
  display: flex
  flex-wrap: wrap
  justify-content: center
  align-items: center
  min-height: 100vh
.link
  text-align: center
  display: inline-block
  width: 100%
</style>
