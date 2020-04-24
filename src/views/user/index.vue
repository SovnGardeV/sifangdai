<template>
  <div class="full-height">
    <div v-if="$route.name ==='UserList'" class="app-container">
      <el-card class="filter-container">
        <el-form :inline="true" style="text-align:right">
          <el-form-item>
            <el-input v-model="mainTable.filter.commercialName" placeholder="姓名" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="mainTable.filter.commercialNumber" placeholder="商户号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="mainTable.filter.commercialIphone" placeholder="手机号" size="mini" @keyup.enter.native="mainTable.pager.index = 1;getMainTableData()" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="mainTable.pager.index = 1;getMainTableData()">
              <i class="el-icon-search" />
            </el-button>
            <el-button type="primary" size="mini" @click="showAddForm">新增</el-button>
            <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
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
          <el-table-column type="selection" align="center" />
          <el-table-column align="center" label="姓名" prop="commercialName" />
          <el-table-column align="center" label="手机号" prop="commercialIphone" />
          <el-table-column align="center" label="商户号" prop="commercialNumber" />
          <el-table-column align="center" label="商户余额" prop="commercialBalance">
            <template slot-scope="scope">
              {{ scope.row.commercialBalance / 100 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="服务费比例" prop="commercialRatio">
            <template slot-scope="scope">
              <el-input v-show="scope.row.isEdit" ref="editRadio" v-model="mainTable.commercialRatio" @blur="handleEditRadio(scope.row)" @keyup.enter.native="handleEditRadio(scope.row)" />
              <div v-show="!scope.row.isEdit">
                <span>{{ scope.row.commercialRatio }}</span>
                <el-button title="修改" type="text" size="small" icon="el-icon-edit" @click="editService(scope.row)" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="提成服务费比例" prop="commercialRatio">
            <template slot-scope="scope">
              <el-input v-show="scope.row.isWitEdit" ref="editWitRadio" v-model="mainTable.commercialWithRatio" @blur="handleEditWitRadio(scope.row)" @keyup.enter.native="handleEditRadio(scope.row)" />
              <div v-show="!scope.row.isWitEdit">
                <span>{{ scope.row.commercialWithRatio }}</span>
                <el-button title="修改" type="text" size="small" icon="el-icon-edit" @click="editWitService(scope.row)" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="修改时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.updateTime).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">
              {{ new Date(scope.row.creationTime).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="180px">
            <template slot-scope="scope">
              <el-row :gutter="4" style="margin-bottom: 4px">
                <el-col :span="14">
                  <el-button style="width:100%" type="primary" size="mini" @click="setWhiteList(scope.row)">设置白名单</el-button>
                </el-col>
                <el-col :span="10">
                  <el-button style="width:100%" size="mini" type="primary" plain @click="recharge(scope.row)">充值</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="4">
                <el-col :span="12">
                  <el-button style="width:100%" plain size="mini" type="primary" @click="handleCheck(scope.row)">查看</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button style="width:100%" plain size="mini" type="primary" @click="getTreeData(scope.row)">权限</el-button>
                </el-col>
              </el-row>

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

      <el-dialog width="500px" center title="设置白名单" :visible.sync="mainTable.dialogFormVisible">
        <el-form ref="form" :model="mainTable.form">
          <el-form-item label="IP" label-width="60px">
            <el-input v-model="mainTable.form.ips" type="textarea" :rows="5" autocomplete="off" placeholder="IP之间以“,”隔开" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="mainTable.dialogFormVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleSubmitForm">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog width="400px" center title="充值" :visible.sync="mainTable.dialogCashVisible">
        <el-form ref="form" :model="mainTable.cashForm" label-width="80px" size="mini">
          <el-form-item label="充值金额">
            <el-input v-model="mainTable.cashForm.money" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="mainTable.dialogCashVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleSubmitCash">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog width="500px" center title="新增用户" :visible.sync="mainTable.dialogAddVisible">
        <el-form ref="addForm" :model="mainTable.addForm" label-width="80px">
          <el-form-item label="商户名">
            <el-input v-model="mainTable.addForm.commercialName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="mainTable.addForm.commercialIphone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="添加类型">
            <el-select v-model="mainTable.addForm.userType" style="width: 100%;">
              <el-option value="1" label="商户">商户</el-option>
              <el-option value="0" label="系统用户">系统用户</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="mainTable.addForm.commercialPassword" type="password" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="mainTable.dialogAddVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleAddForm">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog width="500px" top="3vh" style="height:80%" center title="分配权限" :visible.sync="mainTable.dialogPermissionVisible">
        <div>
          <el-tree
            ref="tree"
            v-loading="mainTable.treeLoading"
            element-loading-text="加载中，请稍候"
            element-loading-spinner="el-icon-loading"
            node-key="menuId"
            :default-checked-keys="mainTable.defaultMenu"
            :data="mainTable.tree"
            :props="{
              label:'menuName'
            }"
            :expand-on-click-node="false"
            accordion
            show-checkbox
          />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="mainTable.dialogPermissionVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="handleSubmitPermission">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <router-view v-else style="height:100%;" />
  </div>
</template>

<script>
import { getMenu, addRoleMenu } from '@/api/menu'
import { bulidStr, handleIntoChildren } from '@/utils/index'
import { getUserList, setRadio, setWitRadio, insertIp, getUserInfo, getInfo, addUser, getWhiteIp, delCommercia, recharge } from '@/api/user'
import Pagination from '@/components/Pagination'
import { JSEncrypt } from 'jsencrypt'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      getTreeData: '',
      mainTable: {
        loading: false,
        treeLoading: false,
        dialogFormVisible: false,
        dialogAddVisible: false,
        dialogPermissionVisible: false,
        dialogCashVisible: false,
        commercialRatio: 0,
        commercialWithRatio: 0,
        row: {},
        filter: {
          commercialName: '',
          commercialIphone: '',
          commercialNumber: ''
        },
        cashForm: {
          money: ''
        },
        form: {
          commercialNumber: '',
          commercialWithRatio: '',
          ips: ''
        },
        addForm: {
          commercialName: '',
          commercialIphone: '',
          userType: '',
          commercialPassword: ''
        },
        array: [],
        tree: [],
        defaultMenu: [],
        pager: {
          index: 1,
          total: 0,
          size: 10
        }
      }
    }
  },
  created() {
    this.getTreeData = this.setPermisson()
    if (this.$route.name === 'UserList') this.getMainTableData()
  },
  methods: {
    setWhiteList(item) {
      this.mainTable.form.commercialNumber = item.commercialNumber
      getWhiteIp({ commercialNumber: item.commercialNumber }).then(response => {
        if (response.errorCode !== '10000') return
        this.mainTable.form.ips = response.data
        this.mainTable.dialogFormVisible = true
      })
    },
    getMainTableData() {
      this.mainTable.loading = true
      const _form = {
        filter: ((filter) => {
          return bulidStr(filter)
        })(this.mainTable.filter),
        page: this.mainTable.pager.index,
        limit: this.mainTable.pager.size,
        commercialNumber: localStorage.getItem('number')
      }
      getUserList(_form).then(response => {
        response.commercialList.map(item => {
          item.isEdit = false
          item.isWitEdit = false
        })

        this.mainTable.pager.total = response.total || 0
        this.mainTable.array = response.commercialList || []
      }).finally(_ => {
        this.mainTable.loading = false
      })
    },
    handlePagerChange(val) {
      this.mainTable.pager = val
      this.getMainTableData()
    },
    handleCheck(item) {
      getUserInfo({
        commercialId: item.commercialId,
        commercialNumber: item.commercialNumber
      }).then(response => {
        if (response.errorCode === '10000') {
          this.$router.push({
            path: '/userlist/index/info',
            query: {
              commercialId: item.commercialId,
              commercialNumber: item.commercialNumber
            }
          })
        }
      })
    },
    setPermisson() {
      let hasGetTree
      return async(item) => {
        this.mainTable.row = item
        this.mainTable.dialogPermissionVisible = true
        this.mainTable.treeLoading = true

        if (!hasGetTree) {
          await getMenu().then(response => {
            hasGetTree = true
            this.mainTable.tree = handleIntoChildren(response.rows) || []
          })
        }
        getInfo({
          userName: item.commercialName,
          commercialNumber: item.commercialNumber
        }).then(response => {
          const { menuList } = response.data
          this.$refs.tree.setCheckedNodes(menuList)
        }).finally(_ => {
          this.mainTable.treeLoading = false
        })
      }
    },
    handleSubmitPermission() {
      const checkNode = this.$refs.tree.getCheckedKeys()

      checkNode.forEach((node, index) => {
        checkNode[index] = {
          menuId: node
        }
      })
      const _form = {
        menus: checkNode,
        roleId: this.mainTable.row.roleId
      }
      addRoleMenu(_form).then(response => {
        if (response.errorCode !== '10000') return

        this.$message.success(response.mes)
        this.mainTable.dialogPermissionVisible = false
      })
    },
    showAddForm() {
      const keyNameArr = Object.keys(this.mainTable.addForm)
      keyNameArr.forEach(item => {
        this.mainTable.addForm[item] = ''
      })
      this.mainTable.dialogAddVisible = true
    },
    handleAddForm() {
      this.$store.dispatch('user/getPublicKey').then(response => {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(response.publicKey)
        const _form = Object.assign({}, this.mainTable.addForm)
        _form.commercialPassword = encrypt.encrypt(_form.commercialPassword)
        addUser(_form).then(response => {
          if (response.errorCode !== '10000') {
            return
          }

          this.$message.success(response.mes)
          this.getMainTableData()
          this.mainTable.dialogAddVisible = false
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    editService(item) {
      this.mainTable.commercialRatio = item.commercialRatio
      item.isEdit = true
      this.$nextTick(_ => {
        this.$refs['editRadio'].focus()
      })
    },
    editWitService(item) {
      this.mainTable.commercialWithRatio = item.commercialWithRatio
      item.isWitEdit = true
      this.$nextTick(_ => {
        this.$refs['editWitRadio'].focus()
      })
    },
    recharge(item) {
      const keyNameArr = Object.keys(this.mainTable.cashForm)
      keyNameArr.forEach(item => {
        this.mainTable.cashForm[item] = ''
      })
      this.mainTable.row = item || {}
      this.mainTable.dialogCashVisible = true
    },
    handleSubmitCash() {
      const _form = {
        commercialId: this.mainTable.row.commercialId,
        money: this.mainTable.cashForm.money * 100
      }
      recharge(_form).then(response => {
        if (response.errorCode !== '10000') return
        this.$message.success(response.mes)
        this.getMainTableData()
        this.mainTable.dialogCashVisible = false
      })
    },
    handleEditRadio(item) {
      if (this.mainTable.commercialRatio === 0) {
        item.isEdit = false
        return
      }

      const _form = {
        commercialId: item.commercialId,
        commercialRatio: this.mainTable.commercialRatio
      }
      setRadio(_form).then(response => {
        if (response.errorCode !== '10000') {
          return
        }
        this.getMainTableData()
      }).catch(err => {
        this.$message.error(err)
      }).finally(_ => {
        item.isEdit = false
      })
    },
    handleEditWitRadio(item) {
      if (this.mainTable.commercialWithRatio === 0) {
        item.isWitEdit = false
        return
      }

      const _form = {
        commercialId: item.commercialId,
        commercialWithRatio: this.mainTable.commercialWithRatio
      }
      setWitRadio(_form).then(response => {
        if (response.errorCode !== '10000') {
          return
        }
        this.getMainTableData()
      }).catch(err => {
        this.$message.error(err)
      }).finally(_ => {
        item.isWitEdit = false
      })
    },
    deleteItem() {
      if (!this.$refs['mainTable'].selection.length) {
        this.$message.info('请选择要删除的商户')
        return
      }
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        this.$refs['mainTable'].selection.forEach(item => {
          ids.push(item.commercialId)
        })
        ids = ids.join(',')
        delCommercia({ ids }).then(response => {
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
    handleSubmitForm() {
      insertIp(this.mainTable.form).then(response => {
        if (response.errorCode !== '10000') {
          return
        }

        this.$message.success(response.mes)
        this.mainTable.dialogFormVisible = false
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
