<template>
    <div class="seller" ref="sellersContent">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <div class="star-wrapper">
                        <star :size="36" :score="seller.score"></star>
                    </div>
                    <span class="text rating-count">({{seller.ratingCount}})</span>
                    <span class="text sell-count">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="min-price">
                        <div class="text">起送价</div>
                        <div>
                            <span class="price">{{seller.minPrice}}</span>
                            <span class="text unit">元</span>
                        </div>
                    </li>
                    <li class="delivery-price">
                        <div class="text">上家配送</div>
                        <div>
                            <span class="price">{{seller.deliveryPrice}}</span>
                            <span class="text unit">元</span>
                        </div>
                    </li>
                    <li class="min-price">
                        <div class="text">平均配送时间</div>
                        <div>
                            <span class="price">{{seller.deliveryTime}}</span>
                            <span class="text unit">分钟</span>
                        </div>
                    </li>
                </ul>
                <div class="favourite" @click="chooseFav" :class="{'active':chooseFavourite}">
                    <i class="icon-favorite"></i>
                    <span class="add">已收藏</span>
                </div>
            </div>
            <split></split>
            <div class="notice">
                <h1 class="title">公告与活动</h1>
                <div class="text">
                    {{seller.bulletin}}
                </div>
                <ul class="notice-list">
                    <li class="support-item" v-for="support in seller.supports">
                        <span class="icon" :class="classMap[support.type]"></span>
                        <span class="text">{{support.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="seller-view">
                <h1 class="title">商家实景</h1>
                <div class="img-wrapper" ref="imgWrapper">
                    <ul class="img-box" ref="imgBox">
                        <li class="img" v-for="pic in seller.pics">
                            <img :src="pic" alt="image" width="120" height="90">
                        </li>
                    </ul>
                </div>

            </div>
            <split></split>
            <div class="seller-infor">
                <h1 class="title">商家信息</h1>
                <ul class="infor-desc">
                    <li class="infor-item" v-for="infor in seller.infos">
                        {{infor}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {saveToLocal, loadFromLocal} from '../../common/js/store.js';
    import BScroll from 'better-scroll';
   // import shopcart from '../../components/shopcart/shopcart.vue';
    import star from '../../components/star/star.vue';
    import split from '../../components/split/split.vue';
    //  import ratingSelect from '../../components/ratingSelect/ratingSelect.vue';

    export default {
        data () {
            return {
                chooseFavourite: (() => {
                    return loadFromLocal(this.seller.id, 'favourite', false);
                })()
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        mounted () {
            this.$nextTick(() => {
                this._initSellerContent();
                this._initPic();
            });
        },
        watch: {
            'seller' () {
                this.$nextTick(() => {
                    this._initSellerContent();
                    this._initPic();
                });
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        methods: {
            chooseFav (e) {
                if (!e._constructed) {
                    return;
                }
                this.chooseFavourite = !this.chooseFavourite;
                saveToLocal(this.seller.id, 'favourite', this.chooseFavourite);
            },
            _initSellerContent () {
                /* eslint-disable no-new */
                new BScroll(this.$refs.sellersContent, {
                    click: true
                });
            },
            _initPic () {
                let width = 120;
                let margin = 6;
                let totalWidth = this.seller.pics.length * (width + margin) - margin;
                this.$refs.imgBox.style.width = totalWidth + 'px';
                new BScroll(this.$refs.imgWrapper, {
                    scrollX: true,
                    eventPassthrough: 'vertical'
                });
            }
        },
        components: {
            star,
            split
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .seller
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .seller-content
            .overview
                padding: 18px
                position: relative
                .title
                    font-size: 14px
                    color: rgb(7, 17, 27)
                    line-height: 14px
                .desc
                    margin: 8px 8px 18px 0;
                    .star-wrapper
                        float: left
                    .text
                        font-size: 10px
                        color: rgb(77, 85, 93)
                        line-height: 18px
                        &.rating-count
                            margin: 0 12px 0 8px
                .remark
                    list-style: none
                    display: flex
                    li
                        text-align: center
                        flex: 1
                        border-right: 1px solid rgba(7, 17, 27, 0.1)
                        &:last-child
                            border-right: none
                        .text
                            font-size: 10px
                            color: rgb(147, 153, 159)
                            line-height: 10px
                            &.unit
                                color: rgb(7, 17, 27)
                        .price
                            font-size: 24px / 10px
                            color: rgb(7, 17, 27)
                            line-height: 24px

                .favourite
                    position: absolute
                    right: 18px
                    top: 18px
                    i
                        text-align: center
                        display: block
                        vertical-align: middle
                        &:before
                            color: rgba(0, 0, 0, 0.8)
                    .add
                        margin-top: 4px
                        font-size: 10px
                        color: rgb(77, 85, 93)
                        line-height: 10px
                    &.active
                        i
                            &:before
                                color: rgb(240, 20, 20)
            .notice
                padding: 18px
                .title
                    font-size: 14px
                    color: rgb(7, 17, 27)
                    line-height: 14px
                .text
                    padding: 8px 12px 16px 12px
                    font-size: 12px
                    font-weight: 200
                    color: rgb(240, 20, 20)
                    line-height: 24px
                .notice-list
                    list-style: none
                    .support-item
                        border-top: 1px solid rgba(7, 17, 27, 0.1)
                        padding: 16px 12px
                        .icon
                            display: inline-block
                            float: left
                            width: 16px
                            height: 16px
                            margin: 0 6px 0 12px
                            background-size 16px 16px !important
                            &.decrease
                                bg-image('decrease_4')
                            &.discount
                                bg-image('discount_4')
                            &.guarantee
                                bg-image('guarantee_4')
                            &.special
                                bg-image('special_4')
                            &.invoice
                                bg-image('invoice_4')
                        .text
                            padding: 16px 12px
                            font-size: 12px
                            font-weight: 200
                            color: rgb(7, 17, 27)
                            line-height: 16px
            .seller-view
                position: relative;
                padding: 18px
                .title
                    font-size: 14px
                    color: rgb(7, 17, 27)
                    line-height: 14px
                .img-wrapper
                    margin: 12px 0 18px 0
                    width: 100%
                    overflow: hidden
                    .img-box
                        .img
                            float: left
                            width: 120px
                            height: 90px
                            margin-right: 6px
                            &:last-child
                                margin: 0

            .seller-infor
                padding: 18px
                .title
                    font-size: 14px
                    color: rgb(7, 17, 27)
                    line-height: 14px
                .infor-desc
                    padding: 16px 12px
                    .infor-item
                        border-top: 1px solid rgba(7, 17, 27, 0.1)
                        padding: 16px 12px
                        font-size: 12px
                        font-weight: 200
                        color: rgb(7, 17, 27)
                        line-height: 16px
</style>
