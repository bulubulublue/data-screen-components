<template>
  <svg width="0"
       height="">
    <defs>
      <symbol id="more"
              viewBox="0 0 100 100">
        <circle r="5"
                cx="20"
                cy="25"
                fill="currentColor"></circle>
        <circle r="5"
                cx="20"
                cy="50"
                fill="currentColor"></circle>
        <circle r="5"
                cx="20"
                cy="75"
                fill="currentColor"></circle>
        <line x1="40"
              y1="25"
              x2="90"
              y2="25"
              stroke-width="8"
              stroke="currentColor" />
        <line x1="40"
              y1="50"
              x2="90"
              y2="50"
              stroke-width="8"
              stroke="currentColor" />
        <line x1="40"
              y1="75"
              x2="90"
              y2="75"
              stroke-width="8"
              stroke="currentColor" />
      </symbol>
      <symbol id="arrowRight"
              viewBox="0 0 100 100">
        <polyline points="20 10,80 50,20,90 "
                  fill="currentColor"></polyline>
      </symbol>
    </defs>
  </svg>

</template>

<script>
export default {
  name: 'TestComponent',
  setup () {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
