<template>
  <div class="tabs">
    <app-layout>
      <template v-for="desktop in desktops">
        <app-flex
          :key="desktop"
          class="tabs__item shrink"
          :class="{ 'tabs__item_active': currentDesktop === desktop}"
          @click="changeCurrentTab(desktop)"
        >
          <div class="active-decoration"></div>
          <div class="tabs__text">{{ desktopNames[desktop] }}</div></app-flex>
      </template>
    </app-layout>
    <tab-body></tab-body>
  </div>
</template>

<script>
import appLayout from './appLayout'
import appFlex from './appFlex'
import tabBody from './tabBody'

import { mapState, mapMutations } from 'vuex'
import types from '@/store/mutationTypes'

export default {
  computed: {
    ...mapState({
      desktops: state => state.desktops,
      desktopNames: state => state.desktopNames,
      currentDesktop: state => state.currentDesktop
    })
  },
  methods: {
    ...mapMutations([
      types.CHANGE_CURRENT_DESKTOP
    ]),
    changeCurrentTab (name) {
      this[types.CHANGE_CURRENT_DESKTOP](name)
    }
  },
  components: {
    appLayout,
    appFlex,
    tabBody
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.tabs {

  &__text {
    font: 500 15px/18px Museo Sans Cyrl;
    letter-spacing: 0.13px;
    padding: 8px 16px 6px 20px;
    position: relative;
    z-index: 2;
  }

  &__item {
    border-radius: 13px 13px 0 0;
    background-color: $darkGray;
    color: $grayText;
    cursor: pointer;

    > .active-decoration {
      display: none;
    }

    &_active {
      background-color: $light;
      color: $textColor;
      position: relative;

      > .active-decoration {
        display: block;
        width: 100%;

        &::before, &::after {
          content: '';
          position: absolute;
          width: 13px;
          height: 13px;
          bottom: 0;
          background-color: $light;
        }

        &::before {
          left: -13px;
        }

        &::after {
          right: -13px;
        }
      }

      &::before, &::after {
        content: '';
        position: absolute;
        width: 26px;
        height: 26px;
        z-index: 1;
        bottom: 0;
        border-radius: 13px;
        background-color: $darkGray;
      }

      &::before {
        left: -26px;
      }

      &::after {
        right: -26px;
      }

      &:first-child {
        &::before {
          display: none;
        }

        > .active-decoration {
          &::before {
            display: none;
          }
        }
      }

      &:last-child {
        &::after {
          background-color: $gray;
        }
      }
    }
  }
}
</style>