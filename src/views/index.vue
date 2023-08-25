<template>
  <div class="page-wrapper">
    <div class="page-common">
    <!-- 按钮 -->
    <div class="btn-box">
      <!-- <el-button class="common-btn" type="primary" @click="sendMessage">主要按钮</el-button> -->
      <el-button class="common-btn" type="primary" @click="sendMessage">主要按钮</el-button>
    </div>
    <!-- 图标 -->
    <!-- <div class="icon-box">
      <el-image class="icon-common" :src="i.url" fit="fill" v-for="i in icon_arr" :key="i.url"></el-image>
    </div> -->
    <!-- 表单 -->
    <div class="form-box">
      <Form :queryList="queryList" inline showSearch @search="search"></Form>
    </div>
    <!-- 标签 -->
    <!-- <div class="tag-box">
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info" closable>标签三</el-tag>
      <el-tag type="warning" closable>标签四</el-tag>
      <el-tag type="danger" closable>标签五</el-tag>
    </div> -->
    <!-- 表格 -->
    <div class="table-common" style="margin: 80px 0; width: 100%; overflow: hidden;">
      <Table ref="table" :columns="columns" :data="loadData" @selectChange="selectChange" showPagination>
        <template v-slot:action>
          <el-button class="tb-ac-btn" type="text">
            修改
          </el-button>
          <el-button class="tb-ac-btn" type="text">
            删除
          </el-button>
        </template>
      </Table>
    </div>
    <!-- 进度条 -->
    <!-- <Progress title="滑动缩放" /> -->
    <DialogCustom :config="dialogConfig" :visible.sync="dialogConfig.visible">
      <Form :queryList="formList"></Form>
    </DialogCustom>
    <SpeciallLoading></SpeciallLoading>
    </div>
  </div>
</template>

<script>
import Progress from '@/views/components/progress/index.vue'
import Table from '@/components/Table/index.vue'
import DialogCustom from '@/components/DialogCustom/index.vue'
import SpeciallLoading from '@/components/SpeciallLoading/index.vue'


import Form from '@/components/Form/index.vue'
import { listDbTable, importTable } from "@/api/tool/gen";
const columns = [
  // { label: '测试二', dataIndex: 'ff', width: 200, type: 'checkbox', fixed: 'left' },
  // { label: '测试一', dataIndex: 'aa1', width: 200, ellipsis: true, fixed: 'left' },
  { label: '测试一', dataIndex: 'aaa', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'cccc', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'dddd', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'eeee', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'eeee1', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'eeee2', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'eeee3', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'eeee4', width: 200, ellipsis: true },
  { label: '测试一', dataIndex: 'fffff', width: 200, ellipsis: true },
  { label: '测试三', dataIndex: 'cc', width: 200, },
  // { label: '测试一', dataIndex: 'aa', width: 200, ellipsis: true, fixed: 'right' },
  // { label: '测试二', dataIndex: 'bb', width: 200, slot: 'action', fixed: 'right' },
]
export default {
  name: "Index",
  components: {
    Progress,
    Table,
    Form,
    DialogCustom,
    SpeciallLoading,
  },
  data() {
    return {
      // 图标
      icon_arr: [
        { url: require('@/assets/images/calibrate.png') },
        { url: require('@/assets/images/choice.png') },
        { url: require('@/assets/images/copy.png') },
        { url: require('@/assets/images/copyText.png') },
        { url: require('@/assets/images/desktop.png') },
        { url: require('@/assets/images/equipment.png') },
        { url: require('@/assets/images/feature.png') },
        { url: require('@/assets/images/group.png') },
        { url: require('@/assets/images/home.png') },
        { url: require('@/assets/images/close.png') },
        { url: require('@/assets/images/instruct.png') },
        { url: require('@/assets/images/jobmanage.png') },
        { url: require('@/assets/images/list.png') },
        { url: require('@/assets/images/local.png') },
        { url: require('@/assets/images/open.png') },
        { url: require('@/assets/images/orgnazation.png') },
        { url: require('@/assets/images/phone.png') },
        { url: require('@/assets/images/recognition.png') },
        { url: require('@/assets/images/send.png') },
        { url: require('@/assets/images/task.png') },
        { url: require('@/assets/images/video.png') },
        { url: require('@/assets/images/wathc.png') },
      ],
      // 表格
      columns,
      queryList: [
        { label: '城市', type: 'select', key: 'aa', options: [], value: undefined },
        { label: '名称', type: 'input', key: 'bb',  value: undefined },
        { label: 'IP', type: 'input', key: 'cc',  value: undefined },
        { label: '客户', type: 'select', key: 'dd', options: [ { label: '111', value: '2222'} ], value: undefined },
        { label: '序列号', type: 'input', key: 'ee', value: undefined },
        { label: '硬件号', type: 'input', key: 'ff', value: undefined },
        { label: '序列号', type: 'input', key: 'ee2', value: undefined },
      ],

      formList:[
        { label: '名称', type: 'input', key: 'cc',  value: undefined },
        { label: 'IP', type: 'input', key: 'cc',  value: undefined },
        { label: '序列号', type: 'input', key: 'ee', value: undefined },
        { label: '硬件号', type: 'input', key: 'ff', value: undefined },
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
      // 弹窗
      dialogConfig: {
        loading: true,
        visible: false,
        width: '485px',
        title: '新增设备',
      }
    };
  },
  methods: {
    sendMessage() {
      this.dialogConfig.visible = true
      console.log(this.queryList, this.queryParam, '1111111111');
      this.$refs.table.resetSelect()
      // this.$message({ message: '测试', type: 'success', duration: 5000 });
      this.$message({ message: '测试', type: 'warning',duration: 8000});
      // this.$message({ message: '测试', type: 'error',duration: 10000});

      // this.$message('测试');
    },
    // 搜索
    search() {
      let queryParam = {}
      this.queryParam = this.queryList.filter((m)=>{
        return !!m.value
      }).forEach((n) =>{
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

<style scoped lang="scss">
// 图标
.icon-box {
  width: 100%;
  display: flex;
  align-items: center;

  .icon-common {
    width: 24px;
    height: 24px;
    margin: 0 12px 12px 0;
    cursor: pointer;
  }
}

// 标签
.tag-box {
  .el-tag {
    margin-right: 12px;
  }
}

// 表格 与 分页
.page-common{
  display: flex;
  flex-direction: column;
}
.table-common {
  width: 100%;
  flex: 1;
  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 50px;
  }
}
.page-wrapper{
    user-select: none;
}
.btn-box {
  margin-bottom: 12px;

  .common-btn {
    margin-left: 12px;
  }
}
</style>

