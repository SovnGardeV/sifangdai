<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="info-card">
          <div class="info-card-head" />
          <img class="avatar" src="../../assets/bg.jpg">

          <div class="fix">
            <div v-for="(value,key) in commercialInfo" :key="key" class="detail-info">
              <span v-if="map[key]" class="detail-info-item">
                <div class="info-tip">
                  {{ map[key] }}
                </div>
                {{ belongNumber.indexOf(key) > -1 ? (value / 100) : value }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card style="margin-bottom:10px">
          <div class="app-list-title">金额详情</div>
          <el-row style="padding: 10px 0" :gutter="10">
            <el-col :span="6">
              <div class="commMoney-info-front">
                总金额:{{ (frontInfo.allMoney/100) || 0 }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="commMoney-info-front">
                总提现金额:{{ (frontInfo.allWitMoney/100) || 0 }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="commMoney-info-front">
                余额:{{ (frontInfo.balance/100) || 0 }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="commMoney-info-front">
                冻结金额:{{ (frontInfo.freezeMoney/100) || 0 }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col v-for="(item,index) in commMoneyInfo" :key="index" :span="8">
              <div class="commMoney-info">
                <div v-for="(value, key) in item" v-show="infoMap.keyValue[key]" :key="key">
                  <span>{{ infoMap.keyValue[key] }}：{{ key === 'type' ? infoMap.type[value] : key === 'operMoney' ? (value/100) : value }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card>
          <div style="margin-bottom:20px">
            <div class="app-list-title">APP列表</div>
            <div style="float:right;margin-top: -18px">
              <el-input v-model="mainTable.filter.name" size="mini" style="width:unset" placeholder="请输入APP名称" @keyup.enter.native="filterList()">
                <el-button slot="append" icon="el-icon-search" @click="filterList()" />
              </el-input>
              <el-button size="mini" type="primary" @click="showDialog('add')">新增</el-button>
            </div>
          </div>
          <el-row :gutter="10">
            <el-col v-for="item in mainTable.array" :key="item.appId" :xs="24" :sm="24" :xl="8" :lg="12">
              <div class="app-info">
                <el-row>
                  <el-col :span="12" style="padding:5px">
                    <i class="el-icon-edit-outline" style="color:#4E5BF2;cursor:pointer" @click="showDialog('edit', item)" />
                  </el-col>
                  <el-col style="text-align:right;padding:5px" :span="12">
                    <i class="el-icon-close" style="color:red;cursor:pointer" @click="deleteApp(item.appId)" />
                  </el-col>
                </el-row>
                <el-row style="padding: 5px" :gutter="10">
                  <el-col :span="10">
                    <div class="image-header">
                      <el-image :src="item.appImg" />
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <div v-for="(value,key) in item" :key="key" style="font-size:14px;margin:4px">
                      <span v-if="appMap[key]" style="word-break:break-all;">
                        <span style="color:#aaa;">{{ appMap[key] }}：</span>
                        {{ value }}
                        <i v-if="key==='appKey'" style="cursor:pointer" class="el-icon-edit" @click="editAPPKey(item)" />
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <div v-if="mainTable.array.length === 0" style="width:100%;text-align:center;line-height:100px;color:#999">
            暂无APP
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="mode === 'add' ? '新增APP' : '修改APP'" width="400px" center :visible.sync="mainTable.dialogAddVisible">
      <el-form ref="addForm" :model="mainTable.addForm" :rules="mainTable.formRules">
        <el-form-item label="应用LOGO" label-width="100px" prop="appImg">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="handleUploadPicture"
          >
            <img v-if="mainTable.addForm.appImg" :src="mainTable.addForm.appImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="APPID" label-width="100px" prop="appId">
          <el-input v-model="mainTable.addForm.appId" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="APP名称" label-width="100px" prop="appName">
          <el-input v-model="mainTable.addForm.appName" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="mode === 'edit'" label="APPkey" label-width="100px" prop="appKey">
          <el-input v-model="mainTable.addForm.appKey" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="mode === 'edit'" label="是否上架" label-width="100px">
          <el-select v-model="mainTable.addForm.appIsPut">
            <el-option value="0" label="上架">上架</el-option>
            <el-option value="1" label="下架">下架</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="mode === 'edit'" label="回调地址" label-width="100px" prop="appBackUrl">
          <el-input v-model="mainTable.addForm.appBackUrl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="白名单" label-width="100px" prop="appWhiteList">
          <el-input v-model="mainTable.addForm.appWhiteList" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="mainTable.dialogAddVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAddAPP">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadPicture } from '@/api/qrCode'
import { getUserInfo, addAPP, setAPPKey, deleteApp, updAppInfo, getCommMoneyInfo } from '@/api/user'

export default {
  data() {
    return {
      mode: 'add',
      commMoneyInfo: [],
      mainTable: {
        dialogAddVisible: false,
        filter: {
          name: ''
        },
        loading: false,
        row: {},
        array: [],
        addForm: {
          appWhiteList: '',
          appIsPut: '',
          appBackUrl: '',
          appKey: '',
          appImg: '',
          appId: '',
          appName: '',
          commercialNumber: (_ => {
            return this.$route.query.commercialNumber
          })()
        },
        originArray: []
      },
      formRules: {
        appWhiteList: [{ required: true, trigger: 'blur' }],
        appBackUrl: [{ required: true, trigger: 'blur' }],
        appKey: [{ required: true, trigger: 'blur' }],
        appImg: [{ required: true, trigger: 'blur' }],
        appId: [{ required: true, trigger: 'blur' }],
        appName: [{ required: true, trigger: 'blur' }]
      },
      map: {
        commercialName: '商户名',
        commercialIphone: '商户手机号',
        commercialNumber: '商户号',
        commercialBalance: '商户余额',
        freezeMoney: '冻结金额',
        allMoney: '总金额',
        allWitMoney: '总提现金额',
        commercialRatio: '服务费收取比例',
        creationTime: '创建时间',
        updateTime: '	修改时间',

        appName: '应用名',
        appBackUrl: '回调地址',
        appIsPut: '是否上架',
        createTime: '创建时间',
        appKey: 'appKey'
      },
      appMap: {
        appName: 'APP名称',
        appId: 'APPID',
        appWhiteList: '白名单',
        appBackUrl: '回调地址',
        appKey: 'appKey',
        appIsPut: '是否上架',
        createTime: '创建时间',
        // operatorTime: '操作时间',
        operatorName: '操作人'
      },
      frontInfo: {
        allMoney: '',
        allWitMoney: '',
        balance: '',
        freezeMoney: ''
      },
      infoMap: {
        type: {
          1: '代收',
          2: '代付',
          3: '提现'
        },
        keyValue: {
          // allMoney: '总金额',
          // allWitMoney: '总提现金额',
          // balance: '余额',
          // freezeMoney: '冻结金额',
          type: '类型',
          num: '今日订单数',
          operMoney: '今日提现总金额'
        }
      },
      belongNumber: ['freezeMoney', 'commercialBalance', 'allMoney', 'allWitMoney'],
      commercialInfo: {}
    }
  },
  created() {
    this.getCommMoneyInfo()
    this.getMainTableData()
  },
  methods: {
    getCommMoneyInfo() {
      const { commercialId } = this.$route.query
      getCommMoneyInfo({
        commercialId
      }).then(response => {
        if (response.errorCode !== '10000') return
        this.commMoneyInfo = response.rows
        if (Array.isArray(response.rows) && response.rows.length) {
          this.frontInfo.allMoney = response.rows[0].allMoney
          this.frontInfo.allWitMoney = response.rows[0].allWitMoney
          this.frontInfo.balance = response.rows[0].balance
          this.frontInfo.freezeMoney = response.rows[0].freezeMoney
        }
      })
    },
    showDialog(type, item) {
      this.mode = type
      this.mainTable.dialogAddVisible = true
      this.initForm()
      if (type === 'edit') {
        this.mainTable.row = item
        this.mainTable.addForm.appBackUrl = item.appBackUrl
        this.mainTable.addForm.appKey = item.appKey
        this.mainTable.addForm.appIsPut = item.appIsPut
        this.mainTable.addForm.appImg = item.appImg
        this.mainTable.addForm.appName = item.appName
        this.mainTable.addForm.appWhiteList = item.appWhiteList
      }
    },
    deleteApp(appId) {
      this.$confirm('确定要删除该APP吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApp({ appId }).then(response => {
          if (response.errorCode !== '10000') return
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getMainTableData()
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    initForm() {
      const keyNameArr = Object.keys(this.mainTable.addForm)
      keyNameArr.forEach(item => {
        if (item !== 'commercialNumber') this.mainTable.addForm[item] = ''
      })

      this.$nextTick(_ => {
        this.$refs.addForm.clearValidate()
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
          this.getMainTableData()
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
    handleUploadPicture(file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('imgType', 1)
      formData.append('commercialNumber', this.$route.query.commercialNumber)

      uploadPicture(formData).then(response => {
        this.mainTable.addForm.appImg = response.src
      })
    },
    handleAddAPP() {
      const _form = Object.assign({}, this.mainTable.addForm)
      if (this.mode === 'edit') {
        _form.appId = this.mainTable.row.appId
      }
      const _api = {
        add: addAPP,
        edit: updAppInfo
      }
      _api[this.mode](_form).then(response => {
        if (response.errorCode !== '10000') return

        this.$message({
          type: 'success',
          message: response.mes
        })
        this.mainTable.dialogAddVisible = false
        this.getMainTableData()
      })
    },
    filterList() {
      this.mainTable.array = this.mainTable.originArray.filter(item => {
        return item.appName.indexOf(this.mainTable.filter.name) > -1
      })
    },
    getMainTableData() {
      this.mainTable.loading = true
      const { commercialId, commercialNumber } = this.$route.query
      const _form = {
        commercialId,
        commercialNumber
      }
      getUserInfo(_form).then(response => {
        response.appInfo.forEach(item => {
          item.createTime = new Date(item.createTime).toLocaleString()
          item.operatorTime = new Date(item.operatorTime).toLocaleString()
          item.appIsPut = item.appIsPut.toString() === '0' ? '上架' : '下架'
        })
        this.mainTable.array = this.mainTable.originArray = response.appInfo || []
        response.commercial.creationTime = new Date(response.commercial.creationTime).toLocaleString()
        response.commercial.updateTime = new Date(response.commercial.updateTime).toLocaleString()
        this.commercialInfo = response.commercial || {}
      }).finally(_ => {
        this.mainTable.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.info-card{
  .el-card__body{
    padding: 0;
    height: 100%;
  }
  .info-card-head{
    height: 90px;
    background: #{$menuHover};
  }

  .avatar{
    display: block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
    top: -60px;
    border: 4px solid #fff;
  }

  .detail-info{
    text-align: center;
    font-family: 'STHeiti';
    line-height: 36px;
    font-weight: bold;
    position: relative;
    padding: 0 20px;
    margin-bottom: 20px;

    .detail-info-item{
      position: relative;
      display: block;
      width: 100%;
      border-radius: 4px;
      border: 1px solid #{$menuHover};

      .info-tip{
        color: #{$menuHover};
        font-size: 12px;
        line-height: 12px;
        position: absolute;
        top: -8px;
        left: 10px;
        background: #fff;
        padding: 0 5px;
        font-weight: normal;
      }
    }
  }

  .fix{
    position: relative;
    top: -30px;
  }
}

.app-info{
  width: 100%;
  padding: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 4px;
  // background: url('../../assets/bg.jpg') no-repeat;
  background-size: cover;
  transition: .2s all;
  /* cursor: pointer; */
  position: relative;
  overflow: hidden;
  margin-bottom: 8px;

  .app-info-detail{
    position: absolute;
    z-index: 4;
    top: -100%;
    transition: .2s all;
    background: rgba(255,255,255,.9);
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    padding: 20px;
    line-height: 20px;
    word-break: break-all;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .shadow{
    width: 100%;
    height: 100%;
    background: rgba(78,91,242,.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    border-radius: 4px;
    opacity: 0;
    transition: .2s all;
  }

  .image-header{
    position:relative;
    width:144px;
    height:144px;
    margin: 0 auto;
    .el-image{
      width:100%;
      height:100%;

    }

  }
  .app-info-name{
    text-align: center;
    padding: 15px;
    overflow: hidden;
    transition: .2s all;
    position: relative;
    z-index: 3;
  }
}

.app-list-title{
  color: #{$menuHover};
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}

.before-line{
  font-weight: bold;
  &::before{
    content: '';
    display: inline-block;
    width: 4px;
    height: 10px;
    background: #{$menuHover};
    margin-right: 4px;
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

.commMoney-info-front{
  background: #4E5BF2;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
.commMoney-info{
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  div{
    margin: 6px 0;
  }
}
</style>
