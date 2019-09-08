<template>
  <app-flex class="item-info-more shrink">
    <span class="item-info-more__title">{{ title }}</span>
    <div class="item-info-more__text">{{ text }}</div>
  </app-flex>
</template>

<script>
import appFlex from './appFlex'
import appLayout from './appLayout'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: [ String, Number ],
      required: true
    }
  },
  components: {
    appFlex,
    appLayout
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.item-info-more {
  &__title {
    font: 500 12px/16px Museo Sans Cyrl;
    letter-spacing: 0;
    color: $grayText;
  }

  &__text {
    font: 900 26px/28px Museo Sans Cyrl;
    letter-spacing: 0;
    color: $textColor;
    margin-top: 10px;
    margin-bottom: 3px;
    text-align: center;
  }
}
</style>