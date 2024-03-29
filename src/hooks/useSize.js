import { ref, onMounted } from 'vue'

export default function (id) {
  const width = ref(0)
  const height = ref(0)

  onMounted(() => {
    const dom = document.getElementById(id)
    width.value = dom.clientWidth
    height.value = dom.clientHeight
  })

  return {
    width,
    height,
  }
}
