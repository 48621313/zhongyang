<template>
    <!-- 先择手机 -->
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
                        <el-button class="cm-btn" type="primary" @click="addOrUpdate">添加视频</el-button>
                    </div>
                </div>
                <!-- 表格 -->
                <div class="table-common">
                    <Table ref="table" :columns="columns" :data="loadData" @selectChange="selectChange" showPagination>
                        <template v-slot:action>
                            <el-button class="tb-ac-btn" type="text">
                                修改
                            </el-button>
                            <el-button class="tb-ac-btn" type="text">
                                删除
                            </el-button>
                            <el-button class="tb-ac-btn" type="text">
                                发布
                            </el-button>
                            <el-button class="tb-ac-btn" type="text">
                                状态
                            </el-button>
                            <el-button class="tb-ac-btn" type="text">
                                预览
                            </el-button>
                        </template>
                    </Table>
                </div>
            </div>
            <!-- 进度条 -->
            <DialogCustom :config="dialogConfig" :visible.sync="dialogConfig.visible">
                <Form :queryList="formList"></Form>
            </DialogCustom>
        </div>
    </div>
</template>
  
<script>
import Table from '@/components/Table/index.vue'
import DialogCustom from '@/components/DialogCustom/index.vue'
import Form from '@/components/Form/index.vue'
import { listDbTable } from "@/api/tool/gen";
const columns = [
    { label: '标题', dataIndex: 'aa', width: 200, ellipsis: true },
    { label: '简介', dataIndex: 'bb', width: 200, ellipsis: true },
    { label: '标签', dataIndex: 'cc', ellipsis: true },
    { label: '选择', dataIndex: 'dd', width: 200, ellipsis: true },
    { label: '操作', dataIndex: 'ee', width: 300, ellipsis: true, slot: 'action' },
]
export default {
    name: "PreferenceMobile",
    components: {
        Table,
        Form,
        DialogCustom,
    },
    data() {
        return {
            // 表格
            columns,
            queryList: [
                { label: '标题', type: 'input', key: 'bb', value: undefined },
                { label: '简介', type: 'input', key: 'cc', value: undefined },
            ],
            formList: [
                { label: '名称', type: 'input', key: 'cc', value: undefined },
                { label: 'IP', type: 'input', key: 'cc', value: undefined },
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
        // 增改...
        addOrUpdate() { },
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
  
  