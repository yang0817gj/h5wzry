<template>
    <div class="about">
        <h2>{{id ? '编辑' : '新增'}}英雄</h2>
        <el-form :model="model" class="demo-form-inline" label-position="left" label-width="100px">
            <el-tabs value="b" type="border-card">
                <el-tab-pane  label="基础信息">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :headers="uploadsHeaders()"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="model.avater" :src="model.avater" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option
                                v-for="item in category"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate
                            style="margin-top:0.6rem"
                            :max="9"
                            show-score
                            v-model="model.scores.difficult"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate
                            style="margin-top:0.6rem"
                            :max="9"
                            show-score
                            v-model="model.scores.skills"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate
                            style="margin-top:0.6rem"
                            :max="9"
                            show-score
                            v-model="model.scores.attack"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate
                            style="margin-top:0.6rem"
                            :max="9"
                            show-score
                            v-model="model.scores.survive"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>

                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能信息" name="b">
                    <el-button size="small" style="margin:1rem 0;" @click="model.skills.push({})"><i class="el-icon-plus"></i> 添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap;">
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form :model="item"  label-width="80px">
                                <el-form-item label="名称">
                                    <el-input v-model="item.name"></el-input>
                                </el-form-item>
                                <el-form-item label="icon">
                                    <el-upload
                                        class="avatar-uploader"
                                        :action="$http.defaults.baseURL + '/upload'"
                                        :show-file-list="false"
                                        :headers="uploadsHeaders()"
                                        :on-success="res => $set(item, 'icon', res.url)"
                                    >
                                        <img v-if="item.icon" :src="item.icon" class="avatar" />
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <el-input type="textarea" v-model="item.description"></el-input>
                                </el-form-item>
                                <el-form-item label="提示">
                                    <el-input type="textarea" v-model="item.tips"></el-input>
                                </el-form-item>
                                <el-form-item >
                                    <el-button type="danger" @click="model.skills.splice(i,1)" size="small">删除</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

            <el-form-item style="margin-top:1rem;">
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
                scores: {},
                skills: []
            },
            category: "", // 英雄分类
            items: "" // 装备数组
        };
    },
    methods: {
        async onSubmit() {
            let res;
            if (this.id) {
                res = await this.$http.put(
                    `/rest/heros/${this.id}`,
                    this.model
                );
            } else {
                res = await this.$http.post("/rest/heros", this.model);
            }
            this.$router.push({
                path: "/heros/list"
            });
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fatch() {
            const res = await this.$http.get(`/rest/heros/${this.id}`);
            this.model = Object.assign({}, this.model, res.data);
        },
        async fatchCategory() {
            const res = await this.$http.get(`/rest/categories`);
            this.category = res.data;
        },
        async fatchItems() {
            const res = await this.$http.get(`/rest/items`);
            this.items = res.data;
        },
        handleAvatarSuccess(res) {
            this.$set(this.model, "avater", res.url);
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
        this.fatchCategory();
        this.fatchItems();
        this.id && this.fatch();
    }
};
</script>

<style lang="scss">
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.avatar {
    width: 5rem;
    height: 5rem;
    display: block;
}
</style>