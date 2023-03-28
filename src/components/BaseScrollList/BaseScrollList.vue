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
    <div
      class="base-scroll-list-rows"
      v-for="(row, i) in rowData"
      :key="i"
      :style="{
        height: `${rowHeights[i]}px`,
        backgroundColor: `${i % 2 === 0 ? rowBg[1] : rowBg[0]}`,
      }"
    >
      <div
        class="row-item"
        :style="{ width: `${columnWidths[i]}px`, ...rowStyle[i] }"
        v-for="(item, i) in row"
        :key="item + i"
        v-html="item"
      ></div>
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
    headerStyle: Array, //控制header每一列的样式
    rowStyle: Array, // 控制内容每一列样式
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
      if (props.headerIndex) {
        rowsClone = rowsClone.map((row, index) => [index + 1, ...row])
      }

      rowData.value = rowsClone
    }

    // 计算每行高度: （表格高度-header高度）/总条数
    const handleRowHeight = () => {
      const headerHeight = props.headerHeight
      const unusedHeight = height.value - headerHeight
      //每页显示行数，如果pageSIze>总条数，则以总条数为rowNum
      const rowNum =
        props.pageSize > rowData.value.length
          ? rowData.value.length
          : props.pageSize
      const avgHeight = unusedHeight / rowNum
      rowHeights.value = new Array(rowData.value.length).fill(avgHeight)
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
    }
  },
}
</script>
<style lang="scss" scoped>
.base-scroll-list {
  width: 100%;
  height: 100%;

  &-header {
    display: flex;
    font-size: 15px;
  }

  &-text {
    padding: 0 10px;
    box-sizing: border-box;
  }

  &-rows {
    display: flex;
    align-items: center;
    .row-item {
      font-size: 28px;
    }
  }
}
</style>
