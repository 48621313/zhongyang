<template>
  <div class="app-container home">
    <!-- 按钮 -->
    <div class="btn-box">
      <el-button class="common-btn" type="primary" @click="sendMessage">主要按钮</el-button>
      <el-button class="common-btn" type="primary" @click="dialogVisible = true">主要按钮</el-button>
    </div>
    <!-- 图标 -->
    <div class="icon-box">
      <el-image class="icon-common" :src="i.url" fit="fill" v-for="i in icon_arr" :key="i.url"></el-image>
    </div>
    <!-- 表单 -->
    <div class="form-box">

    </div>
    <!-- 标签 -->
    <div class="tag-box">
      <el-tag>标签一</el-tag>
      <el-tag type="success">标签二</el-tag>
      <el-tag type="info" closable>标签三</el-tag>
      <el-tag type="warning" closable>标签四</el-tag>
      <el-tag type="danger" closable>标签五</el-tag>
    </div>
    <!-- 表格 -->
    <div class="table-common">
      <el-table :data="tableData" max-height="100%" height="300px">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="table-btn">编辑</el-button>
            <el-button class="table-btn">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="page.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
      </div>
    </div>
    <!-- 进度条 -->
    <Progress title="滑动缩放" />
    <!-- 弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button class="dialog-btn" @click="dialogVisible = false">取 消</el-button>
        <el-button class="dialog-btn" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Progress from '@/views/components/progress/index.vue'
export default {
  name: "Index",
  components: {
    Progress
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
      tableData: [
        { aa: '111', bb: '111', cc: '111', dd: '111' },
        { aa: '111', bb: '111', cc: '111', dd: '111' },
        { aa: '111', bb: '111', cc: '111', dd: '111' }
      ],
      page: {
        currentPage: 1,
        total: 0
      },
      // 弹窗
      dialogVisible: false,
    };
  },
  methods: {
    sendMessage() {
      this.$message({ message: '测试', type: 'success', duration: 5000 });
      // this.$message('测试');
      // this.$message({ message: '测试', type: 'warning'});
      // this.$message({ message: '测试', type: 'error'});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose() {},
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
.table-common {
  width: 100%;

  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 50px;
  }
}

.btn-box {
  margin-bottom: 12px;

  .common-btn {
    margin-left: 12px;
  }
}
</style>

