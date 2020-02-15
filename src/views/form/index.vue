<template>
  <div class="app-container">
    <el-card class="filter-container">
      <el-form :inline="true" style="text-align:right">
        <!-- <el-form-item label="图片地址">
          <el-input v-model="mainTable.filter.qrUrl " size="mini" />
        </el-form-item> -->
        <el-form-item>
          <el-input v-model="mainTable.filter.receiptName" placeholder="收款人" clearable size="mini" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="mainTable.filter.enableStatus" placeholder="启用状态" clearable size="mini">
            <el-option :value="0" label="停用">停用</el-option>
            <el-option :value="1" label="启用">启用</el-option>
          </el-select>
          <!-- <el-input v-model="mainTable.filter.enableStatus " size="mini" /> -->
        </el-form-item>
        <el-form-item>
          <el-select v-model="mainTable.filter.receiptType" placeholder="账号类型" clearable size="mini">
            <el-option v-for="(value,key) in map" :key="key" :value="key" :label="value">{{ value }}</el-option>
          </el-select>
          <!-- <el-input v-model="mainTable.filter.receiptType" size="mini" /> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="getQRList">
            <i class="el-icon-search" />
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-col style="text-align:right;margin-bottom:10px;position:relative;z-index:2">
        <el-button size="mini" type="primary" @click="addQR">新增二维码</el-button>
        <el-button size="mini" type="primary" @click="distributeQR">分配二维码</el-button>
      </el-col>

      <el-row :gutter="10">
        <el-col v-for="item in mainTable.array" :key="item.qrId" :xs="24" :sm="12" :lg="8" :xl="6">
          <el-card style="margin-bottom:10px;position:relative;">
            <img :src="item.qrUrl" alt="" width="150px" height="150px" style="border-radius: 4px;">
            <div class="qr-info">
              <div class="account">{{ item.bankAccount }}</div>
              <div class="name">{{ item.receiptName }}</div>
              <div class="account-type">{{ map[item.receiptType] }}</div>
              <div class="time">{{ new Date(item.createTime).toLocaleString() }}</div>
              <div class="circle" :class="item.enableStatus == 1 ? 'circle-success' : 'circle-error'" :title="'当前状态：'+ (item.enableStatus == 1 ? '启用' : '停用')" @click="changeStatus(item)">
                <i class="el-icon-check enable-status" />
                <i class="el-icon-close disable-status" />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog width="400px" center title="新增二维码" :visible.sync="mainTable.dialogAddVisible">
      <el-form ref="addForm" :model="mainTable.addForm" :rules="mainTable.formRules">
        <el-form-item label="二维码路径" label-width="100px" prop="qrUrl">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="handleUploadPicture"
          >
            <img v-if="mainTable.addForm.qrUrl" :src="mainTable.addForm.qrUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="100px" prop="enableStatus">
          <el-select v-model="mainTable.addForm.enableStatus" style="width:100%">
            <el-option :value="1" label="启用">启用</el-option>
            <el-option :value="0" label="停用">停用</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="mainTable.addForm.bankAccount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="收款名" label-width="100px" prop="receiptName">
          <el-input v-model="mainTable.addForm.receiptName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="二维码类型" label-width="100px" prop="receiptType">
          <el-select v-model="mainTable.addForm.receiptType" style="width:100%">
            <el-option :value="1" label="支付宝">支付宝</el-option>
            <el-option :value="2" label="微信">微信</el-option>
            <el-option :value="3" label="银行卡">银行卡</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="mainTable.dialogAddVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAddQR">确 定</el-button>
      </div>
    </el-dialog>

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
import { uploadPicture, addQR, distributeQR, queryQrAll, updateEnableStatus } from '@/api/qrCode'
import { bulidStr } from '@/utils/index'
import cryptoJs from 'crypto-js'

