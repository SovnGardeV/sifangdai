<template>
  <div class="app-container">
    <el-card class="filter-container">
      <el-form :inline="true" style="text-align:right">
        <el-form-item>
          <el-input v-model="mainTable.filter.cfgName" placeholder="配置名称" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="mainTable.filter.cfgKey" placeholder="配置名" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="mainTable.filter.cfgValue" placeholder="配置值" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
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
        <el-button size="mini" type="primary" @click="showAdd">新增</el-button>
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
        <el-table-column align="center" label="配置名称" prop="cfgName" />
        <el-table-column align="center" label="配置名" prop="cfgKey" />
        <el-table-column align="center" :show-overflow-tooltip="true" label="配置值" prop="cfgValue" />
        <el-table-column align="center" label="配置等级" prop="cfgType">
          <template slot-scope="scope">
            {{ map.cfgType[scope.row.cfgType] }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" prop="cfgRemark" />
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
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

    <el-dialog width="400px" center title="新增配置" :visible.sync="mainTable.dialogAddVisible">
      <div>
        <el-form ref="form" :model="mainTable.form" label-width="100px">
          <el-form-item label="配置名称">
            <el-input v-model="mainTable.form.cfgName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="配置名">
            <el-input v-model="mainTable.form.cfgKey" autocomplete="off" />
          </el-form-item>
          <el-form-item label="配置值">
            <el-input v-model="mainTable.form.cfgValue" autocomplete="off" />
          </el-form-item>
          <el-form-item label="配置等级">
            <el-select v-model="mainTable.form.cfgType" style="width:100%;">
              <el-option :value="1" label="普通配置">普通配置</el-option>
              <el-option :value="2" label="秘钥配置">秘钥配置</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="mainTable.form.cfgRemark" type="textarea" autocomplete="off" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button size="mini" @click="mainTable.dialogAddVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleAddCommon">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog width="400px" center title="修改配置" :visible.sync="mainTable.dialogEditVisible">
      <div>
        <el-form ref="form" :model="mainTable.form" label-width="100px">
          <el-form-item label="配置名称">
            <el-input v-model="mainTable.form.cfgName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="配置名">
            <el-input v-model="mainTable.form.cfgKey" autocomplete="off" />
          </el-form-item>
          <el-form-item label="配置值">
            <el-input v-model="mainTable.form.cfgValue" autocomplete="off" />
          </el-form-item>
          <el-form-item label="配置等级">
            <el-select v-model="mainTable.form.cfgType" style="width:100%;">
              <el-option :value="1" label="普通配置">普通配置</el-option>
              <el-option :value="2" label="秘钥配置">秘钥配置</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="mainTable.form.cfgRemark" type="textarea" autocomplete="off" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button size="mini" @click="mainTable.dialogEditVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleEditCommon">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bulidStr } from '@/utils/index'
import { getConfig, addConfig, editConfig, delConfig } from '@/api/config'
import Pagination from '@/components/Pagination'
import { JSEncrypt } from 'jsencrypt'

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
      map: {
        cfgType: {
          1: '普通配置',
          2: '秘钥配置'
        }
      },
      mainTable: {
        dialogAddVisible: false,
        dialogEditVisible: false,
        loading: false,
        cache: {},
        filter: {
          cfgName: '',
          cfgKey: '',
          cfgValue: ''
        },
        form: {
          cfgName: '',
          cfgKey: '',
          cfgValue: '',
          cfgType: '',
          cfgRemark: ''
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
    showAdd() {
      this.initForm(this.mainTable.form)

      this.mainTable.dialogAddVisible = true
    },
    showEdit(item) {
      Object.assign(this.mainTable.form, item)
      this.mainTable.cache = item
      this.mainTable.dialogEditVisible = true
    },
    initForm(form) {
      const keyNameArr = Object.keys(form)
      keyNameArr.forEach(item => {
        if (item !== 'commercialNumber') form[item] = ''
      })

    //   this.$nextTick(_ => {
    //     this.$refs[formName].clearValidate()
    //   })
    },
    deleteItem(item) {
      this.$confirm('确定要删除' + item.cfgKey + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delConfig({ id: item.id }).then(response => {
          if (response.errorCode !== '10000') return
          this.$message({
            type: 'success',
            message: '删除成功!'
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
    handleAddCommon() {
      const _form = Object.assign({}, this.mainTable.form)
      if (this.mainTable.form.cfgType === 2) {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(localStorage.getItem('publicKey'))
        _form.cfgValue = encrypt.encrypt(_form.cfgValue)
      }
      addConfig(_form).then(response => {
        if (response.errorCode !== '10000') return

        this.$message.success(response.mes)

        this.mainTable.dialogAddVisible = false
        this.getMainTableData()
      })
    },
    handleEditCommon() {
      const _form = Object.assign({}, this.mainTable.form)
      if ((this.mainTable.cache.cfgValue !== this.mainTable.form.cfgValue) && (this.mainTable.form.cfgType === 2)) {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(localStorage.getItem('publicKey'))
        _form.cfgValue = encrypt.encrypt(_form.cfgValue)
      }
      editConfig(_form).then(response => {
        if (response.errorCode !== '10000') return

        this.$message.success(response.mes)

        this.mainTable.dialogEditVisible = false
        this.getMainTableData()
      })
    },
    getMainTableData() {
      this.mainTable.loading = true
      const _filter = Object.assign({}, this.mainTable.filter)
      const _form = {
        filter: ((filter) => {
          return bulidStr(filter)
        })(_filter),
        page: this.mainTable.pager.index,
        limit: this.mainTable.pager.size
      }
      getConfig(_form).then(response => {
        this.mainTable.pager.total = response.total || 0
        this.mainTable.array = response.data || []
      }).finally(_ => {
        this.mainTable.loading = false
      })
    },
    handlePagerChange(val) {
      this.mainTable.pager = val
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
