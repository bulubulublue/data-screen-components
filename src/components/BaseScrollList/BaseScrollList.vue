<template>
  <div class="base-scroll-list" :id="id">
    <!-- 列标题 -->
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: headerBackground,
        height: `${headerHeight}px`,
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(item, i) in headerData"
        :key="item + i"
        :style="{ width: `${columnWidths[i]}px`, ...headerStyle[i] }"
        v-html="item"
      ></div>
    </div>
    <div class="rows-wrapper" :style="{ height: `${rowsContainerHeight}px` }">
      <!-- {{ currentRowData }} -->
      <div
        class="base-scroll-list-rows"
        v-for="(row, index) in currentRowData"
        :key="row.rowIndex"
        :style="{
          height: `${rowHeights[index]}px`,
          lineHeight: `${rowHeights[index]}px`,
          backgroundColor: `${row.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0]}`,
        }"
      >
        <!-- 在这里添加base-scroll-list-text就能解决滚动时有残留的问题 -->
        <div
          class="row-item base-scroll-list-text"
          :style="{ width: `${columnWidths[i]}px`, ...rowStyle[i] }"
          v-for="(item, i) in row.data"
          :key="item + i"
          v-html="item"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
import useSize from '../../hooks/useSize.js'
import cloneDeep from 'lodash/cloneDeep'
import { ref, onMounted } from 'vue'

export default {
  name: 'BaseScrollList',
  props: {
    header: Array,
    headerStyle: {
      type: Array,
      default: [],
    }, //控制header每一列的样式
    rowStyle: {
      type: Array,
      default: [],
    }, // 控制内容每一列样式
    headerBackground: {
      type: String,
      default: 'rgb(90,90,90)',
    },
    headerHeight: {
      type: [String, Number],
      default: 35,
    },
    headerIndex: {
      // 第一行是否展示序号
      type: Boolean,
      default: false,
    },
    headerIndexContent: {
      type: String,
      default: '#',
    },
    data: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 5,
    },
    rowBg: {
      type: Array,
      default: ['rgba(40,40,40)', 'rgba(55,55,55)'],
    },
  },
  setup(props) {
    const headerData = ref([])
    const columnWidths = ref([])
    const rowHeights = ref([])
    const uuid = uuidv4()
    const id = `base-scroll-list-${uuid}`
    const { height, width } = useSize(id) //获取容器宽高
    const rowData = ref([])
    const currentRowData = ref([])
    const currentIndex = ref(0)
    const duration = ref(2000) //动画间隔时间
    const rowsContainerHeight = ref(0)
    const rowAvgHeight = ref(0)

    const handleHeader = () => {
      const headerClone = cloneDeep(props.header)
      if (headerClone.length === 0) {
        return
      }
      if (props.headerIndex) {
        headerClone.unshift(props.headerIndexContent)
      }

      let usedWidth = 0 //计算已指定的宽度
      let usedColumnNo = 0
      props.headerStyle.forEach((style) => {
        if (style.width) {
          usedWidth += Number(style.width.replace('px', ''))
          usedColumnNo += 1
        }
      })
      //动态计算header中每一列的宽度
      const avgWidth =
        (width.value - usedWidth) / (headerClone.length - usedColumnNo)
      // 创建长度为headerClone的数组，每项值都为avgWidth
      columnWidths.value = new Array(headerClone.length).fill(avgWidth)

      // 如果有传入值，则使用传入值
      props.headerStyle.forEach((style, index) => {
        if (style.width) {
          columnWidths.value[index] = style.width.replace('px', '')
        }
      })

      headerData.value = headerClone
    }

    // 如果要显示序列，则在每行数据前添加序号
    const handleRowData = () => {
      let rowsClone = cloneDeep(props.data)
      if (rowsClone.length === 0) {
        return
      }

      // if (
      //   rowsClone.length >= props.pageSize &&
      //   rowsClone.length <= props.pageSize * 2
      // ) {
      //   rowsClone = [...rowsClone, ...rowsClone]
      // }

      if (props.headerIndex) {
        rowsClone = rowsClone.map((row, index) => ({
          data: [index + 1, ...row],
          rowIndex: index, // 因为数组顺序有改变，所以不能用array的index作为key
        }))
      } else {
        rowsClone = rowsClone.map((row, index) => ({
          data: row,
          rowIndex: index, // 因为数组顺序有改变，所以不能用array的index作为key
        }))
      }

      rowData.value = rowsClone
    }

    // 计算每行高度: （表格高度-header高度）/总条数
    const handleRowHeight = () => {
      const headerHeight = props.headerHeight
      const unusedHeight = height.value - headerHeight
      rowsContainerHeight.value = unusedHeight
      //每页显示行数，如果pageSIze>总条数，则以总条数为rowNum
      const rowNum =
        props.pageSize > rowData.value.length
          ? rowData.value.length
          : props.pageSize
      const avgHeight = unusedHeight / rowNum
      rowAvgHeight.value = avgHeight
      rowHeights.value = new Array(rowNum).fill(avgHeight)
    }

    // 滚动动画
    const startAnimation = async () => {
      const dataRaw = cloneDeep(rowData.value)

      const index = currentIndex.value
      const rowNum = props.pageSize
      const totalLength = dataRaw.length
      if (totalLength < rowNum) return // 如果页面条数>总条数，则不做动画
      // 进行表格数据头尾连接：[a,b,c,d,e,f] index=1,即指向b, 则数据处理为[b,c,d,e,f,a]
      const dataNew = [...dataRaw.slice(index), ...dataRaw.slice(0, index)]
      console.log(dataNew)
      currentRowData.value = dataNew

      //调整高度，现将所有行的高度还原
      rowHeights.value = new Array(dataRaw.length).fill(rowAvgHeight.value)

      await new Promise((resolve) => setTimeout(resolve, 300))

      //将当前滚动行的高度调整为0
      rowHeights.value.splice(0, 1, 0)

      if (currentIndex.value >= dataRaw.length - 1) {
        currentIndex.value = 0
      } else {
        currentIndex.value += 1
      }

      // 用同步的方法实现休眠操作
      await new Promise((resolve) => setTimeout(resolve, duration.value - 300))

      startAnimation()
    }

    onMounted(() => {
      handleHeader()
      handleRowData()
      handleRowHeight()
      startAnimation()
    })

    return {
      id,
      headerData,
      columnWidths,
      rowData,
      rowHeights,
      currentRowData,
      rowsContainerHeight,
    }
  },
}
</script>
<style lang="scss" scoped>
.base-scroll-list {
  &-header {
    display: flex;
    font-size: 24px;

    .header-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-text {
    padding: 0 10px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-rows {
    display: flex;
    align-items: center;
    transition: all 0.3s linear;
    .row-item {
      font-size: 28px;
    }
  }

  .rows-wrapper {
    overflow: hidden;
  }
}
</style>