export default {
  data() {
    return {
      map: {
        '1': '支付宝二维码',
        '2': '微信二维码',
        '3': '银行卡',
        '4': '支付宝账号',
        '5': '微信账号'
      },
      showCard: {
        qrUrl: '',
        floatMoney: ''
      },
      mainTable: {
        array: [],
        filter: {
          qrUrl: '',
          enableStatus: '',
          bankAccount: '',
          receiptName: '',
          receiptType: ''
        },
        addForm: {
          qrUrl: '',
          enableStatus: '',
          receiptName: '',
          receiptType: '',
          commercialNumber: localStorage.getItem('number')
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
        formRules: {
          qrUrl: [{ required: true, trigger: 'blur' }],
          enableStatus: [{ required: true, trigger: 'blur' }],
          receiptName: [{ required: true, trigger: 'blur' }],
          receiptType: [{ required: true, trigger: 'blur' }],

          commercialNumber: [{ required: true, trigger: 'blur' }],
          operatorMoney: [{ required: true, trigger: 'blur' }],
          makerName: [{ required: true, trigger: 'blur' }],
          num: [{ required: true, trigger: 'blur' }],
          outId: [{ required: true, trigger: 'blur' }],
          applicationType: [{ required: true, trigger: 'blur' }],
          payType: [{ required: true, trigger: 'blur' }],
          applicationName: [{ required: true, trigger: 'blur' }]
        },
        dialogAddVisible: false,
        dialogDistributeVisible: false
      }
    }
  },
  created() {
    this.getQRList()
  },
  methods: {
    changeStatus(item) {
      const { qrId, enableStatus } = item
      updateEnableStatus({
        qrId,
        status: enableStatus === 0 ? 1 : 0
      }).then(response => {
        if (response.errorCode !== '10000') return

        item.enableStatus = enableStatus === 0 ? 1 : 0
        // this.getQRList()
      })
    },
    initForm(form, formName) {
      debugger
      const keyNameArr = Object.keys(form)
      keyNameArr.forEach(item => {
        if (item !== 'commercialNumber') form[item] = ''
      })

      this.$nextTick(_ => {
        this.$refs[formName].clearValidate()
      })
    },
    addQR() {
      this.initForm(this.mainTable.addForm, 'addForm')
      this.mainTable.dialogAddVisible = true
    },
    handleUploadPicture(file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('imgType', 2)
      formData.append('commercialNumber', localStorage.getItem('number'))

      uploadPicture(formData).then(response => {
        this.mainTable.addForm.qrUrl = response.src
      })
    },
    handleAddQR() {
      addQR(this.mainTable.addForm).then(response => {
        this.$message({
          type: 'success',
          message: response.mes
        })
        this.mainTable.dialogAddVisible = false
        this.getQRList()
      })
    },
    distributeQR() {
      this.initForm(this.mainTable.distribuForm, 'distribuForm')

      this.mainTable.dialogDistributeVisible = true
    },
    getQRList() {
      const _form = {
        commercialNumber: localStorage.getItem('number'),
        filter: ((filter) => {
          return bulidStr(filter)
        })(this.mainTable.filter)
      }
      queryQrAll(_form).then(response => {
        if (response.errorCode !== '10000') return

        this.mainTable.array = response.rows || []
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  height: 100%;
}
.line{
  text-align: center;
}
.avatar-uploader{
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon{
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.bg{
  height: 600px;
  background: url('../../assets/phone.png') no-repeat;
  background-size: contain;
  background-position-x: 50%;

  .price{
    color: #F79709;
    font-size: 24px;
    line-height: 48px;
    font-weight: bold;
  }
}
.qr-info{
  float: right;
  width: calc(100% - 150px);
  height: 150px;
  padding: 10px 15px;
  .account{
    font-weight: bold;
    font-size: 24px;
    line-height: 40px;
  }
  .name{
    font-size: 16px;
    color: #8c939d;
    line-height: 24px;
  }
  .account-type{
    font-size: 14px;
    line-height: 24px;
  }
  .time{
    font-size: 12px;
    position: absolute;
    right: 10px;
    bottom: 5px;
    color: #ccc;
  }
  .circle{
    width: 80px;
    height: 80px;
    position: absolute;
    top: -40px;
    right: -40px;
    border-radius: 50%;
    transition: .2s all;
    cursor: pointer;
    &-success{
      background: #5cb87a;
    }
    &-error{
      background: #F56C6C;
      transform: rotate(90deg);
    }

    .enable-status{
      font-size: 26px;
      position: absolute;
      left: 10px;
      bottom: 10px;
      color: #fff;
    }
    .disable-status{
      font-size: 26px;
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: #fff;
    }
  }
}
</style>

