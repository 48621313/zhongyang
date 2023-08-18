<template>
    <!-- 进度条 -->
    <div class="progress-box" >
        <span class="schedule">{{ title }}</span>
        <!-- change input -->
        <el-slider :value="precent" @change="modify" @input="modify"></el-slider>
    </div>
</template>
  
<script>
export default {
    name: "Progress",
    props: {
        precent: { type: Number, default: 0},
        title: { type: String, default: '' },
    },
    data() {
        return {
        };
    },
    methods: {
        modify(e) {
            this.$emit('update:precent', e)
        }
    }
};
</script>
  
<style scoped lang="scss">
@import '~./index.scss'
</style>
  
  