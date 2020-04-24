<template>
  <div class="app-container">
    <el-card class="filter-container">
      <el-form :inline="true" style="text-align:right">
        <el-form-item v-if="mainTable.filter.applicationType !== '3'">
          <el-input v-model="mainTable.filter.remark" :placeholder="mainTable.filter.applicationType === '2' ? '收款人' : '打款人'" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item v-if="$store.state.user.mode === 'admin'">
          <el-input v-model="mainTable.filter.commercialNumber" placeholder="商户ID" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item v-if="mainTable.filter.applicationType !== '3'">
          <el-input v-model="mainTable.filter.outId" placeholder="外部订单号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="mainTable.filter.bankPhone" placeholder="手机号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="mainTable.filter.orderId" placeholder="内部订单号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="mainTable.filter.orderStatus" placeholder="订单状态" size="mini" clearable>
            <el-option v-for="(value, key) in map.orderStatus" :key="key" :value="key" :label="value">{{ value }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="mainTable.filter.applicationType !== '3'">
          <el-select v-model="mainTable.filter.backStatus" placeholder="回调状态" size="mini" clearable>
            <el-option v-for="(value, key) in map.backStatus" :key="key" :value="key" :label="value">{{ value }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="mainTable.pager.index = 1;getMainTableData()">
            <i class="el-icon-search" />
          </el-button>
          <el-button v-if="$store.state.user.mode === 'admin'" type="primary" size="mini" @click="showDialog">订单修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-tabs v-model="mainTable.filter.applicationType" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="代收" name="1">
        <el-col style="text-align:right;margin-bottom:10px;position:relative;z-index:2">
          <el-button size="mini" type="primary" @click="distributeQR">{{ $store.state.user.mode === 'admin' ? '发起代收' : '手动挂单' }}</el-button>
        </el-col>
        <el-table
          ref="mainTable1"
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
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="内部订单号" prop="orderId" />
          <el-table-column align="center" label="外部订单号" prop="outId" />
          <el-table-column align="center" label="商户ID" prop="commercialNumber" />
          <el-table-column align="center" label="APP名称" prop="appName" />
          <el-table-column align="center" label="手机号" prop="bankPhone" />
          <el-table-column align="center" label="操作金额">
            <template slot-scope="scope">
              {{ (scope.row.operatorMoney||0) / 100 }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="浮动金额">
            <template slot-scope="scope">
              {{ scope.row.floatMoney / 100 }}
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="代收/代付实际金额">
            <template slot-scope="scope">
              {{ (scope.row.deductedMoney||0) / 100 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单状态">
            <template slot-scope="scope">
              {{ map.orderStatus[scope.row.orderStatus] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="回调状态">
            <template slot-scope="scope">
              {{ map.backStatus[scope.row.backStatus] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="打款人" prop="remark" />
          <el-table-column align="center" label="服务费" prop="outRatio">
            <template slot-scope="scope">
              {{ (scope.row.outRatio || 0) / 100 }}
            </template>
          </el-table-column>
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
          <!-- <el-table-column align="center" label="操作人" prop="operatorName" /> -->
          <!-- <el-table-column align="center" label="类型" prop="applicationName">
            <template slot-scope="scope">
              {{ scope.row.applicationName ? '应用操作' : '手动操作' }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column align="center" label="交易类型">
            <template slot-scope="scope">
              {{ map.applicationType[scope.row.applicationType] }}
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="支付方式">
            <template slot-scope="scope">
              {{ map.payType[scope.row.payType ] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="手动挂单">
            <template slot-scope="scope">
              {{ scope.row.isHand == 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="260">
            <template slot-scope="scope">
              <el-button v-if="$store.state.user.mode === 'admin'" size="mini" type="primary" @click="confirmOrder(scope.row.orderId, 1)">确认</el-button>
              <el-button size="mini" plain type="primary" @click="showCheck(scope.row)">查看</el-button>
              <el-button v-if="$store.state.user.mode === 'admin'" size="mini" type="primary" plain @click="callBackByHand(scope.row.orderId)">手动回调</el-button>
            </template>
          </el-table-column>

        </el-table>

        <pagination
          :pager-size="mainTable.pager.size"
          :pager-index="mainTable.pager.index"
          :pager-total="mainTable.pager.total"
          @pagination-change="handlePagerChange"
        />
      </el-tab-pane>
      <el-tab-pane label="代付" name="2">
        <el-col style="text-align:right;margin-bottom:10px;position:relative;z-index:2">
          <el-button size="mini" type="primary" @click="distributeQR">{{ $store.state.user.mode === 'admin' ? '发起代付' : '手动挂单' }}</el-button>
        </el-col>
        <el-table
          ref="mainTable2"
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
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="内部订单号" prop="orderId" />
          <el-table-column align="center" label="外部订单号" prop="outId" />
          <el-table-column align="center" label="商户ID" prop="commercialNumber" />
          <el-table-column align="center" label="APP名称" prop="appName" />
          <el-table-column align="center" label="手机号" prop="bankPhone" />
          <el-table-column align="center" label="操作金额">
            <template slot-scope="scope">
              {{ (scope.row.operatorMoney||0) / 100 }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="浮动金额">
            <template slot-scope="scope">
              {{ scope.row.floatMoney / 100 }}
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="代收/代付实际金额">
            <template slot-scope="scope">
              {{ (scope.row.deductedMoney||0) / 100 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单状态">
            <template slot-scope="scope">
              {{ map.orderStatus[scope.row.orderStatus] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="回调状态">
            <template slot-scope="scope">
              {{ map.backStatus[scope.row.backStatus] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="收款人" prop="remark" />
          <el-table-column align="center" label="服务费" prop="outRatio">
            <template slot-scope="scope">
              {{ (scope.row.outRatio || 0) / 100 }}
            </template>
          </el-table-column>
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
          <!-- <el-table-column align="center" label="操作人" prop="operatorName" /> -->
          <!-- <el-table-column align="center" label="类型" prop="applicationName">
            <template slot-scope="scope">
              {{ scope.row.applicationName ? '应用操作' : '手动操作' }}
            </template>
          </el-table-column> -->
          <!-- <el-table-column align="center" label="交易类型">
            <template slot-scope="scope">
              {{ map.applicationType[scope.row.applicationType] }}
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="支付方式">
            <template slot-scope="scope">
              {{ map.payType[scope.row.payType ] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="手动挂单">
            <template slot-scope="scope">
              {{ scope.row.isHand == 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="260">
            <template slot-scope="scope">

              <el-button v-if="$store.state.user.mode === 'admin'" size="mini" type="primary" @click="confirmOrder(scope.row.orderId, 1)">确认</el-button>
              <el-button size="mini" plain type="primary" @click="showCheck(scope.row)">查看</el-button>
              <el-button v-if="$store.state.user.mode === 'admin'" size="mini" type="primary" plain @click="callBackByHand(scope.row.orderId)">手动回调</el-button>
            </template>
          </el-table-column>

        </el-table>

        <pagination
          :pager-size="mainTable.pager.size"
          :pager-index="mainTable.pager.index"
          :pager-total="mainTable.pager.total"
          @pagination-change="handlePagerChange"
        />
      </el-tab-pane>
      <el-tab-pane label="提现" name="3">
        <!-- <el-col style="text-align:right;margin-bottom:10px;position:relative;z-index:2">
          <el-button size="mini" type="primary" @click="distributeQR">发起代收</el-button>
        </el-col> -->
        <el-table
          ref="mainTable3"
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
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="内部订单号" prop="orderId" />
          <el-table-column align="center" label="商户ID" prop="commercialNumber" />
          <el-table-column align="center" label="APP名称" prop="appName" />
          <el-table-column align="center" label="手机号" prop="bankPhone" />
          <el-table-column align="center" label="操作金额">
            <template slot-scope="scope">
              {{ (scope.row.operatorMoney||0) / 100 }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="浮动金额">
            <template slot-scope="scope">
              {{ scope.row.floatMoney / 100 }}
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="代收/代付实际金额">
            <template slot-scope="scope">
              {{ (scope.row.deductedMoney||0) / 100 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单状态">
            <template slot-scope="scope">
              {{ map.orderStatus[scope.row.orderStatus] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="服务费" prop="outRatio">
            <template slot-scope="scope">
              {{ (scope.row.outRatio || 0) / 100 }}
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="打款人" prop="makerName" /> -->
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
          <!-- <el-table-column align="center" label="操作人" prop="operatorName" /> -->
          <!-- <el-table-column align="center" label="类型" prop="applicationName">
            <template slot-scope="scope">
              {{ scope.row.applicationName ? '应用操作' : '手动操作' }}
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="支付方式">
            <template slot-scope="scope">
              {{ map.payType[scope.row.payType ] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="手动挂单">
            <template slot-scope="scope">
              {{ scope.row.isHand == 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="理由" prop="remark4" />
          <el-table-column v-if="$store.state.user.mode === 'admin'" align="center" label="操作">
            <template slot-scope="scope">
              <!-- <el-button size="mini" type="primary" @click="confirmOrder(scope.row.orderId, 1)">确认</el-button> -->
              <el-button size="mini" type="primary" plain @click="cashMethod(scope.row)">订单详情</el-button>
            </template>
          </el-table-column>

        </el-table>

        <pagination
          :pager-size="mainTable.pager.size"
          :pager-index="mainTable.pager.index"
          :pager-total="mainTable.pager.total"
          @pagination-change="handlePagerChange"
        />
      </el-tab-pane>
    </el-tabs>

    <el-dialog width="400px" center title="订单详情" :visible.sync="mainTable.dialogMethodVisible">
      <div v-if="mainTable.qrInfo.qrId" style="text-align:center">
        <img :src="mainTable.qrInfo.qrUrl" width="200px" height="200px" alt="">
        <div style="line-height:30px;margin: 10px 0">
          账号：{{ mainTable.qrInfo.bankAccount }}
        </div>
        <el-row style="line-height:30px">
          <el-col :span="12">
            <div style="border-right:1px solid #eee">{{ mainTable.qrInfo.receiptName }}</div>
          </el-col>
          <el-col :span="12">
            <div>{{ map.receiptType[mainTable.qrInfo.receiptType] }}</div>
          </el-col>
        </el-row>
      </div>
      <div v-else class="empty-info">
        暂无信息
      </div>
      <div style="border-top: 1px solid #eee;padding-top:20px;margin-top:20px;">
        <el-row v-show="!isReject">
          <el-col :span="12" style="text-align:center">
            <el-button size="mini" type="primary" @click="confirmOrder(cache.orderId, 1)">确认订单</el-button>
          </el-col>
          <el-col :span="12" style="text-align:center">
            <el-button size="mini" type="danger" @click="isReject = true">驳回订单</el-button>
          </el-col>
        </el-row>
        <div v-show="isReject">
          <el-input v-model="mainTable.reason" type="textarea" rows="4" placeholder="请输入驳回理由" />
          <div style="text-align:center;margin-top: 10px">
            <el-button size="mini" @click="confirmOrder(cache.orderId, 3)">确认</el-button>
            <el-button size="mini" @click="isReject = false">返回</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog width="400px" title="修改订单" :visible.sync="mainTable.dialogOrderVisible">
      <el-form size="mini" label-width="100px">
        <el-form-item label="回调状态">
          <el-select v-model="mainTable.orderForm.backStatus">
            <el-option v-for="(value, key) in map.backStatus" :key="key" :value="key" :label="value">
              {{ value }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="mainTable.orderForm.orderStatus">
            <el-option v-for="(value, key) in map.orderStatus" :key="key" :value="key" :label="value">
              {{ value }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回调地址">
          <el-input v-model="mainTable.orderForm.callBackUrl" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="mainTable.orderForm.remark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button size="mini" @click="mainTable.dialogOrderVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleOrderSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :width="(mainTable.distribuForm.payType === 2 && mainTable.filter.applicationType === '2') ? '750px' : '400px'" center :title="mainTable.filter.applicationType === '1' ? '发起代收' : '发起代付'" :visible.sync="mainTable.dialogDistributeVisible">
      <div v-if="!showCard.qrUrl">
        <el-form ref="distribuForm" :model="mainTable.distribuForm" :rules="mainTable.formRules" label-width="100px" size="small">
          <el-row :gutter="10">
            <el-col :span="(mainTable.distribuForm.payType === 2 && mainTable.filter.applicationType === '2') ? 12 : 24">
              <el-form-item label="应用名称" prop="applicationName">
                <el-select v-model="mainTable.distribuForm.applicationName" style="width:100%">
                  <el-option v-for="item in mainTable.appArray" :key="item.appId" :value="item.appId" :label="item.appName">{{ item.appName }}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外部订单号" prop="outId">
                <el-input v-model="mainTable.distribuForm.outId" autocomplete="off" />
              </el-form-item>
              <!-- <el-form-item label="打款人姓名" prop="makerName">
            <el-input v-model="mainTable.distribuForm.makerName" autocomplete="off" />
          </el-form-item> -->
              <el-form-item label="操作金额" prop="operatorMoney">
                <el-input v-model="mainTable.distribuForm.operatorMoney" min="0" type="number" autocomplete="off" />
              </el-form-item>
              <el-form-item label="支付类型" prop="payType">
                <el-select v-model="mainTable.distribuForm.payType" style="width:100%">
                  <el-option :value="1" label="支付宝">支付宝</el-option>
                  <el-option :value="2" label="银行卡">银行卡</el-option>
                  <el-option :value="3" label="微信">微信</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单标识">
                <el-input v-model="mainTable.distribuForm.remark" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col v-if="mainTable.distribuForm.payType === 2 && mainTable.filter.applicationType === '2'" :span="12">
              <el-form-item label="用户名称">
                <el-input v-model="mainTable.distribuForm.bankUserName" autocomplete="off" />
              </el-form-item>
              <el-form-item label="银行卡">
                <el-input v-model="mainTable.distribuForm.bankAccount" autocomplete="off" />
              </el-form-item>
              <el-form-item label="银行名称">
                <el-input v-model="mainTable.distribuForm.bankName" autocomplete="off" />
              </el-form-item>
              <el-form-item label="开户分行">
                <el-input v-model="mainTable.distribuForm.bankAddress" autocomplete="off" />
              </el-form-item>
              <el-form-item label="银行绑定手机">
                <el-input v-model="mainTable.distribuForm.bankPhone" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button size="mini" @click="mainTable.dialogDistributeVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleDistributeQR(mainTable.applicationType)">确 定</el-button>
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

    <el-dialog width="400px" center title="查看" :visible.sync="mainTable.dialogCheckVisible">
      <div v-if="orderShowCard.qrUrl" style="text-align:center">
        <img :key="orderShowCard.qrUrl" :src="orderShowCard.qrUrl" style="border: 1px dashed #999;padding:4px;border-radius:4px" width="240px" height="240px" alt="">
        <div style="font-size:48px;color:#F79709;font-weight:bold">{{ orderShowCard.floatMoney }}</div>
      </div>
      <div v-else class="empty-info">
        暂无信息
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bulidStr } from '@/utils/index'
import { getOrderList, affirmOrder, callBackByHand, updateOrder } from '@/api/order'
import { getCodeName } from '@/api/user'
import { distributeQR, getQrById } from '@/api/qrCode'
import Pagination from '@/components/Pagination'
import cryptoJs from 'crypto-js'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      isReject: false,
      showCard: {
        qrUrl: '',
        floatMoney: ''
      },
      orderShowCard: {
        qrUrl: '',
        floatMoney: ''
      },
      cache: {},
      map: {
        applicationType: {
          1: '代收',
          2: '代付',
          3: '提现'
        },
        payType: {
          1: '支付宝',
          2: '银行卡',
          3: '微信'
        },
        orderStatus: {
          0: '已关闭',
          1: '已承兑',
          2: '待承兑',
          3: '已过期'
        },
        backStatus: {
          0: '未回调',
          1: '回调成功',
          2: '回调失败'
        },
        receiptType: {
          1: '支付宝二维码',
          2: '微信二维码',
          3: '银行卡',
          4: '支付宝账号',
          5: '微信账号'
        }
      },
      mainTable: {
        dialogDistributeVisible: false,
        dialogMethodVisible: false,
        dialogCheckVisible: false,
        dialogOrderVisible: false,
        loading: false,
        reason: '',
        filter: {
          commercialName: '',
          commercialIphone: '',
          commercialNumber: '',
          orderStatus: '',
          backStatus: '',
          bankPhone: '',
          applicationType: '1'
        },
        orderForm: {
          backStatus: '',
          orderStatus: '',
          callBackUrl: '',
          remark: ''
        },
        appArray: [],
        distribuForm: {
          commercialNumber: localStorage.getItem('number'),
          bankAccount: '',
          bankName: '',
          bankAddress: '',
          bankPhone: '',
          bankUserName: '',
          outId: '',
          operatorMoney: '',
          makerName: '',
          num: '',
          applicationType: '',
          payType: '',
          time: '',
          sign: '',
          remark: '',
          callBackUrl: '',
          applicationName: ''

        },
        qrInfo: {
          qrId: '',
          qrUrl: '',
          receiptName: '',
          receiptType: '',
          bankAccount: ''
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
    this.getAPP()
    this.getMainTableData()
  },
  methods: {
    showCheck(item) {
      this.orderShowCard.qrUrl = item.remitUrl
      this.mainTable.dialogCheckVisible = true
      // getQrByOrderId({ orderId }).then(response => {
      //   if (response.errorCode !== '10000') return
      //   this.orderShowCard = response.data || {}
      // })
    },
    getAPP() {
      getCodeName({ commercialNumber: localStorage.getItem('number') }).then(response => {
        if (response.errorCode !== '10000') return

        this.mainTable.appArray = response.rows
      })
    },
    showDialog() {
      if (!this.$refs[`mainTable${this.mainTable.filter.applicationType}`].selection.length) {
        this.$message.info('请选择要修改的订单')
        return
      }
      this.initForm(this.mainTable.orderForm)
      this.mainTable.dialogOrderVisible = true
    },
    handleOrderSubmit() {
      let ids = []
      this.$refs[`mainTable${this.mainTable.filter.applicationType}`].selection.forEach(item => {
        ids.push(item.orderId)
      })
      ids = ids.join(',')
      updateOrder({
        ids,
        filter: bulidStr(this.mainTable.orderForm)
      }).then(response => {
        if (response.errorCode !== '10000') return
        this.getMainTableData()
        this.mainTable.dialogOrderVisible = false
        this.$message.success(response.mes)
      })
    },
    cashMethod(item) {
      this.mainTable.dialogMethodVisible = true
      this.cache = item || {}
      this.isReject = false
      this.mainTable.reason = ''
      if (!item.qrId) {
        this.mainTable.qrInfo = {
          qrId: '',
          qrUrl: '',
          receiptName: '',
          receiptType: '',
          bankAccount: ''
        }
        return
      }

      getQrById({ id: item.qrId }).then(response => {
        Object.assign(this.mainTable.qrInfo, response.data)
      })
    },
    handleTabClick() {
      const keyNameArr = Object.keys(this.mainTable.filter)
      keyNameArr.forEach(item => {
        if (item !== 'applicationType') this.mainTable.filter[item] = ''
      })
      this.getMainTableData()
    },
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
        if (this.$refs[formName]) this.$refs[formName].clearValidate()
      })
    },
    handleDistributeQR(type) {
      this.mainTable.distribuForm.time = new Date().getTime()
      const {
        applicationName,
        bankAccount,
        bankAddress,
        bankName,
        bankPhone,
        bankUserName,
        commercialNumber,
        operatorMoney,
        makerName,
        outId,
        payType,
        remark,
        time
      } = this.mainTable.distribuForm
      const str =
      'applicationName=' + applicationName +
      '&bankAccount' + bankAccount +
      '&bankAddress' + bankAddress +
      '&bankName' + bankName +
      '&bankPhone' + bankPhone +
      '&bankUserName' + bankUserName +
      '&commercialNumber=' + commercialNumber +
      '&makerName=' + makerName +
      '&operatorMoney=' + (operatorMoney * 100) +
      '&outId=' + outId +
      '&payType=' + payType +
      '&remark=' + remark +
      '&time=' + time

      this.mainTable.distribuForm.sign = cryptoJs.MD5(str).toString()
      distributeQR(this.mainTable.distribuForm, type).then(response => {
        if (response.errorCode !== '10000') {
          return
        }

        this.showCard.qrUrl = response.qrUrl
        this.showCard.floatMoney = response.floatMoney / 100

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
      if (confirm === 4 && !this.mainTable.reason) {
        this.$message.info('请填写驳回理由')
        return
      }

      this.$confirm('确定要修改订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _form = {
          orderId,
          status: confirm,
          reason: confirm === 4 ? this.mainTable.reason : undefined,
          commercialNumber: localStorage.getItem('number')
        }

        affirmOrder(_form).then(response => {
          if (response.errorCode !== '10000') {
            return
          }

          this.$message.success(response.mes)
          this.getMainTableData()
          this.mainTable.dialogMethodVisible = false
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    callBackByHand(orderId) {
      this.$confirm('确定要手动回调吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callBackByHand({
          orderId
        // commercialNumber: localStorage.getItem('number')
        }).then(response => {
          if (response.errorCode !== '10000') {
            return
          }
          this.getMainTableData()
          this.$message.success(response.mes)
        }).catch(err => {
          this.$message.error(err)
        })
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
.empty-info{
  text-align: center;
  color: #ccc;
  line-height: 100px;
  height: 100px;
}
</style>
