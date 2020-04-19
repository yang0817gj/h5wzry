<template>
    <div class="about">
        <h2>{{id ? '编辑' : '新增'}}分类</h2>
        <el-form :model="model" class="demo-form-inline" label-position="left" label-width="100px">
            <el-form-item label="名称">
                <el-input style="width:600px;" v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :headers="uploadsHeaders()"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            model: {}
        };
    },
    methods: {
        async onSubmit() {
            let res;
            if (this.id) {
                res = await this.$http.put(
                    `/rest/items/${this.id}`,
                    this.model
                );
            } else {
                res = await this.$http.post("/rest/items", this.model);
            }
            this.$router.push({
                path: "/items/list"
            });
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fatch() {
            const res = await this.$http.get(`/rest/items/${this.id}`);
            this.model = res.data;
        },
        handleAvatarSuccess(res) {
            this.$set(this.model, 'icon', res.url)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        }
    },
    created() {
        this.id && this.fatch();
    }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>