<template>
  <el-select v-model="clueInfo.involveDomain" placeholder="请选择涉及领域" @change="fetchInvolveAccusation">
    <el-option v-for="item in options.involveDomain" :key="item.dicId" :value="item.dicId" :label="item.name"/>
  </el-select>
</template>

<script>
export default {
  name: 'DictSelect'
}
</script>

<style scoped>

</style>
