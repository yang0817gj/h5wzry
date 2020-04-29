<template >
    <div class="card">
        <div class="card-header d-flex ai-center">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <span class="flex-grow-1" style="font-size:1.2308rem; padding-left:0.4615rem">{{title}}</span>
            <i class="iconfont icon-dian"></i>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        icon: {
            type: String
        }
    }
};
</script>

<style lang="scss">
@import "../style/variables.scss";
.card {
    margin-top: 1.1538rem;
    padding: 1.1538rem;
    background: #fff;
    .nav {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5385rem;
        .nav-item {
            color: map-get($map: $colors, $key: "dark");
            border-bottom: 0.2308rem solid transparent;
            &.active {
                color: map-get($map: $colors, $key: "primary");
                border-bottom: 0.2308rem solid
                    map-get($map: $colors, $key: "primary");
            }
        }
    }
}
</style>