<template>
    <div class="about">
        <h2>{{id ? '编辑' : '新增'}}管理员</h2>
        <el-form :model="model" class="demo-form-inline" label-position="left" label-width="100px">
            
            <el-form-item label="用户名">
                <el-input style="width:300px;" v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input  style="width:300px;" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: ""
    },
    data() {
        return {
            model: {},
            parentOptions: ""
        };
    },
    methods: {
        async onSubmit() {
            let res;
            if (this.id) {
                res = await this.$http.put(
                    `/rest/admin_users/${this.id}`,
                    this.model
                );
            } else {
                res = await this.$http.post("/rest/admin_users", this.model);
            }
            this.$router.push({
                path: "/admin_users/list"
            });
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fatch() {
            const res = await this.$http.get(`/rest/admin_users/${this.id}`);
            this.model = res.data;
        },
        
    },
    created() {
        this.id && this.fatch();
    }
};
</script>