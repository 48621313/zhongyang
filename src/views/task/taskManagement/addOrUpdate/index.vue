<template>
    <DialogCustom :config="dialogConfig" :visible.sync="dialogConfig.visible" @handleOK="handleOk">
        <Form ref="Form" :queryList="formList" @correctFrom="correctFrom"></Form>
    </DialogCustom>
</template>
<script>
import DialogCustom from '@/components/DialogCustom/index.vue'
import Form from '@/components/Form/index.vue'
export default {
    components: {
        DialogCustom,
        Form,
    },
    props: {
    },
    watch: {
        'dialogConfig.visible': function (val) {
            if (!val) {
                this.resetForm()
            }
        }
    },
    data() {
        return {
            // 弹窗
            dialogConfig: {
                loading: true,
                visible: false,
                width: '485px',
                title: '新增任务',
            },
            formList: [
                { label: '名称', type: 'input', key: 'cc', required: true, rules: [{ required: true, message: '请输入名称', trigger: 'change' }] },
            ],
        }
    },
    methods: {
        // 提交表单
        handleOk() {
            this.$refs.Form.validate()
        },
        open() {
            this.dialogConfig.visible = true
        },
        correctFrom(valid) {
            this.$router.push({ path: '', query: { name: valid.cc } })
            this.dialogConfig.visible = false
            console.log(valid);
        },
        resetForm() {
            this.$refs.Form.resetFields()
        },
    }
}
</script>