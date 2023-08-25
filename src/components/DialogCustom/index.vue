<template>
    <!-- 弹窗 -->
    <!-- :visible.sync="dialogVisible"  :before-close="handleClose" -->
    <el-dialog v-bind="config" :visible.sync="config.visible"
        :class="['dialog-custom', config.cover ? 'contain-cover' : '']" :before-close="handleClose">
        <template slot="title" v-if="config.custom_title">
            <slot name="title"></slot>
        </template>
        <slot></slot>
        <span slot="footer" class="dialog-footer" v-if="!config.hide_foot">
            <el-button class="dialog-btn cancel" @click="handleClose">取 消</el-button>
            <el-button class="dialog-btn confirm" @click="handleOk">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'DialogCustom',
    props: {
        config: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    created() {
        console.log(this.config, 'config');
    },
    methods: {
        handleClose() {
            this.$emit('update:visible', false)
        },
        handleOk() {
            this.$emit('handleOK')
        },
    }
}
</script>
<style lang="scss">
.dialog-custom {
    .el-dialog {
        overflow: hidden;
        border-radius: 16px;
    }

    .el-dialog__header {
        display: flex;
        align-items: center;
        padding: 0 30px;
        height: 60px;
        background-color: #C5DBFF;

        .el-dialog__title {
            font-size: 18px;
            color: #0F1724;
        }

        .el-dialog__headerbtn {
            i {
                font-size: 20px;
                color: #3A78F2;
            }
        }
    }

    .el-dialog__body {
        padding: 40px 50px;
        font-size: 14px;
    }

    .el-dialog__footer {
        padding: 0 50px 40px 0;

        .cancel {
            width: 108px;
            padding: 0;
            border: 1px solid #3A78F2;
            border-radius: 24px;
            height: 48px;
            line-height: 48px;
            font-size: 14px;
            color: #3A78F2;
            background: #FFFFFF;
            box-sizing: border-box;
        }

        .confirm {
            margin-left: 12px;
            width: 108px;
            padding: 0;
            height: 48px;
            line-height: 48px;
            font-size: 14px;
            color: #fff;
            background: #3A78F2;
            border-radius: 24px;
            box-sizing: border-box;
            border-color: #3A78F2;
        }
    }

}

// 内间距清0
.contain-cover {
    .el-dialog__body {
        padding: 0;
    }
}
</style>