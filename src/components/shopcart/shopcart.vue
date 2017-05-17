<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'hasFoods':totalCount!=0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <div class="number" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'select-price':totalCount>0}">¥{{totalPrice}}</div>
                <div class="desc" v-show="lessThanDeliPrice>=0">另需配送费¥{{deliveryPrice}}</div>
            </div>
            <div class="content-right">
                <div class="pay" v-show="totalCount==0">¥{{minPrice}}起送</div>
                <div class="lessThanToDelivery" v-show="lessThanDeliPrice>0">还差¥{{lessThanDeliPrice}}配送</div>
                <div class="goPay" v-show="totalPrice>=minPrice">去结算</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
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
            totalPrice () {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
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
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
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


</style>
