<template>
    <div class="about">
        <h2>{{id ? '编辑' : '修改'}}分类</h2>
        <el-form :model="model" class="demo-form-inline" label-position="left" label-width="100px">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent" placeholder="请选择">
                    <el-option
                        v-for="item in parentOptions"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input style="width:300px;" v-model="model.name"></el-input>
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
                    `/categories/${this.id}`,
                    this.model
                );
            } else {
                res = await this.$http.post("/categories", this.model);
            }
            this.$router.push({
                path: "/CategoryList"
            });
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fatch() {
            const res = await this.$http.get(`/categories/${this.id}`);
            this.model = res.data;
        },
        async fetchParent() {
            const res = await this.$http.get(`/categories`);
            this.parentOptions = res.data;
            console.log(this.parentOptions);
        }
    },
    created() {
        this.id && this.fatch();
        this.fetchParent();
    }
};
</script>