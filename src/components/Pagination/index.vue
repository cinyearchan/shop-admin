<template>
  <el-pagination
    :current-page="page"
    :page-size="limit"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="listCount"
    :page-sizes="[10, 20, 50]"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  listCount: {
    type: Number,
    default: 0
  },
  loadList: {
    type: Function,
    default: () => {}
  }
})

interface EmitsType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', limit: number): void
}

const emit = defineEmits<EmitsType>()

const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}

const handleSizeChange = (size: number) => {
  emit('update:limit', size)
  emit('update:page', 1)
  props.loadList()
}
</script>

<style lang="scss" scoped>
</style>
