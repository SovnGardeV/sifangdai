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
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <el-table
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
          <el-table-column align="center" label="姓名" prop="commercialName" />
          <el-table-column align="center" label="手机号" prop="commercialIphone" />
          <el-table-column align="center" label="商户号" prop="commercialNumber" />
          <el-table-column align="center" label="服务费比例" prop="commercialRatio">
            <template slot-scope="scope">
              <el-input v-if="scope.row.isEdit" ref="editRadio" v-model="mainTable.commercialRatio" @blur="handleEditRadio(scope.row)" @keyup.enter.native="handleEditRadio(scope.row)" />
              <div v-else>
                <span>{{ scope.row.commercialRatio }}</span>
                <el-button title="修改" type="text" size="small" icon="el-icon-edit" @click="editService(scope.row)" />
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
          <el-table-column align="center" label="操作" width="260px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="mainTable.dialogFormVisible = true;mainTable.form.commercialNumber = scope.row.commercialNumber">设置白名单</el-button>
              <el-button plain size="mini" type="primary" @click="handleCheck(scope.row)">查看</el-button>
              <el-button plain size="mini" type="primary" @click="getTreeData(scope.row)">权限</el-button>

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
import { getInfo } from '@/api/user'
import { bulidStr, handleIntoChildren } from '@/utils/index'
import { getUserList, setRadio, insertIp, getUserInfo } from '@/api/user'
import Pagination from '@/components/Pagination'

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
        dialogPermissionVisible: false,
        commercialRatio: 0,
        row: {},
        filter: {
          commercialName: '',
          commercialIphone: '',
          commercialNumber: ''
        },
        form: {
          commercialNumber: '',
          ips: ''
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
    editService(item) {
      this.mainTable.commercialRatio = item.commercialRatio
      item.isEdit = true
      this.$nextTick(_ => {
        this.$refs['editRadio'].focus()
      })
    },
    handleEditRadio(item) {
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
.el-form-item{
    margin-bottom: 0;
}
</style>
