<template>
    <div>
        <div class="tabBar bg-black text-white d-flex ai-center">
            <img src="../assets/logo.png" height="30" />
            <div style="margin-left:0.7692rem;" class="flex-grow-1">
                <div class="text-white fz-sm">王者荣耀</div>
                <div class="text-grey fz-xs">团队成就更多</div>
            </div>
            <button class="bg-primary btn up-btn" type="button">立即下载</button>
        </div>
        <div class="bg-primary" style="padding:0.6154rem 0 6px 0">
            <div class="nav d-flex jc-around text-white">
                <div class="nav-item active">
                    <router-link tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
.tabBar {
    padding: 0.7692rem 1.5385rem;
    position: sticky;
    top: 0;
    z-index: 999;
}
.up-btn {
    padding: 0.3077rem 0.6154rem;
}
.nav-item {
    padding-bottom: 0.1538rem;
    border-bottom: 0.2308rem solid transparent;
    &.active {
        border-bottom: 0.2308rem solid #fff;
    }
}
</style>
