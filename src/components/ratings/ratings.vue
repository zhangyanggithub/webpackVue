<template>
    <div class="ratings" ref="ratingsWrapper">
        <div class="rating-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score">
                        <span class="title">服务态度</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.serviceScore"></star>
                        </div>
                        <span class="score-num">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score">
                        <span class="title">商家态度</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.foodScore"></star>
                        </div>
                        <span class="score-num">{{seller.foodScore}}</span>
                    </div>
                    <div class="score">
                        <span class="title">送达时间</span>
                        <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
        </div>
        <split></split>
        <ratingSelect :ratings="ratings"></ratingSelect>
        <div class="rating-wrapper">
            <ul>
                <li v-for="rating in ratings" class="rating-item">
                    <div class="avatar">
                        <img :src="rating.avatar" alt="">
                    </div>
                    <div class="content">
                        <h1 class="name">{{rating.username}}</h1>
                        <div class="star-wrapper">
                            <star :size="24" :score="rating.score"></star>
                            <span class="delivery" v-show="rating.deliveryTime"></span>
                        </div>
                        <div class="text">{{rating.text}}</div>
                        <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                            <span class="icon-thumb_up"></span>
                            <span v-for="recommend in rating.recommend"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!--  <shopcart :selectFoods=""></shopcart>-->
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from '../../components/shopcart/shopcart.vue';
    import star from '../../components/star/star.vue';
    import split from '../../components/split/split.vue';
    import ratingSelect from '../../components/ratingSelect/ratingSelect.vue';
    const ERR_OK = 0;
    export default {
        method: {
            _initRatings () {
                // this.ratinfScroll = new BScroll(this.$refs.ratings, {});
            }
        },
        data () {
            return {
                desc: {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                },
                ratings: []
            };
        },
        created () {
            this.$http.get('/api/ratings').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.ratings = response.data;
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.ratingsWrapper, {
                            click: true
                        });
                    });
                }
            });
        },
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star,
            split,
            ratingSelect,
            shopcart
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .ratings
        position: absolute
        left: 0
        overflow: hidden
        bottom: 0
        top: 174px
        width: 100%
        .rating-content
            .overview
                display: flex
                width: 100%
                padding: 18px 0
                .overview-left
                    flex: 0 0 124px
                    width: 124px
                    border-right: 1px solid rgba(7, 17, 27, 0.1)
                    text-align: center
                    .score
                        font-size: 24px
                        color: rgb(255, 153, 0)
                        line-height: 28px
                    .title
                        margin: 6px 0 8px 0
                        font-size: 12px
                        color: rgb(7, 17, 27)
                        line-height: 12px
                    .rank
                        font-size: 10px
                        color: rgb(255, 153, 0)
                        line-height: 5px
                .overview-right
                    flex: 1
                    padding: 0 27px
                    @media only screen and (max-width: 320px)
                        padding: 0 9px
                    .score
                        margin-bottom: 8px
                        .title
                            display: inline-block
                            float: left
                            font-size: 12px
                            color: rgb(7, 17, 27)
                            line-height: 18px
                        .star-wrapper
                            margin: 0 5px
                            float: left
                        .score-num
                            font-size: 12px
                            color: rgb(255, 153, 0)
                            line-height: 18px
                        .delivery-time
                            margin-left: 12px
                            font-size: 12px
                            color: rgb(147, 153, 159)
                            line-height: 18px


</style>

