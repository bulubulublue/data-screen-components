<template>
  <svg t="1679755023336"
       class="icon"
       viewBox="0 0 1082 1024"
       version="1.1"
       xmlns="http://www.w3.org/2000/svg"
       p-id="11768"
       width="200"
       height="200">
    <path class="logo-path"
          d="M532.4065625 12l149.0578125 285.69375s-260.85 154.38-415.231875 417.0046875l12.421875-86.949375L32.07125 377.5453125l344.2509375-39.0384375z"
          p-id="11769"></path>
    <path class="logo-path"
          d="M250.2621875 780.1415625s360.2221875-541.006875 796.81875-406.145625l-56.784375 62.1075s-237.781875-23.068125-363.770625 67.430625c0 0-248.4290625 124.215-376.1925 291.016875z"
          p-id="11770"></path>
    <path class="logo-path"
          d="M878.4321875 540.79875l-76.303125 74.5284375s-260.85 10.6471875-551.866875 225.36c0 0 282.144375-337.3659375 628.17-299.8884375z"
          p-id="11771"></path>
    <path class="logo-path"
          d="M241.390625 876.178125s301.663125-204.0675 573.159375-168.5775L846.4925 972 543.97625 808.7465625l-320.259375 163.040625z"
          p-id="11772"></path>
  </svg>
</template>
<script>
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss">
svg {
  height: 100%;
  width: 100%;

  .logo-path {
    fill: none;
    stroke-width: 50px;
    stroke: red;
    /* forwards: 表示动画结束后维持最终状态 */
    animation: logo 5s linear forwards;
  }
}

@keyframes logo {
  0% {
    // fill: white;
    // stroke: blue;
    stroke-dasharray: 2202;
    stroke-dashoffset: 2202;
  }
  100% {
    // fill: white;
    // stroke: blue;
    stroke-dasharray: 2202;
    stroke-dashoffset: 0;
  }
}
</style>