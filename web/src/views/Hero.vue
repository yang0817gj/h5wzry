<template >
    <div class="page-hero">
        <div class="tabBar bg-black text-white d-flex ai-center">
            <img src="../assets/logo.png" height="30" />
            <div style="margin-left:0.7692rem;" class="flex-grow-1">
                <span class="text-white fz-md" style="margin-right:0.7692rem;">王者荣耀</span>
                <span class="text-white fz-md">攻略战</span>
            </div>
            <router-link tag="span" to="/" class="fz-sm">更多英雄 &gt;</router-link>
        </div>
        <div class="top text-light" v-if="medel" :style="`background-image: url(${medel.banner})`">
            <div class="info d-flex flex-column jc-end">
                <div>{{ medel.title }}</div>
                <h2 style="padding:0.4615rem 0;">{{ medel.name }}</h2>
                <div class="fz-sm">{{ medel.categories.map(v => v.name).join('/')}}</div>
                <div class="d-flex jc-between">
                    <div class="scores d-flex ai-center fz-sm" v-if="medel.scores">
                        <span>难度</span>
                        <span class="badge bg-primary">{{medel.scores.difficult}}</span>
                        <span>技能</span>
                        <span class="badge bg-info">{{medel.scores.difficult}}</span>
                        <span>攻击</span>
                        <span class="badge bg-dark">{{medel.scores.difficult}}</span>
                        <span>生存</span>
                        <span class="badge bg-red">{{medel.scores.difficult}}</span>
                    </div>
                    <router-link to="/" class="fz-xs text-grey" tag="span">皮肤：2 &gt;</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            required: true
        }
    },
    created() {
        this.fetch();
    },
    data() {
        return {
            medel: null
        };
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(`/heroes/${this.id}`);
            this.medel = res.data;
        }
    }
};
</script>

<style lang="scss">
.tabBar {
    padding: 0.6154rem 1.5385rem;
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
.page-hero {
    .top {
        height: 30vh;
        background: #fff no-repeat top center;
        background-size: auto 100%;
        .info {
            width: 100%;
            height: 100%;
            padding: 1.1538rem;
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
        }
        .badge {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            line-height: .95rem;
            text-align: center;
            font-size: 0.7rem;
            border: 1px solid rgba(255, 255, 255, .2);
            border-radius: 50%;
            margin:0 0.5rem;
        }
    }
}
</style>