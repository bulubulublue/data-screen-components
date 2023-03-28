<template>
  <div class="icon-wrapper"
       :style="{...style}">
    <svg class="icon">
      <use :href="iconName"></use>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    style: Object
  },
  setup (props) {
    const iconName = `#${props.name}`

    return {
      iconName
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-wrapper {
  height: 100%;
  width: 100%;
}
.icon {
  height: 100%;
  width: 100%;
}
</style>
