<template>
  <div class="dashboard-container">
    <el-row v-if="$store.state.user.mode === 'operator'" style="height: 100%;" :gutter="10">
      <el-col :span="7" style="height: 100%;">
        <el-card style="height: 100%;" class="no-padding">
          <div class="dashboard-title">商户信息</div>
          <div style="padding: 10px 30px;">
            <div v-for="(value,key) in commercialInfo" :key="key" class="detail-info">
              <span v-if="map[key]" style="line-height: 50px;">
                <span style="color: #4E5BF2;font-weight: bold;font-size: 12px;">{{ map[key] }}</span>
                <div class="line" />
                <span style="font-size: 18px;">{{ value }}</span>
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="17" style="height: 100%;" class="dashboard-data">
        <el-card style="height: calc(100% - 210px);margin-bottom: 10px;overflow: auto;">
          <el-tabs v-model="activeName">
            <el-tab-pane label="APP列表" name="first">
              <div style="margin-bottom: 20px;">APP列表</div>
              <el-table
                :data="appListInfo.appArray"
                element-loading-text="加载中，请稍候"
                element-loading-spinner="el-icon-loading"
                border
                stripe
                fit
                highlight-current-row
              >
                <el-table-column align="center" label="商户号" prop="commercialNumber" />
                <el-table-column align="center" label="APP名称" prop="appName" />
                <el-table-column align="center" label="白名单" prop="appWhiteList" />
                <el-table-column align="center" label="回调地址" prop="appBackUrl" />
                <el-table-column align="center" label="APPkey">
                  <template slot-scope="scope">
                    {{ scope.row.appKey }}
                    <i class="el-icon-edit" style="cursor: pointer;" @click="editAPPKey(scope.row)" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="创建时间">
                  <template slot-scope="scope">
                    {{ new Date(scope.row.createTime).toLocaleString() }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作人" prop="operatorName" />
                <el-table-column align="center" label="操作时间">
                  <template slot-scope="scope">
                    {{ new Date(scope.row.operatorTime).toLocaleString() }}
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="新增APP" name="second">
              <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="应用LOGO" label-width="100px" prop="appImg">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :before-upload="handleUploadPicture"
                  >
                    <img v-if="addForm.appImg" :src="addForm.appImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
                <!-- <el-form-item label="APPID" prop="appId">
                  <el-input v-model="addForm.appId" autocomplete="off" style="width: unset;" />
                </el-form-item> -->
                <el-form-item label="APP名称" prop="appName">
                  <el-input v-model="addForm.appName" autocomplete="off" style="width: unset;" />
                </el-form-item>
                <!-- <el-form-item label="APPkey" prop="appKey">
                  <el-input v-model="addForm.appKey" autocomplete="off" style="width: unset;" />
                </el-form-item> -->
                <el-form-item label="回调地址" prop="appBackUrl">
                  <el-input v-model="addForm.appBackUrl" autocomplete="off" style="width: unset;" />
                </el-form-item>
                <el-form-item label="白名单" prop="appWhiteList">
                  <el-input v-model="addForm.appWhiteList" type="textarea" autocomplete="off" style="width: 400px;" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="handleAddAPP">确定</el-button>
                  <el-button size="mini" @click="activeName = 'first'">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="third">
              <el-form ref="modifyForm" :model="modifyForm" label-width="100px">
                <el-form-item label="原密码" prop="appId">
                  <el-input v-model="modifyForm.oldPwd" type="password" autocomplete="off" style="width: unset;" />
                </el-form-item>
                <el-form-item label="新密码" prop="appName">
                  <el-input v-model="modifyForm.newPwd" type="password" autocomplete="off" style="width: unset;" />
                </el-form-item>
                <el-form-item label="重复新密码" prop="appKey">
                  <el-input v-model="modifyForm.newPwd2" type="password" autocomplete="off" style="width: unset;" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="handleModifyPwd">确定</el-button>
                  <el-button size="mini" @click="activeName = 'first'">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="白名单" name="fourth">
              <el-form ref="ipsForm" :model="ipsForm" label-width="60px">
                <el-form-item label="IP">
                  <el-input v-model="ipsForm.ips" style="width: 400px;" type="textarea" :rows="5" autocomplete="off" placeholder="IP之间以“,”隔开" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="handleIpsForm">确定</el-button>
                  <el-button size="mini" @click="activeName = 'first'">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="提现" name="fifth">
              <el-form ref="witForm" :model="witForm" label-width="80px">
                <el-form-item label="提现金额">
                  <el-input v-model="witForm.witMoney" style="width:unset;" autocomplete="off" />
                </el-form-item>
                <el-form-item label="收款方式">
                  <el-select v-model="witForm.qrId">
                    <el-option v-for="item in appListInfo.qrArray" :key="item.qrId" :value="item.qrId" :label="item.receiptName + ' | ' + item.bankAccount">{{ item.receiptName }} | {{ item.bankAccount }}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="支付类型">
                  <el-select v-model="witForm.payType">
                    <el-option value="1" label="支付宝">支付宝</el-option>
                    <el-option value="2" label="微信">微信</el-option>
                    <el-option value="3" label="银行卡">银行卡</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="handleWitForm">确定</el-button>
                  <el-button size="mini" @click="activeName = 'first'">返回</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

        </el-card>
        <el-card style="height: 200px;">
          <el-row>
            <el-col :span="6">
              <div class="dashboard-button" @click="activeName = 'second'">
                <i class="el-icon-document-add" style="font-size: 40px;line-height: 80px;" />
                <div style="color: #000;font-size: 14px;margin-top: 10px;">新增APP</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="dashboard-button" @click="activeName = 'third'">
                <i class="el-icon-lock" style="font-size: 40px;line-height: 80px;" />
                <div style="color: #000;font-size: 14px;margin-top: 10px;">修改密码</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="dashboard-button" @click="activeName = 'fourth'">
                <i class="el-icon-tickets" style="font-size: 40px;line-height: 80px;" />
                <div style="color: #000;font-size: 14px;margin-top: 10px;">设置白名单</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="dashboard-button" @click="activeName = 'fifth'">
                <i class="el-icon-s-finance" style="font-size: 40px;line-height: 80px;" />
                <div style="color: #000;font-size: 14px;margin-top: 10px;">提现</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row v-else :gutter="10" style="height: 100%;">
      <el-col :span="6">
        <el-card>
          <div class="admin-title">今日代收金额</div>
          <div class="admin-number">{{ homeInfo.allMoney || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="admin-title">订单数量</div>
          <div class="admin-number">{{ homeInfo.count || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="admin-title">成功数量</div>
          <div class="admin-number">{{ homeInfo.passCount || 0 }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="admin-title">失败数量</div>
          <div class="admin-number">{{ homeInfo.cancelCount || 0 }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getUserInfo, getAPP, addAPP, modifyPassword, insertIp, applyWit, setAPPKey, getHomeInfo } from '@/api/user'
import { uploadPicture, queryQrAll } from '@/api/qrCode'
import { JSEncrypt } from 'jsencrypt'
import { bulidStr } from '@/utils/index'

export default {
  name: 'Dashboard',
  data() {
    return {
      name: localStorage.getItem('name'),
      homeInfo: {},
      commercialInfo: {},
      appListInfo: {
        appArray: [],
        qrArray: []
      },
      activeName: 'first',
      addForm: {
        appWhiteList: '',
        appBackUrl: '',
        appKey: '',
        appImg: '',
        appId: '',
        appName: '',
        commercialNumber: (_ => {
          return localStorage.getItem('number')
        })()
      },
      modifyForm: {
        commercialName: (_ => {
          return localStorage.getItem('name')
        })(),
        commercialNumber: (_ => {
          return localStorage.getItem('number')
        })(),
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      ipsForm: {
        commercialNumber: (_ => {
          return localStorage.getItem('number')
        })(),
        ips: ''
      },
      witForm: {
        commercialNumber: (_ => {
          return localStorage.getItem('number')
        })(),
        witMoney: '',
        payType: ''
      },
      map: {
        commercialName: '商户名',
        commercialIphone: '商户手机号',
        commercialNumber: '商户号',
        commercialBalance: '商户余额',
        commercialRatio: '服务费收取比例',
        commercialWithRatio: '提现比例',
        creationTime: '创建时间',
        updateTime: '	修改时间',

        appName: '应用名',
        appBackUrl: '回调地址',
        appIsPut: '是否上架',
        createTime: '创建时间',
        appKey: 'appKey'
      }
    }
  },
  created() {
    if (this.$store.state.user.mode === 'operator') {
      this.getCommercialInfo()
      this.getAPPListInfo()
      this.getQRList()
    } else {
      this.getHomeInfo()
    }
  },
  methods: {
    getHomeInfo() {
      getHomeInfo().then(response => {
        if (response.errorCode !== '10000') return
        this.homeInfo = response.data || {}
      })
    },
    getQRList() {
      const _form = {
        commercialNumber: localStorage.getItem('number'),
        filter: ((filter) => {
          return bulidStr(filter)
        })({ commercialNumber: localStorage.getItem('number'), enableStatus: 1 })
      }
      queryQrAll(_form).then(response => {
        if (response.errorCode !== '10000') return

        this.appListInfo.qrArray = response.rows || []
      })
    },
    editAPPKey(item) {
      this.$confirm('确定要修改' + item.appName + '的APPKey吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setAPPKey({ appId: item.appId }).then(response => {
          if (response.errorCode !== '10000') return
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getCommercialInfo()
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    getCommercialInfo() {
      getUserInfo({
        commercialId: localStorage.getItem('id') || '182f04b9-b4e0-4515-8a09-b91c3397fadc',
        commercialNumber: localStorage.getItem('number')
      }).then(response => {
        response.commercial.creationTime = new Date(response.commercial.creationTime).toLocaleString()
        response.commercial.updateTime = new Date(response.commercial.updateTime).toLocaleString()
        this.commercialInfo = response.commercial || {}
        this.ipsForm.ips = response.ips
      })
    },
    getAPPListInfo() {
      getAPP({
        commercialNumber: localStorage.getItem('number')
      }).then(response => {
        this.appListInfo.appArray = response.rows
      })
    },
    handleUploadPicture(file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('imgType', 1)
      formData.append('commercialNumber', localStorage.getItem('number'))

      uploadPicture(formData).then(response => {
        this.addForm.appImg = response.src
      })
    },
    handleAddAPP() {
      addAPP(this.addForm).then(response => {
        if (response.errorCode !== '10000') return

        this.$message({
          type: 'success',
          message: response.mes
        })
        this.initForm(this.addForm)
        this.getAPPListInfo()
      })
    },
    handleModifyPwd() {
      this.$store.dispatch('user/getPublicKey').then(response => {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(response.publicKey)
        const _form = Object.assign({}, this.modifyForm)
        _form.oldPwd = encrypt.encrypt(_form.oldPwd)
        _form.newPwd = encrypt.encrypt(_form.newPwd)
        delete _form.newPwd2
        modifyPassword(_form).then(response => {
          if (response.errorCode !== '10000') return

          this.$message({
            type: 'success',
            message: response.mes
          })
          this.initForm(this.modifyForm)
        })
      })
    },
    handleIpsForm() {
      insertIp(this.ipsForm).then(response => {
        if (response.errorCode !== '10000') {
          return
        }

        this.$message.success(response.mes)
        this.initForm(this.ipsForm)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleWitForm() {
      if (!this.witForm.qrId || !this.witForm.payType) {
        this.$message.info('请填写完整表格')
        return
      }
      const _form = Object.assign({}, this.witForm)
      _form.witMoney = _form.witMoney * 100
      applyWit(_form).then(response => {
        if (response.errorCode !== '10000') {
          return
        }

        this.$message.success(response.mes)
        this.initForm(this.witForm)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    initForm(form) {
      const keyNameArr = Object.keys(form)
      keyNameArr.forEach(item => {
        if (item !== 'commercialNumber' && item !== 'commercialName') form[item] = ''
      })

      // this.$nextTick(_ => {
      //   this.$refs.form.clearValidate()
      // })
    }
  }
}
</script>

<style lang="scss">
.no-padding{
  .el-card__body{
    padding: 0 !important;
  }
}
.admin-title:before{
  content: '';
  display: inline-block;
  width: 4px;
  height: 14px;
  position: relative;
  top: 2px;
  margin-right: 4px;
  background-color: #4E5BF2;
}
.admin-number{
  text-align: center;
  padding: 15px 0;
  font-size: 80px;
  color: #4E5BF2;
  text-shadow: 1px 1px 0px #212121;
}
.line{
  display: inline-block;
  width: 1px;
  height: 10px;
  background-color: rgba(78,91,242,.4);
  position: relative;
  left: 4px;
  margin-right: 20px;
}
.dashboard-data{
  .el-tabs__nav.is-top{
    display: none !important;
  }
}
.dashboard {
  &-container {
    height: 100%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-title{
    font-family: YouYuan;
    text-align: center;
    background-color: #4E5BF2;
    color: #fff;
    padding: 40px 0 10px 0;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 8px;
  }
  &-button {
    width: 80px;
    height: 80px;
    background-color: #4E5BF2;
    text-align: center;
    margin: 0 auto;
    transform: translateY(50%);
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    color: #fff;
    transition: .4s;
    cursor: pointer;
    &:hover{
      transform: translateY(50%) scale(1.2);
    }
  }
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
</style>
