<template>
  <div class="loading">
    <svg :width="width"
         :height="height"
         viewBox="0 0 50 50">
      <circle cx="25"
              cy="25"
              r="22"
              fill="none"
              stroke-width="3"
              :stroke="outsideColor"
              stroke-dasharray="34"
              stroke-linecap="round">
        <animateTransform attributeName="transform"
                          attributeType="XML"
                          begin="0"
                          dur="2s"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          repeatCount="indefinite">
        </animateTransform>
        <animate attributeName="stroke"
                 attributeType="XML"
                 :values="outsideColorAnimate"
                 repeatCount="indefinite"
                 dur="2s">
        </animate>
      </circle>
      <circle cx="25"
              cy="25"
              r="12"
              fill="none"
              stroke-width="3"
              :stroke="insideColor"
              stroke-dasharray="19"
              stroke-linecap="round">
        <animateTransform attributeName="transform"
                          attributeType="XML"
                          begin="0"
                          dur="2s"
                          type="rotate"
                          values="360 25 25;0 25 25"
                          repeatCount="indefinite">
        </animateTransform>
        <animate attributeName="stroke"
                 attributeType="XML"
                 :values="insideColorAnimate"
                 repeatCount="indefinite"
                 dur="2s">
        </animate>
      </circle>
    </svg>
    <div class="loading-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'

export default {
  name: 'Loading',
  props: {
    width: {
      type: [Number, String],
      default: 50
    },
    height: {
      type: [Number, String],
      default: 50
    },
    outsideColor: {
      type: String,
      default: '#3be6cb'
    },
    insideColor: {
      type: String,
      default: '#02bcfe'
    }
  },
  setup (props) {
    const outsideColorAnimate = computed(() => `${props.outsideColor};${props.insideColor};${props.outsideColor}`)
    const insideColorAnimate = computed(() => `${props.insideColor};${props.outsideColor};${props.insideColor}`)

    return {
      outsideColorAnimate,
      insideColorAnimate
    }
  }
}
</script>
