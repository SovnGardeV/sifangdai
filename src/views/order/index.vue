<template>
  <div class="app-container">
    <el-card class="filter-container">
      <el-form :inline="true" style="text-align:right">
        <el-form-item>
          <el-input v-model="mainTable.filter.remark" placeholder="订单标识" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item v-if="$store.state.user.mode === 'admin'">
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
      <el-col style="text-align:right;margin-bottom:10px;position:relative;z-index:2">
        <el-button size="mini" type="primary" @click="distributeQR">发起代收</el-button>
      </el-col>
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
      >
        <!-- <el-table-column type="selection" /> -->
        <el-table-column align="center" label="内部订单号" prop="orderId" />
        <el-table-column align="center" label="外部订单号" prop="outId" />
        <el-table-column align="center" label="商户号" prop="commercialNumber" />
        <el-table-column align="center" label="操作金额">
          <template slot-scope="scope">
            {{ scope.row.operatorMoney / 100 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="浮动金额">
          <template slot-scope="scope">
            {{ scope.row.floatMoney / 100 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="代收/代付实际金额">
          <template slot-scope="scope">
            {{ scope.row.deductedMoney / 100 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单状态">
          <template slot-scope="scope">
            {{ scope.row.orderStatus == 0 ? '已取消' : scope.row.orderStatus == 1 ? '已确认' : '待确认' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="分配的二维码Id" prop="qrId" />
        <el-table-column align="center" label="打款人" prop="makerName" />
        <el-table-column align="center" label="订单标识" prop="remark" />
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            {{ new Date(scope.row.createTime).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="确认时间">
          <template slot-scope="scope">
            {{ scope.row.confirmTime ? new Date(scope.row.confirmTime).toLocaleString() : '' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作人" prop="operatorName" />
        <el-table-column align="center" label="应用名" prop="applicationName" />
        <el-table-column align="center" label="数量" prop="num" />
        <el-table-column align="center" label="应用类型">
          <template slot-scope="scope">
            {{ scope.row.applicationType == 1 ? '代收' : '代付' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="支付类型">
          <template slot-scope="scope">
            {{ scope.row.payType == 1 ? '支付宝' : scope.row.orderStatus == 2 ? '微信' : '银行卡' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手动挂单">
          <template slot-scope="scope">
            {{ scope.row.isHand == 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column v-if="$store.state.user.mode === 'admin'" align="center" label="操作" width="200px">
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

    <el-dialog width="400px" center title="分配二维码" :visible.sync="mainTable.dialogDistributeVisible">
      <div v-if="!showCard.qrUrl">
        <el-form ref="distribuForm" :model="mainTable.distribuForm" :rules="mainTable.formRules" label-width="100px">
          <el-form-item label="应用名称" prop="applicationName">
            <el-input v-model="mainTable.distribuForm.applicationName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="应用类型" prop="applicationType">
            <el-select v-model="mainTable.distribuForm.applicationType" style="width:100%">
              <el-option :value="1" label="代收">代收</el-option>
              <el-option :value="2" label="代付">代付</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="外部订单号" prop="outId">
            <el-input v-model="mainTable.distribuForm.outId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="打款人姓名" prop="makerName">
            <el-input v-model="mainTable.distribuForm.makerName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input v-model="mainTable.distribuForm.num" min="0" type="number" autocomplete="off" />
          </el-form-item>
          <el-form-item label="操作金额" prop="operatorMoney">
            <el-input v-model="mainTable.distribuForm.operatorMoney" min="0" type="number" autocomplete="off" />
          </el-form-item>
          <el-form-item label="支付类型" prop="payType">
            <el-select v-model="mainTable.distribuForm.payType" style="width:100%">
              <el-option :value="1" label="支付宝">支付宝</el-option>
              <el-option :value="2" label="微信">微信</el-option>
              <el-option :value="3" label="银行卡">银行卡</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单标识" prop="remark">
            <el-input v-model="mainTable.distribuForm.remark" autocomplete="off" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button size="mini" @click="mainTable.dialogDistributeVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleDistributeQR">确 定</el-button>
        </div>
      </div>

      <div v-else style="text-align:center">
        <img :key="showCard.qrUrl" :src="showCard.qrUrl" style="border: 1px dashed #999;padding:4px;border-radius:4px" width="240px" height="240px" alt="">
        <div style="padding:20px;">
          <i class="el-icon-success" style="color:#18D78A" />
          分配成功
        </div>
        <div style="font-size:48px;color:#F79709;font-weight:bold">{{ showCard.floatMoney }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bulidStr } from '@/utils/index'
import { getOrderList, affirmOrder, callBackByHand } from '@/api/order'
import { distributeQR } from '@/api/qrCode'
import Pagination from '@/components/Pagination'
import cryptoJs from 'crypto-js'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      showCard: {
        qrUrl: '',
        floatMoney: ''
      },
      mainTable: {
        dialogDistributeVisible: false,
        loading: false,
        filter: {
          commercialName: '',
          commercialIphone: '',
          commercialNumber: ''
        },
        distribuForm: {
          commercialNumber: localStorage.getItem('number'),
          outId: '',
          operatorMoney: '',
          makerName: '',
          num: '',
          applicationType: '',
          payType: '',
          time: '',
          sign: '',
          remark: '',
          applicationName: ''

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
    distributeQR() {
      this.initForm(this.mainTable.distribuForm, 'distribuForm')

      this.mainTable.dialogDistributeVisible = true
    },
    initForm(form, formName) {
      const keyNameArr = Object.keys(form)
      keyNameArr.forEach(item => {
        if (item !== 'commercialNumber') form[item] = ''
      })

      this.$nextTick(_ => {
        this.$refs[formName].clearValidate()
      })
    },
    handleDistributeQR() {
      this.mainTable.distribuForm.time = new Date().getTime()
      const {
        applicationName,
        applicationType,
        commercialNumber,
        operatorMoney,
        makerName,
        num,
        outId,
        payType,
        remark,
        time
      } = this.mainTable.distribuForm
      const str = 'applicationName=' + applicationName + '&applicationType=' + applicationType +
        '&commercialNumber=' + commercialNumber + '&makerName=' + makerName + '&num=' + num + '&operatorMoney=' + operatorMoney + '&outId=' + outId + '&payType=' + payType + '&remark=' + remark + '&time=' + time

      this.mainTable.distribuForm.sign = cryptoJs.MD5(str).toString()
      distributeQR(this.mainTable.distribuForm).then(response => {
        if (response.errorCode !== '10000') {
          return
        }

        this.showCard.qrUrl = response.qrUrl
        this.showCard.floatMoney = response.floatMoney

        // this.mainTable.dialogDistributeVisible = false
        this.$message.success(response.mes)
        this.getMainTableData()
      })
    },
    getMainTableData() {
      this.mainTable.loading = true
      const _filter = Object.assign({}, this.mainTable.filter)
      _filter.commercialNumber = _filter.commercialNumber || localStorage.getItem('number')
      const _form = {
        commercialNumber: localStorage.getItem('number'),
        filter: ((filter) => {
          return bulidStr(filter)
        })(_filter),
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
.filter-container{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>
