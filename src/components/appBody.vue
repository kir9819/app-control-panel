<template>
  <div class="body">
    <tabs></tabs>
    <app-layout class="app-items wrap">
      <app-item v-for="(app, i) in applications" :key="i" :item="app"></app-item>
    </app-layout>
  </div>
</template>

<script>
import tabs from './tabs'
import appItem from './appItem'
import appLayout from './appLayout'

import { mapState, mapMutations } from 'vuex'
import types from '@/store/mutationTypes'

export default {
  computed: {
    ...mapState({
      desktops: state => state.desktops,
      desktopNames: state => state.desktopNames,
      currentDesktop: state => state.currentDesktop
    }),
    applications () {
      return this.$store.getters[`${this.currentDesktop}/applications`]
    },
  },
  components: {
    tabs,
    appItem,
    appLayout
  }  
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';
@import '@/assets/styles/main';

.body {
  background-color: $gray;
  padding: 50px;
  width: 856px;
}

.app-items {
  margin-top: 23px;

  .app-item {
    margin-bottom: 16px;

    &:nth-child(2n - 1) {
      margin-right: 16px;
    }
  }
}

</style>