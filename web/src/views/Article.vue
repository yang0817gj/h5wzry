<template>
    <div class="page-article" v-if="medel">
        <div class="d-flex" style="padding: 0 0.6154rem; height:3rem; line-height:3rem;">
            <i @click="handleBack" class="iconfont icon-back" style="padding-right:0.3077rem;"></i>
            <strong
                class="title flex-1 text-info text-ellipsis"
                style="padding-right:0.7692rem;"
            >{{medel.title}}</strong>
            <div class="date text-grey fz-xs">{{medel.createdAt | date}}</div>
        </div>
        <div class="ql-editor fz-lg" v-html="medel.body" style="padding:0 1.4769rem;"></div>
        <div class="footer">
            <div class="title d-flex ai-center">
                <i class="iconfont icon-menu"></i>
                <strong class="fz-lg">相关资讯</strong>
            </div>
            <router-link tag="div" :to="`/articles/${item._id}`" class="d-flex jc-between" style="padding-top: 0.4615rem;" v-for="item in medel.related" :key="item._id">
                <strong class="text-ellipsis" style="width:19.3076rem" >{{item.title}}</strong>
                <div class="date text-grey fz-sm">{{item.createdAt | date}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
export default {
    filters: {
        date(val) {
            return dayjs(val).format("YYYY-MM-DD");
        }
    },
    props: {
        id: {
            required: true
        }
    },
    data() {
        return {
            medel: null
        };
    },
    watch: {
        id () {
            this.handleGetDetails()
        }
    },
    created() {
        this.handleGetDetails();
    },
    methods: {
        async handleGetDetails() {
            const res = await this.$http.get(`articles/${this.id}`);
            this.medel = res.data;
            console.log(res.data);
        },
        handleBack() {
            this.$router.push({
                path: "/"
            });
        }
    }
};
</script>

<style lang="scss">
.page-article {
    img {
        max-width: 100%;
        height: auto;
    }
    .footer {
        padding: 1.5385rem 1.4769rem;
        padding-top: 1.5385rem;
        i {
            margin-right: 0.4616rem;
        }
    }
}
</style>