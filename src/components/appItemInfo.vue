<template>
  <app-flex class="item-info shrink">
    <app-layout class="align-center">
      <div class="item-info__img" :style="{ maxWidth: imgWidth + 'px'}">
        <app-img :img="img" :width="imgWidth"></app-img>
      </div>
      <span
        class="item-info__text"
        :class="{ 'item-info__text_border': border }"
      >{{ text }}</span>
    </app-layout>
  </app-flex>
</template>

<script>
import appFlex from './appFlex'
import appLayout from './appLayout'
import appImg from './appImg'

export default {
  props: {
    img: {
      type: String,
      required: true
    },
    border: {
      type: Boolean,
      required: false,
      default: false
    },
    text: {
      type: String,
      required: true
    },
    imgWidth: {
      type: Number
    }
  },
  computed: {
    imgSrc () {
      return require(`../assets/svg/${this.img}.svg`)
    }
  },
  components: {
    appFlex,
    appLayout,
    appImg
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.item-info {
  .layout {
    height: 24px;
  }

  &__img {
    margin-right: 6px;
    display: inline-block;
  }

  &__text {
    font: 500 15px/18px Museo Sans Cyrl;
    letter-spacing: 0.13px;
    color: $textColor;

    &_border {
      font: 500 13px/15px Museo Sans Cyrl;
      letter-spacing: 0.11px;
      color: $grayText;
      border: 1px solid $grayText;
      border-radius: 6px;
      padding: 4px 6px 5px 6px;
    }
  }
}
</style>