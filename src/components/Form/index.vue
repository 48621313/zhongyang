<template>
    <div class="cm-form-box">
        <el-form ref="formRef" :model="model" :rules="rules" v-on="$listeners" :inline="inline" :class="[inline ? 'level' : 'vertical']"
            label-position="right" label-width="70px">
            <el-row :gutter="8">
                <template v-for="i in queryList">
                    <el-col :span="inline ? 6 : 24">
                        <el-form-item :label="`${i.label}:`" :prop="i.key">
                            <!-- :required="i.required" -->
                            <!-- ${i.type === 'input' ? '请输入' : '请选择'}${i.label} -->
                            <!-- 输入框 -->
                            <el-input v-model="model[i.key]" :clearable="i.clear" :placeholder="`请输入${i.label}`"
                                v-if="i.type === 'input'" />
                            <!-- 选择框 -->
                            <el-select v-model="model[i.key]" :clearable="i.clear" :placeholder="`请选择${i.label}`"
                                v-else-if="i.type === 'select'">
                                <el-option v-for="j in i.options" :value="j.value" :key="j.value">{{ j.label }}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </template>
                <template v-if="advanced">
                </template>
                <el-col :span="6" v-if="showSearch">
                    <el-button class="search-btn" type="primary" @click="search">查询</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'Form',
    props: {
        queryList: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        inline: {
            type: Boolean,
            default: false,
        },
        showSearch: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            advanced: false,
            model: {},
            rules: {}
        }
    },
    created() {
        let model = {}
        let rules = {}
        this.queryList.forEach((n) =>{
            model[n.key] = undefined
            rules[n.key] = n.rules 
        })
        console.log(model, rules, 'model');
        this.model = model
        this.rules = rules
        
    },
    methods: {
        search() {
            this.$emit('search')
        },
        // 校验
        validate() {
            this.$refs['formRef'].validate((valid) => {
                if (valid) {
                    this.$emit('correctFrom', this.model)
                } else {
                    console.log('表单验证失败');
                }
            })
        },
        validateField(str) {
            this.$refs.formRef.validateField(str, (msg) => {
                console.log(msg, 'msg');
            })
        },
        clearValidate(props) {
            // props
            this.$refs.formRef.clearValidate()
        },
        resetFields() {
            return this.$refs.formRef.resetFields()
        },
    }
}
</script>
<style lang="scss" scoped>
@import '~./index.scss';
</style>