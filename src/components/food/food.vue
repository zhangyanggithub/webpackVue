<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="foodWrapper">
            <div class="food-content">
                <div class="img-header">
                    <img :src="food.image" alt="food.image">
                    <div class="back" @click="backToFood">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <div class="title-content border-1px">
                        <h1>{{food.name}}</h1>
                        <div class="desc">
                            <span class="sale-count">月售{{food.sellCount}}份</span>
                            <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="buy">
                            <span class="now-price">¥{{food.price}}</span>
                            <span class="old-price">¥{{food.oldPrice}}</span>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol @add="addFood" :food="food" v-show="food.count>0"></cartcontrol>
                            </div>
                            <transition name="fade">
                                <div class="add-cart" v-show="!food.count||food.count===0"
                                     @click.stop.prevent="addFirst">加入购物车
                                </div>
                            </transition>
                        </div>
                    </div>
                    <split v-show="food.info"></split>
                    <div class="introduction">
                        <div class="detail" v-show="food.info">
                            <h1>商品介绍</h1>
                            <p class="text">{{food.info}}</p>
                        </div>
                    </div>
                    <split></split>
                    <div class="rating">
                        <h1 class="title">商品评价</h1>
                        <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
                                      :ratings="food.ratings"></ratingSelect>
                    </div>
                    <div class="evaluate">

                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import split from '../../components/split/split.vue';
    import ratingSelect from '../../components/ratingSelect/ratingSelect.vue';
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';

    const ALL = 2;
    export default {
        data () {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addFood () {
                this.$emit('add', event.target);
            },
            addFirst (event) {
                if (!event._constructed) {
                    return;
                }
                this.$emit('add', event.target);
                Vue.set(this.food, 'count', 1);
            },
            show () {
                this.showFlag = true;
                this.selectType = true;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.foodWrapper, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            backToFood () {
                this.showFlag = false;
            }
        },
        components: {
            cartcontrol,
            split,
            ratingSelect
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .food
        position: fixed
        top: 0
        left: 0
        bottom: 48px
        width: 100%
        background-color: #FFFFFF
        &.move-enter-active, &.move-leave-active
            transition: all 0.3s ease
        &.move-enter, &.move-leave-active
            transform: translateX(100%)
        .food-content
            .img-header
                position: relative
                height: 0
                width: 100%
                padding-top: 100%
                img
                    position: absolute
                    top: 0
                    left: 0
                    width: 100%
                    height: 100%
                .back
                    position: absolute
                    top: 10px
                    left: 0
                    padding: 10px
                    width: 20px
                    height: 20px
                    i
                        display: block
                        padding: 10px
                        font-size: 20px
                        &::before
                            color: white
            .content
                .title-content
                    padding: 18px 18px 16px 18px
                    h1
                        font-zise: 14px
                        font-weight: 700
                        color: rgb(7, 17, 27)
                        line-height: 14px
                    .desc
                        color: rgb(147, 153, 159)
                        font-size: 10px
                        line-height: 10px
                        margin: 8px 0 18px 0
                        .sale-count
                            margin-right: 12px
                    .buy
                        position: relative
                        .now-price
                            font-size: 10px / 14px
                            font-weight: normal / 700
                            color: rgb(240, 20, 20)
                            line-height: 24px
                        .old-price
                            font-size: 10px
                            font-weight: normal / 700
                            color: rgb(147, 153, 159)
                            line-height: 24px
                            text-decoration: line-through
                        .add-cart
                            color: #FFF
                            background-color: rgb(0, 160, 220)
                            padding: 6px 12px
                            text-align: center
                            width: 74px
                            border-radius: 24px
                            &.fade-enter-active, &.fade-leave-active
                                transition: all 0.5s ease
                            &.fade-enter, &.fade-leave-active
                                opacity: 0
                        .add-cart, .cartcontrol-wrapper
                            position: absolute
                            top: 0
                            right: 20px
                            font-size: 10px
                            line-height: 12px
                            border-radius: 24px

                .introduction
                    .detail
                        padding: 18px
                        h1
                            font-zise: 14px
                            font-weight: 200
                            color: rgb(7, 17, 27)
                            line-height: 14px
                        .text
                            padding: 6px 8px 0 8px
                            font-size: 12px
                            font-weight: 200
                            color: rgb(77, 85, 93)
                            line-height: 24px


                .rating
                    padding-top:18px
                    .title
                        padding-top:18px
                        font-zise: 14px
                        font-weight: 200
                        color: rgb(7, 17, 27)
                        line-height: 14px
</style>
