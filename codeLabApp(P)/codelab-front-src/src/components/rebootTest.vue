<template lang="html">
  <div class="rebootTest" v-if="ifRebootFlag">
    <h1>Header 1  中文标题 日本語タイトル 한국어 제목</h1>
    <h2>Header 2  中文标题 日本語タイトル 한국어 제목</h2>
    <h3>Header 3  中文标题 日本語タイトル 한국어 제목</h3>
    <h4>Header 4  中文标题 日本語タイトル 한국어 제목</h4>
    <h5>Header 5  中文标题 日本語タイトル 한국어 제목</h5>
    <h6>Header 6  中文标题 日本語タイトル 한국어 제목</h6>
    <p>
      Vue binding : {{ message }} ;
    </p>
    <p>
      Paragraph Paragraph Paragraph Paragraph Paragraph,
      Paragraph Paragraph Paragraph Paragraph Paragraph
      Paragraph.Paragraph -- Paragraph!@#$%^&*();
    </p>
    <p>
      正文段落 正文段落 正文段落 正文段落 正文段落 正文段落 ，
      正文段落 正文段落 正文段落 111正文段落 正文段落 正文段落
      正文段落 。正文段落 -- 正文段落 ！@#¥%……&*（）；
    </p>
    <a href="#">There is a link</a>
    <p>
      <a href="#">There is a inline link</a>
    </p>
    <img src="../img/stuff.jpg" alt="target it" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      message : 'get it 0v0',
      ifRebootFlag : false
    }
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
