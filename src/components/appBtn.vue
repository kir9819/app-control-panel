<template>
  <button
    v-on="$listeners"
    type="button"
    class="app-button"
    :class="{ 'app-button_active': active }"
  >
    <span class="app-button__text">
      <slot></slot>
    </span>
    <!-- <img class="app-button__img" v-if="img" :src="imgSrc"> -->
    <div class="app-button__img" v-if="img">
      <app-img :img="img" :color="active ? '#FFFFFF' : undefined"></app-img>
    </div>
  </button>
</template>

<script>
import appImg from './appImg'

export default {
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false
    },
    img: {
      type: String,
      required: false
    }
  },
  computed: {
    imgSrc () {
      return require(`../assets/svg/${this.img}.svg`)
    }
  },
  components: {
    appImg
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.app-button {
  outline: none;
  border-radius: 10px;
  height: 34px;
  width: 54px;
  background-color: $gray;
  color: $grayText;
  border: none;
  cursor: pointer;
  display: inline-block;

  &_active {
    background-color: $activeColor;
    color: $light;
  }

  &__text {
    font: 500 15px/18px Museo Sans Cyrl;
    letter-spacing: 0.13px;
  }

  &__img {}
}
</style>