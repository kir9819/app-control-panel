<template functional>
  <div class="flex" :class="{ ...data.class, [data.staticClass]: true }" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
</script>

<style lang="scss">
.flex {
  flex: 1 1 auto;
  max-width: 100%;

  &.shrink {
    flex-grow: 0;
    flex-shrink: 1;
  }
}
</style>