<template >
  <app-flex class="tab-block shrink">
    <span class="tab-block__title">{{ title }}</span>
    <div class="tab-block__items">
      <slot></slot>
    </div>
  </app-flex>
</template>

<script>
import appFlex from './appFlex'

export default {
  name: 'tabBlock',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    appFlex
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.tab-block {
  &__title {
    font: 500 15px/29px Museo Sans Cyrl;
    letter-spacing: 0;
  }

  &__items {
    margin-top: 18px;
  }
}
</style>