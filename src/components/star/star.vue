<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass , index) in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    const LENGTH = 5;
    const STAR_ON = 'on';
    const STAR_HALF = 'half';
    const STAR_OFF = 'off';

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType () {
                return 'star-' + this.size;
            },
            itemClasses () {
                let starInteger = parseInt(this.score);
                let starFloat = this.score - starInteger;
                let moreThanHalf = starFloat >= 0.5;
                let halfStar = 0;
                let starOff = 0;
                let starResult = [];
                moreThanHalf ? halfStar = 1 : halfStar = 0;
                starOff = LENGTH - starInteger - moreThanHalf;
                for (let i = 0; i < starInteger; i++) {
                    starResult.push(STAR_ON);
                }
                for (let j = 0; j < halfStar; j++) {
                    starResult.push(STAR_HALF);
                }
                for (let k = 0; k < starOff; k++) {
                    starResult.push(STAR_OFF);
                }
                return starResult;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .star
        font-size: 0
        .star-item
            display: inline-block
        &.star-48
            .star-item
                width: 20px
                height: 20px
                margin-right: 22px
                background-size 20px 20px!important
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        &.star-36
            .star-item
                width: 15px
                height: 15px
                margin-right: 6px
                background-size 15px 15px!important
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
        &.star-24
            .star-item
                width: 10px
                height: 10px
                margin-right: 3px
                background-size 10px 10px!important
                &:last-child
                    margin-right: 0
                &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')

</style>
