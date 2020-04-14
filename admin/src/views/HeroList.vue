<template>
    <div>
        <el-table :data="model" style="width: 100%">
            <el-table-column prop="_id" label="id"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="avater" label="avater">
                <template v-slot="scope">
                    <div style="width:50px">
                        <img style="width:100%" v-if="scope.row.avater" :src="scope.row.avater" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="$router.push(
                        `/heros/edit/${scope.row._id}`
                    )"
                        type="text"
                        size="small"
                    >编辑</el-button>
                    <el-button @click="handleDelete(scope.row._id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: []
        };
    },
    mounted() {
        this.fatch();
    },
    methods: {
        async fatch() {
            const res = await this.$http.get("/rest/heros");
            console.log(res);
            this.model = res.data;
        },
        // 删除操作
        handleDelete(id) {
            this.$confirm("是否删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                const res = await this.$http.delete(`/rest/heros/${id}`);
                console.log(res);
                this.fatch();
            });
        },

        // 编辑操作
        handleSave(id) {}
    }
};
</script>