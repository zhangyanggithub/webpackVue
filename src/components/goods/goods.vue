<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="border-1px menu-item menu-item-hook"
                    :class="{'active-menu':index==currentIndex}" @click="clickMenu(index,$event)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list  food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="(food,index) in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="description">{{food.description}}</p>
                                <span class="sellCount">月售{{food.sellCount}}份</span>
                                <span class="rate">好评率{{food.rating}}%</span>
                                <div class="price-buy">
                                    <span class="now-price">¥{{food.price}}</span>
                                    <span class="old-price" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart></shopcart>
    </div>
</template>

<script type="text/ecmascript-6">
    import BSroll from 'better-scroll';
    import shopcart from '../../components/shopcart/shopcart.vue';
    const ERR_OK = 0;
    export default {
        data () {
            return {
                goods: [],
                foodsHeight: [],
                menuHeight: [],
                scrollY: 0
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('/api/goods').then(response => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._caculateHeight();
                    });
                }
            });
        },
        computed: {
            currentIndex () {
                for (let i = 0, iLen = this.foodsHeight.length; i < iLen; i++) {
                    if (this.scrollY < this.foodsHeight[i]) {
                        this.currentIndex = i;
                        return i;
                    }
                }
            }
        },
        methods: {
            clickMenu (index, event) {
                if (!event._constructed) {
                    return;
                }
                let foodsWrapper = this.$refs.foodsWrapper;
                let foodsList = foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodsList[index];
                this.foodsScroll.scrollToElement(el, 100);
            },
            _initScroll () {
                this.menuScroll = new BSroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BSroll(this.$refs.foodsWrapper, {
                    probeType: 3,
                    click: true
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
//                    this._selectMenu();
                });
            },
            _caculateHeight () {
                let foodsWrapper = this.$refs.foodsWrapper;
                let foodsList = foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                for (let i = 0, iLen = foodsList.length; i < iLen; i++) {
                    height += foodsList[i].clientHeight;
                    this.foodsHeight.push(height);
                }
            }
        },
        components: {
            shopcart
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .goods
        position: absolute
        top: 174px
        width: 100%
        bottom: 50px
        display: flex
        overflow: hidden
        .menu-wrapper
            flex: 0 1 80px
            width: 80px
            background-color: rgba(7, 27, 17, 0.1)
            .menu-item
                display table
                height: 54px
                width: 100%
                padding: 0 12px
                line-height: 14px
                border-1px(#999)
                &.active-menu
                    position: relative
                    margin-top: -1px
                    background-color: #FFF
                    color: rgb(240, 20, 20)
                    &:after
                        display: none
                .text
                    display: table-cell
                    vertical-align: middle
                    width: 56px
                    font-size: 12px
                    color: rgba(0, 0, 0, 0.8)
                    .icon
                        display: inline-block
                        vertical-align: top
                        width: 12px
                        height: 12px
                        margin-right: 4px
                        background-size: 12px 12px !important
                        &.decrease
                            bg-image('decrease_3')
                        &.discount
                            bg-image('discount_3')
                        &.guarantee
                            bg-image('guarantee_3')
                        &.special
                            bg-image('special_3')
                        &.invoice
                            bg-image('invoice_3')

        .foods-wrapper
            flex: 1
            .food-list
                .title
                    padding-left: 14px
                    height: 26px
                    line-height: 26px
                    font-size: 12px
                    border-left: 2px solid #d9dde1
                    color: rgb(147, 153, 159)
                    font-weight: normal / 700
                    background-color: #f3f5f7
                .food-item
                    display: flex
                    width: 100%
                    padding: 18px
                    background-color: #FFF
                    border-1px(rgba(7, 17, 27, 0.1))
                    &:last-child
                        border-none()
                    .icon
                        flex: 0 0 57px
                        margin-right: 10px
                    .content
                        felx: 1
                        .name
                            font-size: 14px
                            color: rgb(7, 17, 27)
                            height: 14px
                            line-height: 14px
                        .description, .sellCount, .rate
                            font-size: 10px
                            line-height: 10px
                            color: rgb(147, 153, 159)
                        .description
                            line-height: 15px
                            margin: 8px 0
                        .sellCount
                            margin-right: 10px
                        .price-buy
                            font-weight: normal / 700
                            line-height: 24px
                            .now-price
                                font-size: 14px
                                color: rgb(240, 20, 20)
                                margin-right: 8px
                            .old-price
                                text-decoration: line-through
                                font-size: 10px
                                color: rgb(147, 153, 159)


</style>
