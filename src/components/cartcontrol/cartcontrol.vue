<template>
    <div class="cart-control">
        <transition name="move">
            <div class="decrease-count control" @click="removeCart($event)" v-show="food.count>0">
                <i class="icon-remove_circle_outline"></i>
            </div>
        </transition>
        <div class="count control" v-show="count>0">{{count}}</div>
        <div class="increase-count control" @click="addCart($event)">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'Vue';
    export default {
        data () {
            return {
                count: 0
            };
        },
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart (event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                    this.count = 1;
                } else {
                    this.count++;
                    Vue.set(this.food, 'count', this.count);
//                    this.food.count = this.count;
                }
                console.log('add  ' + this.food.count);
            },
            removeCart (event) {
                if (!event._constructed) {
                    return;
                }
                this.count--;
                Vue.set(this.food, 'count', this.count);
//                this.food.count = this.count;
                console.log('remove  ' + this.food.count);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cart-control
        .control
            float: left
            padding: 6px
        .decrease-count, .increase-count
            width: 24px
            height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
            i
                &:before
                    color: #00a0dc
        .decrease-count
            &.move-enter-active, &.move-leave-active
                transition: all .5s ease
            &.move-enter, &.move-leave-active
                transform: translateX(25px) rotate(180deg)
                opacity: 0
        .count
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 24px
            margin: 0 6px
            padding: 6px 0


</style>
