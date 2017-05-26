<template>
    <div class="cart-control">
        <transition name="move">
            <div class="decrease-count control" @click.stop.prevent="decreaseCart" v-show="food.count>0">
                <i class="icon-remove_circle_outline"></i>
            </div>
        </transition>
        <div class="count control" v-show="food.count>0">{{food.count}}</div>
        <div class="increase-count control" @click.stop.prevent="addCart">
            <i class="icon-add_circle"></i>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
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
                } else {
                    this.food.count++;
                }
                this.$emit('add', event.target);
            },
            decreaseCart (event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
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
