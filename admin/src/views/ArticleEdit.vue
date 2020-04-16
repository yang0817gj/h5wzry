<template>
    <div class="about">
        <h2>{{id ? '编辑' : '新增'}}文章</h2>
        <el-form :model="model" class="demo-form-inline" label-position="left" label-width="100px">
            <el-form-item label="上级分类">
                <el-select v-model="model.categories" multiple placeholder="请选择">
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input style="width:300px;" v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor
                    v-model="model.body"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
var _self;
import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";
export default {
    props: {
        id: ""
    },
    components: { VueEditor },
    data() {
        return {
            model: {},
            categories: ""
        };
    },
    methods: {
        async onSubmit() {
            let res;
            if (this.id) {
                res = await this.$http.put(
                    `/rest/articles/${this.id}`,
                    this.model
                );
            } else {
                res = await this.$http.post("/rest/articles", this.model);
            }
            this.$router.push({
                path: "/articles/list"
            });
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fatch() {
            const res = await this.$http.get(`/rest/articles/${this.id}`);
            this.model = res.data;
        },
        async fetchParent() {
            const res = await this.$http.get(`/rest/categories`);
            this.categories = res.data;
        },
        async handleImageAdded(
            file,
            Editor,
            cursorLocation,
            resetUploader
        ) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)
        console.log(this)

            var formData = new FormData();
            formData.append("file", file);
            const result = await this.$http.post('/upload', formData)
            let url = result.data.url; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
        }
    },
    created() {
        this.id && this.fatch();
        this.fetchParent();
        console.log(this)
    }
};
</script>

<style lang="scss" scoped>
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
</style>