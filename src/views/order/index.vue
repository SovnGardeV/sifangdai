<template>
  <div class="app-container">
    <el-card class="filter-container">
      <el-form :inline="true" style="text-align:right">
        <el-form-item>
          <el-input v-model="mainTable.filter.remark" placeholder="订单标识" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="mainTable.filter.commercialNumber" placeholder="商户号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="mainTable.filter.outId" placeholder="外部订单号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="mainTable.filter.orderId" placeholder="内部订单号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="mainTable.pager.index = 1;getMainTableData()">
            <i class="el-icon-search" />
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <!-- <el-button type="primary" size="mini" @click="confirmOrder">确认订单</el-button>
      <el-button size="mini">取消订单</el-button> -->
      <el-table
        ref="mainTable"
        v-loading="mainTable.loading"
        class=""
        :data="mainTable.array"
        element-loading-text="加载中，请稍候"
        element-loading-spinner="el-icon-loading"
        border
        stripe
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" /> -->
        <el-table-column align="center" label="内部订单号" prop="orderId" />
        <el-table-column align="center" label="外部订单号" prop="outId" />
        <el-table-column align="center" label="商户号" prop="commercialNumber" />
        <el-table-column align="center" label="订单名称" prop="makerName" />
        <el-table-column align="center" label="订单标识" prop="remark" />
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.createTime).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="confirmOrder(scope.row.orderId, 1)">确认</el-button>
            <el-button size="mini" type="primary" plain @click="callBackByHand(scope.row.orderId)">手动回调</el-button>
          </template>
        </el-table-column>

      </el-table>

      <pagination
        :pager-size="mainTable.pager.size"
        :pager-index="mainTable.pager.index"
        :pager-total="mainTable.pager.total"
        @pagination-change="handlePagerChange"
      />
    </el-card>
  </div>
</template>

<script>
import { bulidStr } from '@/utils/index'
import { getOrderList, affirmOrder, callBackByHand } from '@/api/order'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      mainTable: {
        loading: false,
        filter: {
          commercialName: '',
          commercialIphone: '',
          commercialNumber: ''
        },
        array: [],
        pager: {
          index: 1,
          total: 0,
          size: 10
        }
      }
    }
  },
  created() {
    this.getMainTableData()
  },
  methods: {
    handleSelectionChange() {
    },
    getMainTableData() {
      this.mainTable.loading = true
      const _form = {
        commercialNumber: localStorage.getItem('number'),
        filter: ((filter) => {
          return bulidStr(filter)
        })(this.mainTable.filter),
        page: this.mainTable.pager.index,
        limit: this.mainTable.pager.size
      }
      getOrderList(_form).then(response => {
        this.mainTable.pager.total = response.total || 0
        this.mainTable.array = response.rows || []
      }).finally(_ => {
        this.mainTable.loading = false
      })
    },
    handlePagerChange(val) {
      this.mainTable.pager = val
      this.getMainTableData()
    },
    confirmOrder(orderId, confirm) {
      const _form = {
        orderId,
        affirmType: confirm,
        commercialNumber: localStorage.getItem('number')
      }

      affirmOrder(_form).then(response => {
        if (response.errorCode !== '10000') {
          return
        }

        this.$message.success(response.mes)
        this.getMainTableData()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    callBackByHand(orderId) {
      callBackByHand({
        orderId,
        commercialNumber: localStorage.getItem('number')
      }).then(response => {
        if (response.errorCode !== '10000') {
          return
        }

        this.$message.success(response.mes)
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item{
    margin-bottom: 0;
}
</style>
