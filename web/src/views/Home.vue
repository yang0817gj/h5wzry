<template>
    <div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide>
                <img class="w-100" src="../assets/1.jpeg" />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/2.jpeg" />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/3.jpeg" />
            </swiper-slide>

            <div class="swiper-pagination swiper-home" slot="pagination"></div>
        </swiper>
        <!-- end of swiper -->
        <div class="nav-icons">
            <div class="d-flex flex-wrap">
                <div class="nav-item">
                    <i class="sprite sprite-news"></i>
                    <div>爆料站</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-story"></i>
                    <div>故事会</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-periphery"></i>
                    <div>周边商城</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-experience"></i>
                    <div>体验服</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-special"></i>
                    <div>新人专区</div>
                </div>
                <div class="nav-item">
                    <i class="sprite sprite-glory"></i>
                    <div>荣耀 传承</div>
                </div>
            </div>
            <div style="padding: 0.7692rem 0; margin-top:0.7692rem; background:#f9f9f9;">
                <i class="sprite sprite-ararw"></i>
                <span style="margin-left:0.3846rem;">展开</span>
            </div>
        </div>
        <!-- end of nav icons -->
        <!--  -->
        <m-list-card title="新闻资讯" icon="menu" :categories="newsCats">
            <template #category="{items}">
                <div v-for="(mm,ii) in items.newsList" :key="ii" style="padding:0.7692rem 0;">
                    <span>[{{mm.categroyName}}]</span>
                    <span>|</span>
                    <span>{{mm.title}}</span>
                    <span>{{mm.date}}</span>
                </div>
            </template>
        </m-list-card>
    </div>
</template>
<script>
export default {
    name: "carrousel",
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: ".swiper-pagination"
                }
                // Some Swiper option/callback...
            },
            newsCats: [
                {
                    name: "热门",
                    newsList: new Array(5).fill({}).map(v => {
                        return {
                            categroyName: "公告",
                            title: "4月28日全服不停机优化公告",
                            date: "04/28"
                        };
                    })
                },
                {
                    name: "新闻",
                    newsList: new Array(5).fill({}).map(v => {
                        return {
                            categroyName: "新闻",
                            title: "4月28日全服不停机优化公告",
                            date: "04/28"
                        };
                    })
                },
                {
                    name: "新闻",
                    newsList: new Array(5).fill({}).map(v => {
                        return {
                            categroyName: "新闻",
                            title: "4月28日全服不停机优化公告",
                            date: "04/28"
                        };
                    })
                },
                {
                    name: "新闻",
                    newsList: new Array(5).fill({}).map(v => {
                        return {
                            categroyName: "新闻",
                            title: "4月28日全服不停机优化公告",
                            date: "04/28"
                        };
                    })
                },
                {
                    name: "新闻",
                    newsList: new Array(5).fill({}).map(v => {
                        return {
                            categroyName: "新闻",
                            title: "4月28日全服不停机优化公告",
                            date: "04/28"
                        };
                    })
                }
            ]
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper;
        }
    },
    mounted() {
        console.log("Current Swiper instance object", this.swiper);
        this.swiper.slideTo(3, 1000, false);
    }
};
</script>

<style lang="scss" >
@import "../style/variables.scss";
.swiper-home {
    text-align: right;
    padding-right: 2.6923rem;
    padding-bottom: 0.7692rem;
    .swiper-pagination-bullet {
        background-color: #fff !important;
        border-radius: 0.1538rem;
        &.swiper-pagination-bullet-active {
            background-color: #4b67af !important;
        }
    }
}
.nav-icons {
    background-color: #fff;
    text-align: center;
    margin-top: 1.1538rem;
    // padding-bottom: 1.5385rem;
    .nav-item {
        width: 25%;
        margin-top: 1.5385rem;
        padding-top: 0.4615rem;
        border-left: 0.0769rem solid #d4d9de;
    }
    .sprite {
        background: url(../assets/index.png) no-repeat 0 0;
        display: inline-block;
        background-size: 375px;
    }
    .sprite-news {
        background-position: 63.546% 15.517%;
        width: 1.7692rem;
        height: 1.5385rem;
    }
    .sprite-story {
        background-position: 90.483% 15.614%;
        width: 1.7692rem;
        height: 1.5385rem;
    }
    .sprite-periphery {
        background-position: 36.746% 0.924%;
        width: 1.4615rem;
        height: 1.6923rem;
    }
    .sprite-experience {
        background-position: 10.408% 15.517%;
        width: 1.5385rem;
        height: 1.5385rem;
    }
    .sprite-special {
        background-position: 89.733% 1.266%;
        width: 20px;
        height: 1.6154rem;
    }
    .sprite-glory {
        background-position: 36.467% 15.287%;
        width: 1.8462rem;
        height: 1.5385rem;
    }
    .sprite-ararw {
        background-position: 38.577% 52.076%;
        width: 0.7692rem;
        height: 0.7692rem;
    }
    .nav-item:nth-child(4n + 1) {
        border-left: none;
    }
}
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