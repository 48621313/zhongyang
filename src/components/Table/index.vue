<template>
    <div class="table-wrapper" v-loading="localLoading" ref="tableRef">
        <!-- {...props, } -->
        <el-table ref="tableRealRef" style="width: 100%;" @select-all="checkAll" @select="checkOne" :height="tableHeight"
            :data="localDataSource">
            <template v-for="i in columns">
                <!-- 插槽 -->
                <el-table-column v-if="i.type === 'checkbox'" type="selection" :fixed="i.fixed"
                    :width="i.width"></el-table-column>
                <el-table-column v-else-if="i.slot" :prop="i.dataIndex" :fixed="i.fixed" :label="i.label" :width="i.width">
                    <template slot-scope="{row}">
                        <slot :name="i.slot" :data="row"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-else :prop="i.dataIndex" :label="i.label" :fixed="i.fixed" :width="i.width"
                    :show-overflow-tooltip="i.ellipsis">111</el-table-column>
            </template>
        </el-table>
        <template v-if="showPagination">
            <div class="pagination-box">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="localPagination.pageNum" :page-sizes="[10, 20, 50, 100]"
                    :page-size="localPagination.pageSize" layout="total, prev, pager, next, sizes, jumper"
                    :total="localPagination.total">
                    <!-- total, sizes, prev, pager, next, jumper -->
                </el-pagination>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'Table',
    data() {
        return {
            // 表格高度
            tableHeight: 300,
            // 选择的
            selectedRows: [],
            selectedRowKeys: [],
            // 统计
            needTotalList: [],
            // 数据加载
            localLoading: false,
            localDataSource: [
                { aa: 11, bb: 11, cc: 1 },
                { aa: 11, bb: 11, cc: 1 },
                { aa: 11, bb: 11, cc: 1 },
                { aa: 11, bb: 11, cc: 1 },
                { aa: 11, bb: 11, cc: 1 },
                { aa: 11, bb: 11, cc: 1 },
            ],
            localPagination: { pageSize: 10, pageNum: 1, total: 0 },  // 查询需要
            filters: {},
            sorter: {}
        }
    },
    props: {
        // 尺寸
        size: {
            type: String,
            default: 'default'
        },
        // key
        rowKey: {
            type: [String, Function],
            default: 'key'
        },
        // 数据源
        columns: {
            type: Array,
            required: true
        },
        showPagination: {
            type: Boolean,
            default: true
        },
        data: {
            type: Function,
            required: true
        },
    },
    created() {
        this.loadData()
    },
    watch: {
        selectedRows() {
            this.$emit('selectChange', [this.selectedRows, this.selectedRowKeys])
        },
    },
    updated() {
        this.getTableHeight();
    },
    methods: {
        getTableHeight() {
            let that = this
            this.$nextTick(() => {
                const tableHeight = that.$refs.tableRef.clientHeight - 74
                this.tableHeight = tableHeight
            })
        },
        // 加载后 清空选择
        refresh() {
            console.log(3333);
            this.loadData()
        },
        loadData() {
            this.localLoading = true
            const { pageNum, pageSize } = this.localPagination
            const parameter = { pageNum, pageSize }
            const result = this.data(parameter)
            if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
                result.then(r => {
                    this.localPagination = Object.assign({}, this.localPagination, { pageNum: r.pageNum || 1, total: r.total || 0})
                    if (r.rows.length === 0 && this.showPagination && this.localPagination.pageNum > 1) {
                        this.localPagination.pageNum--
                        this.loadData()
                        return
                    }
                    this.localDataSource = r.rows // 返回结果中的数组数据
                }).catch((err) => {
                    console.log(111, err);
                    this.errorDeal()
                }).finally(() => {
                    this.localLoading = false
                })
            } else {
                console.log(222);
                this.errorDeal()
            }
        },
        // 错误处理
        errorDeal() {
            this.localPagination.pageNum = 1
            this.localDataSource = []
            this.resetSelect()
            this.$message.warning('未知错误-请联系管理员!')
        },
        // 选择框
        resetSelect() {
            this.$refs.tableRealRef.clearSelection()
            this.selectedRows = []
            this.selectedRowKeys = []
        },
        checkOne(selection, row) {
            this.selectedRows = selection
            this.selectedRowKeys = selection.map((n) => {
                return n?.[this.rowKey]
            })
        },
        checkAll(selection) {
            this.selectedRows = selection
            this.selectedRowKeys = selection.map((n) => {
                return n?.[this.rowKey]
            })
        },
        // 分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`, this.localPagination);
            this.localPagination.pageNum = val
            this.loadData()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`, this.localPagination);
            this.localPagination.pageNum = 1
            this.localPagination.pageSize = val
            this.loadData()
        },
    }
}
</script>
<style lang="scss" scoped>
@import '~./index.scss';
</style>