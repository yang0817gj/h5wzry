<template>
    <div class="about">

        <el-form :inline="true" :model="model" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {}
        };
    },
    methods: {
        async onSubmit() {
            // console.log("submit!");
            const res = await this.$http.post('/categories', this.model)
            // this.$router.push({
            //     path: '/categories/list'
            // })
            console.log(res);
            
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        }
    }
};
</script>