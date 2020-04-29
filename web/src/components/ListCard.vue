<template >
    <div class="card">
        <div class="card-header d-flex ai-center">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <span class="flex-grow-1" style="font-size:1.2308rem; padding-left:0.4615rem">{{title}}</span>
            <i class="iconfont icon-dian"></i>
        </div>
        <div class="card-body">
            <div class="nav">
                <div class="nav-item " :class="{active: active == i}" @click="active = i" v-for="(m,i) in categories" :key="i">
                    <div class="nav-link">{{m.name}}</div>
                </div>
            </div>
            <div style="padding-top:0.7692rem;">
                <swiper>
                    <swiper-slide v-for="(m,i) in categories" :key="i">
                        <slot name="category" :items="m"></slot>
                    </swiper-slide>
                </swiper>
            </div>
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
        },
        categories: {
            type: Array
        }
    },
    data() {
        return {
            active: 0
        };
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