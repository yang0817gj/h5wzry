<template>
    <div class="login-container">
        <el-card header="用户登录" class="login-card">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="handleLogin" native-type="button">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            model: {}
        }
    },
    methods: {
        async handleLogin () {
            const res = await this.$http.post('/login', this.model)
            localStorage.setItem('token', res.data.token)
            this.$router.push({path: '/items/list'})
        }
    },
}
</script>
<style lang="scss" scoped>
    body {
        background: skyblue;
    }
    .login-card {
        width: 40rem;
        margin:10rem auto;
    }
</style>