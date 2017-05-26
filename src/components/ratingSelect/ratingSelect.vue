<template>
    <div class="ratingSelect">
        <div class="rating-type">
            <div class="type-content">
                <span class="block all" :class="{'active':allActive}" @click="selectAll">{{desc.all}}</span>
                <span class="block positive" :class="{'active':positiveActive}" @click="selectPositive">{{desc.positive}}</span>
                <span class="block negative" :class="{'active':negativeActive}"
                      @click="selectActive">{{desc.negative}}</span>
            </div>

        </div>
        <div class="switch" @click="selectContent">
            <span class="look-all" :class="{'only-look-content':lookContent}">
                <i class="icon-check_circle"></i>
            </span>
            <span class="text">只看有内容的评价</span>
        </div>
        <div class="ratings-list">
            <ul v-show="ratings && ratings.length">
                <li class="rating-li" v-for="rating in ratings" v-show="selectItem(rating.rateType,rating.text)">
                    <div class="time">{{ratingTime(rating.rateTime)}}</div>
                    <div class="user">
                        <span class="username">{{rating.username}}</span>
                        <span class="user-icon">
                            <img :src="rating.avatar" alt="" width="12" height="12">
                        </span>
                    </div>
                    <span class="icon" v-show="rating.rateType==0">
                        <i class="icon-thumb_up"></i>
                    </span>
                    <span class="icon" v-show="rating.rateType==1">
                        <i class="icon-thumb_down"></i>
                    </span>
                    <span class="text">{{rating.text}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    const ONLYCONTENT = 3;
    export default {
        data () {
            return {
                selectedType: ALL,
                lookContent: false,
                negative: false,
                allActive: true,
                positiveActive: false,
                negativeActive: true
            };
        },
        methods: {
            selectItem (rateType, text) {
                if (this.selectedType === ALL) {
                    this.allActive = true;
                    this.lookContent = this.positiveActive = this.negativeActive = false;
                    return true;
                } else if (this.selectedType === POSITIVE) {
                    this.positiveActive = true;
                    this.lookContent = false;
                    this.allActive = false;
                    this.negativeActive = false;
                    return rateType === POSITIVE;
                } else if (this.selectedType === NEGATIVE) {
                    this.lookContent = false;
                    this.allActive = false;
                    this.positiveActive = false;
                    this.negativeActive = true;
                    return rateType === NEGATIVE;
                } else if (this.selectedType === ONLYCONTENT) {
                    this.lookContent = true;
                    return text !== '';
                }
            },
            selectContent () {
                this.selectedType = ONLYCONTENT;
            },
            selectAll () {
                this.selectedType = ALL;
            },
            selectPositive () {
                this.selectedType = POSITIVE;
            },
            selectActive () {
                this.selectedType = NEGATIVE;
            },
            ratingTime (time) {
                let date = new Date(time);
                let year = this.formatTime(date.getFullYear());
                let month = this.formatTime(date.getMonth());
                let day = this.formatTime(date.getDay());
                let hour = this.formatTime(date.getHours());
                let minute = this.formatTime(date.getMinutes());
                let second = this.formatTime(date.getSeconds());
                let detailTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                return detailTime;
            },
            formatTime (time) {
                if (time < 10) {
                    return '0' + time;
                } else {
                    return time;
                }
            }
        },
        props: {
            ratings: {
                type: Array,
                default () {
                    return [];
                }
            },
            /* selectedType: {
             type: Number,
             default: ALL
             }, */
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default () {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .ratingSelect
        .rating-type
            .type-content
                border-1px(rgba(7, 17, 27, 0.1))
                margin: 0 18px
                padding: 18px 0
                .block
                    dispaly: inline-block
                    font-size: 12px
                    line-height: 16px
                    padding: 8px 10px
                    margin-right: 8px
                    border-radius: 2px
                .all, .positive
                    color: rgb(77, 85, 93)
                    background-color: rgb(204, 236, 248)
                    &.active
                        color: #FFFFFF
                        background-color: #00A0DC
                .negative
                    color: rgb(77, 85, 93)
                    background-color: rgb(233, 235, 236)
                    &.active
                        color: #FFFFFF
                        background-color: #aeb0b1
        .switch
            padding: 12px 18px
            border-1px(rgba(7, 17, 27, 0.1))
            .look-all
                i
                    vertical-align: middle
                i
                    &:before
                        color: #aeb0b1
            .only-look-content
                i
                    &:before
                        color: rgb(31, 201, 89)
            .text
                font-size: 12px
                line-height: 24px
                color: rgb(147, 153, 159)
        .ratings-list
            padding: 16px 18px
            .rating-li
                padding: 16px 0
                border-1px(rgba(7, 17, 27, 0.1))
                .icon
                    i
                        vertical-align: middle
                    i.icon-thumb_up
                        &:before
                            color: #00A0DC
                    i.icon-thumb_down
                        &:before
                            color: rgb(147, 153, 159)

                .time
                    font-size: 10px
                    line-height: 12px
                    margin-bottom: 6px
                    color: rgb(147, 153, 159)
                .text
                    font-size: 12px
                    color: rgb(7, 17, 27)
                    line-height: 16px
                .user
                    float: right
                    height: 14px
                    .username
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        line-height: 12px
                    .user-icon
                        img
                            border-radius: 50%


</style>
