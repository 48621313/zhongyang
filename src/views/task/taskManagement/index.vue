<template>
  <!-- 任务管理 -->
  <div class="page-wrapper">
    <div class="page-common">
      <div class="page-radius">
        <!-- 查询表单 -->
        <div class="form-box">
          <Form :queryList="queryList" inline showSearch @search="search"></Form>
        </div>
        <!-- 按钮 -->
        <div class="opreation-box">
          <div class="left">
            <el-dropdown trigger="click" placement="bottom">
              <span class="cm-btn info">
                批量操作<i class="el-icon-arrow-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="width: 140px;">
                <el-dropdown-item @click="updatePage()">测试一</el-dropdown-item>
                <el-dropdown-item>测试二</el-dropdown-item>
                <el-dropdown-item>测试三</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button class="cm-btn" type="primary" @click="addOrUpdate">新增</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <div class="table-common">
          <Table ref="table" :columns="columns" :data="loadData" @selectChange="selectChange" showPagination>
            <template v-slot:action>
              <el-button class="tb-ac-btn" type="text">
                执行
              </el-button>
              <el-button class="tb-ac-btn" type="text">
                执行列表
              </el-button>
              <el-button class="tb-ac-btn" type="text">
                编辑
              </el-button>
              <el-button class="tb-ac-btn danger" type="text">
                删除
              </el-button>
            </template>
          </Table>
        </div>
      </div>
      <!-- 弹窗 -->
      <AddOrUpdate  ref="AddOrUpdate">
      </AddOrUpdate>
      <UpdatePage  ref="UpdatePage">
      </UpdatePage>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table/index.vue'
import AddOrUpdate from './addOrUpdate/index'
import UpdatePage from './updatePage/index'
import Form from '@/components/Form/index.vue'
import { listDbTable } from "@/api/tool/gen";
import { listDept } from "@/api/system/dept";
const columns = [
  { type: "checkbox", width: 120, },
  { label: '序号', dataIndex: 'bb', ellipsis: true },
  { label: '名称', dataIndex: 'cc', ellipsis: true },
  { label: '操作', dataIndex: 'ee', width: 300, ellipsis: true, slot: 'action' },
]
export default {
  name: "TaskManagement",
  components: {
    Table,
    Form,
    UpdatePage,
    AddOrUpdate,
  },
  data() {
    return {
      // 表格
      columns,
      queryList: [
        { label: '组织机构', type: 'input', key: 'bb', value: undefined },
        { label: '名称', type: 'input', key: 'cc', value: undefined },
      ],
      queryParam: {},
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return listDbTable(requestParameters).then(res => {
          return res
        });
      },
      selectedRows: [],
      selectedRowKeys: [],
    };
  },
  created() {
    this.init()
  },
  mounted() {
    this.updatePage()
  },
  methods: {
    // 初始化
    init() {
      listDept({ deptName: undefined, status: undefined }).then(response => {
        const deptList = this.handleTree(response.data, "deptId");
        console.log(deptList, '部门组织列表');
      });
    },
    // 增改...
    addOrUpdate() { 
      this.$refs.AddOrUpdate.open()
    },
    updatePage() {
      this.$refs.UpdatePage.open()
    },
    // 搜索
    search() {
      let queryParam = {}
      this.queryParam = this.queryList.filter((m) => {
        return !!m.value
      }).forEach((n) => {
        queryParam[n.key] = n.value
      })
      this.queryParam = queryParam
      this.$refs.table.refresh()
      console.log('更新查询条件 重置下第一页等操作', queryParam);
    },
    // 表格
    selectChange(arr) {
      this.selectedRows = arr?.[0] || []
      this.selectedRowKeys = arr?.[1] || []
      console.log(arr);
    },
  }
};
</script>
  
<style scoped lang="scss"></style>
  
  