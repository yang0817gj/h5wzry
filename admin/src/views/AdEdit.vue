<template>
    <div class="about">
        <h2>{{id ? '编辑' : '新增'}}广告位</h2>
        <el-form :model="model" class="demo-form-inline" label-position="left" label-width="100px">
            <el-form-item label="名称">
                <el-input style="width:300px;" v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" style="margin:1rem 0;" @click="model.items.push({})">
                    <i class="el-icon-plus"></i> 添加幻灯片
                </el-button>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-col :md="24" v-for="(item,i) in model.items" :key="i">
                        <el-form :model="item" label-width="80px">
                            <el-form-item label="URL">
                                <el-input v-model="item.url"></el-input>
                            </el-form-item>
                            <el-form-item label="幻灯片" style="margin-top:1rem">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :headers="uploadsHeaders()"
                                    :on-success="res => $set(item, 'iamges', res.url)"
                                >
                                    <img v-if="item.iamges" :src="item.iamges" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item style="margin-bottom:1rem">
                                <el-button
                                    type="danger"
                                    @click="model.items.splice(i,1)"
                                    size="small"
                                >删除</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
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
            model: {
                items: []
            }
        };
    },
    methods: {
        async onSubmit() {
            let res;
            if (this.id) {
                res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
            } else {
                res = await this.$http.post("/rest/ads", this.model);
            }
            this.$router.push({
                path: "/ads/list"
            });
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fatch() {
            const res = await this.$http.get(`/rest/ads/${this.id}`);
            this.model = res.data;
        }
    },
    created() {
        this.id && this.fatch();
    }
};
</script><style lang="scss">
.el-input,.el-textarea {
    width: 400px;
}
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
    min-width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
}
</style>