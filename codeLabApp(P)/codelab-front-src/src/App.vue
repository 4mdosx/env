<template>
  <div id="app">
    <app-nav></app-nav>
    <app-view>
    </app-view>
  </div>
</template>

<script>
import appNav from './components/appNav';
import appView from './components/appView';

export default {
  data: function () {
    return { appvueMsg: 'appvueMsg' }
  },
  components: {
    appNav,
    appView
  }
}
</script>

<style lang="sass">
  @import "./style/default.scss";
  @import "./style/appRoot.scss";
</style>
