<template>
  <div class="app-container">
    <el-card class="full-height">
      <el-tree
        :data="data"
        :props="{
          label:'menuName'
        }"
        :expand-on-click-node="false"
        accordion
      />
    </el-card>
  </div>
</template>

<script>
import { getMenu } from '@/api/menu'

export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    this.getMainTableData()
  },
  methods: {
    getMainTableData() {
      getMenu().then(response => {
        this.data = response.rows || []
      })
    }
  }

}
</script>

<style lang="scss">

</style>
