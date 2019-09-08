<template>
  <app-layout class="tab-body wrap">
    <tab-block title="Фильтр">
      <app-layout>
        <app-btn @click="platform = platformTypes.all" :active="all">Все</app-btn>
        <app-btn @click="platform = platformTypes.apple" :active="apple" img="apple"></app-btn>
        <app-btn @click="platform = platformTypes.android" :active="android" img="android"></app-btn>
      </app-layout>
    </tab-block>

    <tab-block title="Рейтинг">
      <app-select
        :key="currentDesktop"
        placeholder="Выбрать"
        :selected="rating"
        @updateOption="changeRating"
        :options="options"
        class="app-select"
      ></app-select>
    </tab-block>
  </app-layout>
</template>

<script>
import tabBlock from './tabBlock'
import appLayout from './appLayout'
import appBtn from './appBtn'

import appSelect from 'vue-dropdowns'

import { platformTypes, ratingTypes } from '@/store/desktopModule'

import { mapState, mapMutations } from 'vuex'
import types from '@/store/mutationTypes'

export default {
  name: 'tabBody',
  data: () => ({
    platformTypes: platformTypes,
    options: [
      {
        value: ratingTypes.none,
        name: 'Выбрать'
      },
      {
        value: ratingTypes.from4,
        name: 'от 4,0',
        star: true
      },
      {
        value: ratingTypes.from3,
        name: 'от 3,0',
        star: true
      },
      {
        value: ratingTypes.from2,
        name: 'от 2,0',
        star: true
      },
    ]
  }),
  computed: {
    ...mapState({
      desktops: state => state.desktops,
      currentDesktop: state => state.currentDesktop
    }),
    desktop () {
      return this.$store.state[this.currentDesktop]
    },
    name: {
      get () {
        return this.desktop.name
      },
      set (v) {
        return this.setName(v)
      }
    },
    platform: {
      get () {
        return this.desktop.platform
      },
      set (v) {
        return this.setPlatform(v)
      }
    },
    rating: {
      get () {
        return this.options.find(opt => opt.value === this.desktop.rating)
      },
      set (v) {
        return this.setRating(v)
      }
    },
    all () {
      return this.platform === platformTypes.all
    },
    android () {
      return this.platform === platformTypes.android
    },
    apple () {
      return this.platform === platformTypes.apple
    }
  },
  methods: {
    setName (name) {
      this.$store.commit(`${this.currentDesktop}/${types.SET_NAME}`, name)
    },
    setPlatform (platform) {
      this.$store.commit(`${this.currentDesktop}/${types.SET_PLATFORM}`, platform)
    },
    setRating (rating) {
      this.$store.commit(`${this.currentDesktop}/${types.SET_RATING}`, rating)
    },
    changeRating (obj) {
      this.setRating(obj.value)
    }
  },
  components: {
    tabBlock,
    appLayout,
    appBtn,
    appSelect
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.tab-body {
  background-color: $light;
  padding: 14px 18px 16px;
  border-radius: 0 16px 16px 16px;

  .tab-block {
    &:not(:last-child) {
      margin-right: 16px;
    }

    &__items {
      .app-button {
        position: relative;

        &:not(:last-child) {
          margin-right: 10px;

          &::after {
            content: '';
            position: absolute;
            width: 1px;
            height: 18px;
            background-color: $darkGray;
            right: -10px;
            top: 0;
            margin: 8px 0;
          }
        }

        &:not(:first-child) {
          margin-left: 10px;
        }
      }
    }
  }
}

.app-select {
  margin: 0;
  font: 500 15px/18px Museo Sans Cyrl;
  letter-spacing: 0.13px;
  background-color: $gray;
  color: $grayText;
  width: 202px;
  height: 34px;
  border-radius: 10px;

  .dropdown-toggle {
    margin: 0;
    background: none;
    padding: 8px 18px;
    font: inherit;

    &::after {
      content: '';
      background: url('../assets/svg/arrow-down-1.svg') no-repeat;
      background-size: contain;
      top: 14px;
      width: 6px;
      height: 10px;
      position: absolute;
      right: 13px;
    }
  }

  .dropdown-menu {
    top: 0;
    width: 202px;
    box-shadow: 0px 3px 15px #00000029;
    border-radius: 10px;
    background-color: $gray;
    border: none;
    margin: 0;

    & > li {
      &:first-child {
        margin-bottom: 6px;

        &::after {
          content: '';
          background: url('../assets/svg/arrow-down-1.svg') no-repeat;
          background-size: contain;
          top: 10px;
          width: 6px;
          height: 10px;
          position: absolute;
          right: 13px;
          transform: rotate(180deg);
        }
      }

      &:not(:first-child) {
        & > a {
          position: relative;

          &::after {
            content: '';
            width: 15px;
            height: 15px;
            background: url('../assets/svg/star.svg') no-repeat;
            background-size: contain;
            top: 8px;
            position: absolute;
            left: 69px;
          }
        }
      }

      & > a {
        padding: 6px 19px;
        color: $grayText;

        &:hover {
          background-color: $activeColor;
          color: $light;
        }
      }
    }
  }

  .caret {
    display: none;
  }
}
</style>