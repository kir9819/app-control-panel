<template functional>
  <div class="layout" :class="{ ...data.class, [data.staticClass]: true }" v-on="listeners">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  min-width: 0;

  &.wrap {
    flex-wrap: wrap;
  }

  &.justify-space-between {
    justify-content: space-between;
  }

  &.align-center {
    align-items: center;
  }
}
</style>