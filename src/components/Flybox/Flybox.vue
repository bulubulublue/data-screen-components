<template>
  <div class="flybox"
       ref="flyboxRef">
    <!-- 这里不需要写viewBox，因为默认会和宽高一致，从而达到自适应的目的 -->
    <svg :height="height"
         :width="width">
      <defs>
        <path :id="pathId"
              :d="path"
              fill="none" />
        <radialGradient id="radial-color"
                        cx="50%"
                        cy="50%"
                        fx="100%"
                        fy="50%"
                        r="50%">
          <stop offset="0%"
                stop-color="white"
                stop-opacity="1"></stop>
          <stop offset="100%"
                stop-color="white"
                stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="maskId">
          <!-- 通过定义蒙层的圆，可以显示被圆覆盖区域的图案 -->
          <circle :r="starLength"
                  cx="0"
                  cy="0"
                  fill="url(#radial-color)">
            <animateMotion id="forward-rect"
                           :path="path"
                           dur="5s"
                           rotate="auto"
                           fill="freeze"
                           repeatCount="indefinite"
                           begin="0"></animateMotion>
          </circle>
        </mask>
      </defs>
      <use :href="`#${pathId}`"
           stroke-width="1"
           stroke="#235fa7" />

      <use :href="`#${pathId}`"
           stroke-width="3"
           stroke="#4fd2dd"
           :mask="`url(#${maskId})`" />
    </svg>
    <div class="flybox-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Flybox',
  props: {
    starLength: {
      type: String,
      default: '50'
    }
  },
  setup () {
    // 如果引用多次该组件，由于id值相同，因而会使用相同的path，因而需要引入uuid，来区分不同的组件
    const uuid = uuidv4()
    const width = ref(0)
    const height = ref(0)
    const flyboxRef = ref()

    const path = computed(() => `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5}  Z`)
    const pathId = computed(() => `fly-box-path-${uuid}`)
    const maskId = computed(() => `fly-box-mask-${uuid}`)

    const init = () => {
      width.value = flyboxRef.value.clientWidth
      height.value = flyboxRef.value.clientHeight
      console.log()
    }
    onMounted(() => {
      init()
    })

    return {
      width,
      height,
      flyboxRef,
      path,
      pathId,
      maskId
    }
  }
}
</script>
<style scoped lang="scss">
.flybox {
  position: relative;
  width: 100%;
  height: 100%;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .flybox-content {
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>
