<template>
  <div class="body-container">

    <el-row :gutter="10" class="full-height">
      <el-col :span="4" class="full-height">
        <el-card class="full-height" style="position:relative">
          <el-tree
            class="over-content"
            :data="tree.array"
            :props="{
              label:'menuName'
            }"
            :expand-on-click-node="false"
            accordion
            @node-click="handleNodeClick"
          />
          <el-button size="small" icon="el-icon-box" class="bottom-btn" @click="backToRootMenu">返回根目录</el-button>
        </el-card>
      </el-col>
      <el-col :span="20" class="full-height">
        <el-card class="full-height">
          <el-row style="margin-bottom:10px">
            <i class="el-icon-folder" style="font-weight:bold" />
            <span style="font-size:13px;margin-left:10px">{{ '菜单名：' + (parentNodeInfo.menuName || '根目录' ) }}</span>
            <el-button style="float:right" type="primary" size="mini" @click="addMenu">新增目录</el-button>
          </el-row>
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
            <el-table-column align="center" label="菜单名" prop="menuName" />
            <el-table-column align="center" label="菜单路径" prop="menuUrl" />
            <el-table-column align="center" label="一级目录">
              <template slot-scope="scope">
                {{ scope.row.parentName || 'root' }}
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="id" prop="menuId" /> -->
            <el-table-column align="center" label="路由" prop="urlPre" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog width="400px" center title="新增目录" :visible.sync="mainTable.dialogFormVisible">
      <el-form ref="form" :model="mainTable.form" :rules="mainTable.formRules">
        <el-form-item label="菜单名" label-width="80px" prop="menuName">
          <el-input v-model="mainTable.form.menuName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单路径" label-width="80px" prop="menuUrl">
          <el-input v-model="mainTable.form.menuUrl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路由" label-width="80px">
          <el-input v-model="mainTable.form.urlPre" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="mainTable.dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSubmitForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { addMenu, getMenu } from '@/api/menu'
import { handleIntoChildren } from '@/utils/index'
// import { getInfo } from '@/api/user'

export default {
  data() {
    const self = this
    return {
      tree: {
        array: self.$store.getters.router
      },
      mainTable: {
        dialogFormVisible: false,
        loading: false,
        array: [],
        form: {
          menuName: '',
          menuUrl: '',
          urlPre: '',
          parentId: 'root',
          commercialNumber: localStorage.getItem('number')
        },
        formRules: {
          menuName: [{ required: true, trigger: 'blur' }],
          menuUrl: [{ required: true, trigger: 'blur' }]
        },
        pager: {
          index: 1,
          pager: 1,
          size: 10
        }
      },
      parentNodeInfo: {},
      cache: {
        array: []
      }
    }
  },
  created() {
    // const tree = JSON.parse(JSON.stringify(this.tree.array))
    // tree.forEach(item => {
    //   item.childrens = item.children
    //   delete item.children
    // })

    // this.mainTable.array = this.cache.array = tree
    this.getMainTreeData()
  },
  methods: {
    addMenu() {
      this.mainTable.dialogFormVisible = true
      this.initForm()
    },
    initForm() {
      const keyNameArr = Object.keys(this.mainTable.form)
      keyNameArr.forEach(item => {
        if (item !== 'commercialNumber') this.mainTable.form[item] = ''
      })

      this.$nextTick(_ => {
        this.$refs.form.clearValidate()
      })
    },
    getMainTreeData() {
      this.mainTable.loading = true
      getMenu().then(response => {
        this.tree.array = this.cache.array = this.mainTable.array = handleIntoChildren(response.rows) || []
      }).finally(_ => {
        this.mainTable.loading = false
      })
    },
    handleNodeClick(data) {
      this.parentNodeInfo = data
      this.mainTable.array = data.children || []
    },
    handleSubmitForm() {
      this.mainTable.form.parentId = this.parentNodeInfo.menuId || 'root'
      addMenu(this.mainTable.form).then(data => {
        if (data.errorCode !== '10000') {
          return
        }
        this.$message({
          type: 'success',
          message: data.mes
        })
        this.getMainTreeData()
        this.mainTable.dialogFormVisible = false
      })
    },
    backToRootMenu() {
      this.parentNodeInfo = {}
      this.mainTable.array = this.cache.array
    }
  }
}
</script>

<style lang="scss">

.body-container{
    height: 100%;
    .el-card__body{
      height: 100%;
    }

    .over-content{
      max-height: 95%;
      overflow-y: auto;
    }
}
.bottom-btn{
  position: absolute;
  bottom: 10px;
  left: 5%;
  width: 90%;
}

</style>
