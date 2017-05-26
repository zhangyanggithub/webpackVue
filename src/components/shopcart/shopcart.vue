<template>
    <div>
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="toggleList">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'hasFoods':totalCount!=0}">
                            <i class="icon-shopping_cart"></i>
                        </div>
                        <div class="number" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'select-price':totalCount>0}">¥{{totalPrice}}</div>
                    <div class="desc">另需配送费¥{{deliveryPrice}}</div>
                </div>
                <div class="content-right">
                    <div class="pay" v-show="totalCount==0">¥{{minPrice}}起送</div>
                    <div class="lessThanToDelivery" v-show="lessThanDeliPrice>0">还差¥{{lessThanDeliPrice}}配送</div>
                    <div class="goPay" v-show="totalPrice>=minPrice" @click.stop.prevent="pay">去结算</div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping"
                                @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <transition name="out">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header border-1px">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="contentWrapper">
                        <ul class="list-ul">
                            <li v-for="food in selectFoods" class="foodli border-1px">
                                <span class="name">{{food.name}}</span>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                                <div class="price">
                                    <span>¥{{food.price*food.count}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="mask">
            <div class="list-mask" v-show="listShow" @click="hideMask"></div>
        </transition>
    </div>

</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
    export default {
        data () {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }

                ],
                dropBalls: [],
                fold: true,
                payMoney: 0
            };
        },
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        computed: {
            listShow () {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.contentWrapper, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                     });
                }
                return show;
            },
            totalPrice () {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                this.payMoney = total;
                return total;
            },
            totalCount () {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            lessThanDeliPrice () {
                return this.minPrice - this.totalPrice;
            },
            minPriceShow () {
                return this.lessThanDeliPrice < 0;
            }
        },
        methods: {
            pay () {
                if (this.totalPrice < this.minPrice) {
                    return;
                }
                window.alert(`支付${this.totalPrice}元`);
            },
            hideMask () {
                this.fold = true;
            },
            empty () {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            toggleList () {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            drop (el) {
                // console.log(el);
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        //   console.log('this.dropBalls' + this.dropBalls[0]);
                        return;
                    }
                }
            },
            beforeDrop (el) {
                // console.log('beforeDrop   ' + el.className);
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        //        console.log('rect: ' + rect);
                        //      console.log('rect.left: ' + rect.left);
                        //    console.log('rect.top: ' + rect.top);
                        let x = rect.left - 38;
                        let y = -(window.innerHeight - rect.top - 24);
                        //       console.log('x,y ' + x, y);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3D(0,${y}px,0)`;
                        el.style.transform = `translate3D(0,${y}px,0,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3D(${x}px,0,0)`;
                        inner.style.transform = `translate3D(${x}px,0,0)`;
                    }
                }
            },
            afterDrop (el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            dropping (el, done) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                this.$nextTick(function () {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', done);
                });
            }
        },
        components: {
            cartcontrol
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .shopcart
        position: fixed
        left: 0
        bottom: 0
        z-index: 10
        width: 100%
        height: 48px
        .content
            display: flex
            background-color: #141d27
            position: relative
            z-index: 2
            .content-left
                flex: 1
                font-size: 0
                .logo-wrapper
                    float: left
                    display: inline-block
                    position: relative
                    top: -10px
                    width: 56px
                    height: 56px
                    box-sizing: border-box
                    margin-left: 18px
                    padding: 6px
                    background-color: #141d27
                    border-radius: 50%
                    .logo
                        width: 100%
                        height: 100%
                        background-color: rgb(43, 52, 60)
                        font-size: 24px
                        line-height: 44px
                        text-align: center
                        border-radius: 50%
                        .icon-shopping_cart
                            &:before
                                color: rgb(128, 133, 138)
                        &.hasFoods
                            background-color: #00a0dc
                            .icon-shopping_cart
                                &:before
                                    color: #FFF
                    .number
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-size: 9px
                        fong-weight: 700
                        color: #ffffff
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4)
                        background-color: rgb(240, 20, 20)
                .price
                    float: left
                    font-size: 24px
                    color: rgba(255, 255, 255, 0.4)
                    font-weight: 700
                    line-height: 24px
                    margin: 14px 0
                    padding: 0 12px
                    border-right: 1px solid rgba(255, 255, 255, 0.1)
                    &.select-price
                        color: #ffffff
                        font-size: 24px
                .desc
                    float: left
                    font-size: 12px
                    color: rgba(255, 255, 255, 0.4)
                    line-height: 53px
                    margin-left: 12px
            .content-right
                flex: 0 0 105px
                width: 105px
                font-size: 12px
                color: rgba(255, 255, 255, 0.4)
                background-color: rgb(43, 51, 59)
                text-align: center
                line-height: 53px
                .pay, .lessThanToDelivery, .goPay
                    font-weight: 700
                .goPay
                    background-color: #00b43c
                    color: #FFF
                    font-size: 16px

        .ball-container
            .ball
                position: fixed
                bottom: 24px
                left: 38px
                z-index: 40
                transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width: 16px
                    height: 16px
                    transition: all 1s linear
                    border-radius: 50%
                    background-color: rgb(0, 160, 220)
        .shopcart-list
            position: fixed
            z-index: 1
            bottom: 48px
            left: 0
            width: 100%
            max-height: 241px
            &.out-enter-active, &.out-leave-active
                transition: all 0.5s ease
            &.out-enter, &.out-leave-active
                transform: translateY(100%)
            .list-header
                height: 40px
                background-color: #f3f5f7
                width: 100%
                border-1px(rgba(7, 17, 27, 0.1))
                .title
                    float: left
                    margin-left: 18px
                    font-size: 14px
                    font-weight: 200
                    color: rgb(7, 17, 27)
                    line-height: 40px
                .empty
                    float: right
                    margin-right: 18px
                    font-size: 12px
                    color: rgb(0, 160, 220)
                    line-height: 40px
            .list-content
                .list-ul
                    background-color: #FFF
                    overflow: hidden
                    .foodli
                        width: 100%
                        float: left
                        height: 48px
                        border-1px(rgba(7, 17, 27, 0.1))
                        .name
                            margin-left: 18px
                            line-height: 48px
                            font-size: 14px
                            color: rgb(7, 17, 27)
                        .price
                            float: right
                            line-height: 48px
                            color: rgb(240, 20, 20)
                        .cartcontrol-wrapper
                            float: right
                            margin: 6px 18px 0 12px
                            height: 100%
                        &:after
                            left: 18px

    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 1
        background-color: rgba(7, 17, 27, 0.6)
        backdrop-filter: blur(10px)
        &.mask-enter-active, &.mask-leave-active
            transition: all 0.5s ease
        &.mask-enter, &.mask-leave-active
            opacity: 0
</style>
