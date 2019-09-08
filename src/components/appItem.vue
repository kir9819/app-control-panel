<template>
  <app-flex class="app-item shrink">
    <img class="app-item__img" v-lazy="icon">
    <div class="app-item__title">
      <span>{{ name }}</span>
    </div>
    <app-layout class="justify-space-between align-center app-item__items">
      <app-item-info :img="platform" border :text="price" :imgWidth="12"></app-item-info>
      <app-item-info img="star" :text="rating" :imgWidth="20"></app-item-info>
      <app-item-info img="mark" :text="location" :imgWidth="10"></app-item-info>
    </app-layout>

    <app-layout class="justify-space-between app-item__items-more">
      <app-item-info-more title="ASO index" :text="asoIndex"></app-item-info-more>
      <div class="delimeter"></div>
      <app-item-info-more title="Установок за месяц" :text="installations"></app-item-info-more>
      <div class="delimeter"></div>
      <app-item-info-more title="В категории" :text="categoryPosition"></app-item-info-more>
    </app-layout>
  </app-flex>
</template>

<script>
import appFlex from './appFlex'
import appLayout from './appLayout'
import appItemInfo from './appItemInfo'
import appItemInfoMore from './appItemInfoMore'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon () {
      return this.item.icon
    },
    asoIndex () {
      return this.item.asoindex
    },
    categoryPosition () {
      return this.item.categoryPosition
    },
    installations () {
      return filterBigNumber(Number(this.item.installations))
    },
    location () {
      return this.item.location
    },
    name () {
      return this.item.name
    },
    platform () {
      return this.item.platform
    },
    price () {
      return this.item.price
    },
    rating () {
      return this.item.rating
    }
  },
  components: {
    appFlex,
    appLayout,
    appItemInfo,
    appItemInfoMore
  }  
}

function filterBigNumber (number) {
  if (number > 1000000) {
    return Math.round(number / 1000000) + 'KK.'
  }
  
  if (number > 1000) {
    return Math.round(number / 1000) + 'K.'
  }

  return number
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.app-item {
  box-sizing: border-box;
  width: 420px;
  padding: 12px;
  border-radius: 13px;
  background-color: $light;

  &__title {
    font: 500 18px/24px Museo Sans Cyrl;
    display: block;
    display: -webkit-box;
    position: relative;
    letter-spacing: 0;
    height: 46px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &__img {
    width: 81px;
    height: 81px;
    margin-right: 16px;
    border-radius: 10px;
    float: left;
  }

  &__items {
    margin-top: 10px;
    padding-right: 24px;
  }

  &__items-more {
    margin-top: 26px;
    padding: 0 13px;
  }
}
</style>