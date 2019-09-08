<template>
  <component :is="imgComponent" :width="width" :color="color"></component>
</template>

<script>
import androidIcon from './svg/android'
import appleIcon from './svg/apple'
import markIcon from './svg/mark'
import starIcon from './svg/star'

export default {
  props: {
    img: {
      type: String
    },
    width: {
      type: Number,
      required: false
    },
    color: {
      type: String,
      required: false
    }
  },
  computed: {
    imgComponent () {
      if ( ['android', 'apple', 'mark', 'star'].indexOf(this.img) !== -1 ) {
        return this.img + 'Icon'
      }

      return 'appleIcon'
    }
  },
  components: {
    androidIcon,
    appleIcon,
    markIcon,
    starIcon
  }
}
</script>