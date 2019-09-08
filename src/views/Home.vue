<template>
  <div class="home">
    <app-body></app-body>
  </div>
</template>

<script>
import appBody from '@/components/appBody'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'home',
  created () {
    this.init()
  },
  computed: {
    ...mapState({
      desktops: state => state.desktops
    })
  },
  methods: {
    ...mapActions({
      init: 'init'
    })
  },
  components: {
    appBody,
  }
}
</script>
