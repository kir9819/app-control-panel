<template>
  <div class="home">
    <app-body></app-body>
  </div>
</template>

<script>
import appBody from '@/components/appBody'

import { mapActions, mapState, mapMutations } from 'vuex'
import types from '@/store/mutationTypes'

export default {
  name: 'home',
  async created () {
    await this.init()

    const routeType = this.$route.query.t

    if (routeType && this.desktops.indexOf(routeType) !== -1) {
      this[types.CHANGE_CURRENT_DESKTOP](routeType)
    }
  },
  computed: {
    ...mapState({
      desktops: state => state.desktops
    })
  },
  methods: {
    ...mapActions({
      init: 'init'
    }),
    ...mapMutations([
      types.CHANGE_CURRENT_DESKTOP
    ])
  },
  components: {
    appBody,
  }
}
</script>
