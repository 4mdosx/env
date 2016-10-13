<template>
  <div id="app">
    <app-nav></app-nav>
    <app-view>
      <app-banner></app-banner>
      <app-news></app-news>
    </app-view>
    <p>
    </p>
  </div>
</template>

<script>
import appNav from './components/appNav';
import appView from './components/appView';
import appBanner from './components/appBanner';
import appNews from './components/appNews';

export default {
  components: {
    appNav,
    appView,
    appBanner,
    appNews
  }
}
</script>

<style lang="sass">
  @import "./style/default.scss";
  @import "./style/appRoot.scss";
</style>
