<template>
  <div id="container"
       ref="containerRef">
    <slot></slot>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { debounce } from '../../utils/index'
export default {
  name: 'Container',
  props: {
    options: Object // {height:xxx,width:xxx}
  }, setup (props) {
    const containerRef = ref()
    const width = ref(0) // 大屏的实际尺寸
    const height = ref(0)
    const viewportWidth = ref(0) //画布尺寸
    const viewportHeight = ref(0)

    // 如果在渲染scale方法的同时，又有dom更新，可能会报错，所以采用nextTick
    // 使用promise，保证先获取init，再更新尺寸
    const init = () => {
      return new Promise((resolve) => {
        nextTick(() => {
          if (props.options && props.options.width && props.options.height) {
            width.value = props.options.width
            height.value = props.options.height
          } else {
            if (containerRef.value) {
              width.value = containerRef.value.clientWidth
              height.value = containerRef.value.clientHeight
            }
          }

          // 参数为0，则获取视口尺寸
          if (!viewportWidth.value || !viewportHeight.value) {
            viewportWidth.value = window.screen.width
            viewportHeight.value = window.screen.height
          }
          resolve()
        })
      })
    }

    const updateSize = () => {
      if (width.value && height.value) {
        containerRef.value.style.width = `${width.value}px`
        containerRef.value.style.height = `${height.value}px`
      } else {
        if (containerRef.value) {
          containerRef.value.style.width = `${viewportWidth.value}px`
          containerRef.value.style.height = `${viewportHeight.value}px`
        }// 是否可以删除？

      }
    }

    const scaleScreen = () => {
      const currentWidth = document.body.clientWidth // 当前实际视口尺寸
      const currentHeight = document.body.clientHeight
      //获取大屏最终的宽高，width可能会没有值，则用viewportWidth
      const realWidth = width.value || viewportWidth.value
      const realHeight = height.value || viewportHeight.value

      //计算宽高压缩比
      const widthScale = currentWidth / realWidth
      const heightScale = currentHeight / realHeight
      containerRef.value && (containerRef.value.style.transform = `scale(${widthScale},${heightScale})`)
    }

    const resizeCallback = async () => {
      await init()
      scaleScreen()
    }

    onMounted(async () => {
      await init()
      updateSize()
      scaleScreen()

      window.addEventListener('resize', debounce(100, resizeCallback))
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeCallback)
    })

    return {
      containerRef
    }
  }
}
</script>
<style lang="scss" scoped>
// 如传入3000*5000的尺寸，初始的时候还是会先渲染3000*5000，再进行压缩，因而内容会偏移
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: left top; // 设置scale的中心点，从而使内容可以出现在视口中
}
</style>
