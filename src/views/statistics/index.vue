<template>
  <div class="full-height">
    <div class="app-container">
      <el-card class="filter-container">
        <el-form :inline="true" style="text-align:right" size="mini">
          <el-form-item>
            <el-select v-model="mainTable.filter.type" placeholder="类型">
              <el-option v-for="(value, key) in map.type" :key="key" :value="key" :label="value">
                {{ value }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="mainTable.filter.time"
              align="right"
              :editable="false"
              clearable
              unlink-panels
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期(创建时间)"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="mainTable.pager.index = 1;getMainTableData()">
              <i class="el-icon-search" />
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <el-table
          ref="mainTable"
          v-loading="mainTable.loading"
          :data="mainTable.array"
          element-loading-text="加载中，请稍候"
          element-loading-spinner="el-icon-loading"
          border
          stripe
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              {{ scope.row.time ? new Date(scope.row.time).toLocaleString() : '' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="单数" prop="num" />
          <el-table-column align="center" label="类型">
            <template slot-scope="scope">
              {{ map.type[scope.row.type] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作金额">
            <template slot-scope="scope">
              {{ (scope.row.operMoney||0) / 100 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="实际金额">
            <template slot-scope="scope">
              {{ (scope.row.deduMoney||0) / 100 }}
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
  </div>
</template>

<script>
import { getOrderStatic } from '@/api/static'
import { bulidStr } from '@/utils/index'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      rulse: {
        safetyPwd: [{ required: true, trigger: 'blur', message: '必填项目' }]
      },
      map: {
        type: {
          1: '代收',
          2: '代付',
          3: '提现',
          4: '充值'
        }
      },
      mainTable: {
        loading: false,
        row: {},
        filter: {
          type: '',
          time: []
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
    getMainTableData() {
      this.mainTable.loading = true
      const _filter = Object.assign({}, this.mainTable.filter)
      if (Array.isArray(this.mainTable.filter.time) && this.mainTable.filter.time.length === 2) {
        _filter.openTime = this.mainTable.filter.time[0]
        _filter.endTime = this.mainTable.filter.time[1]
      }

      delete _filter.time
      const _form = {
        filter: ((filter) => {
          return bulidStr(filter)
        })(_filter),
        page: this.mainTable.pager.index,
        limit: this.mainTable.pager.size,
        commercialNumber: localStorage.getItem('number')
      }
      getOrderStatic(_form).then(response => {
        this.mainTable.pager.total = response.total || 0
        this.mainTable.array = response.commercialList || []
      }).finally(_ => {
        this.mainTable.loading = false
      })
    },
    handlePagerChange(val) {
      this.mainTable.pager.index = val.index
      this.mainTable.pager.size = val.size
      this.getMainTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container{
  .el-form-item{
      margin-bottom: 0;
  }
}

</style>
