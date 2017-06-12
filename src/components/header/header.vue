<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <div class="brand"></div>
                    <div class="name">{{seller.name}}</div>
                </div>
                <div class="description">
                    <span>{{seller.description}}/{{seller.deliveryTime}}小时送达</span>
                </div>
                <div v-if="seller.supports" class="support">
                    <div class="icon" :class="classMap[seller.supports[1].type]"></div>
                    <span class="text">{{seller.supports[2].description}}</span>
                </div>
            </div>
            <div @click="detailShow=true" v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="detailShow=true">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="background" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div v-if="seller.supports" class="supports">
                            <ul>
                                <li class="support-item" v-for="support in seller.supports">
                                    <span class="icon" :class="classMap[support.type]"></span>
                                    <div class="text">{{support.description}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="detail-close" @click="detailShow=false">
                    <i class="icon-close"></i>
                </div>
                <!-- <div class="background">
                     <img :src="seller.avatar" alt="background" width="100%" height="100%">
                 </div>-->
            </div>
        </transition>

    </div>
</template>
<script type="text/ecmascript-6">
    import star from '../star/star.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                'detailShow': false
            };
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            star
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';
    .header
        position: relative
        overflow: hidden
        color: #FFF
        background-color: rgba(7, 17, 27, 0.5)
        .content-wrapper
            position: relative
            overflow: hidden
            padding: 24px 12px 18px 12px
            font-size: 0
            .avatar
                overflow: hidden
                border-radius: 2px
                float: left
            .content
                margin: 2px 0 0 16px
                float: left
                .title
                    overflow: hidden
                    .brand
                        float: left
                        width: 30px
                        height: 18px
                        bg-image('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    .name
                        margin-left: 6px
                        float: left
                        font-size 16px
                        font-weight bold
                        line-height: 18px
                .description
                    margin: 8px 0 10px 0
                    font-size 12px
                    font-weight 200
                    line-height: 12px
                .support
                    .icon
                        float: left
                        width: 12px
                        height: 12px
                        background-size: 12px 12px !important
                        background-repeat: no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        float: left
                        margin-left: 4px
                        font-size: 10px
                        font-weight: 200
                        line-height: 12px
            .support-count
                position: absolute
                bottom: 18px
                right: 12px
                padding: 0 8px
                height: 24px
                line-height: 24px
                background-color: rgba(0, 0, 0, 0.2)
                border-radius: 8px
                text-align: center
                .count
                    vertical-align: top
                    font-size: 10px
                .icon-keyboard_arrow_right
                    margin-left: 2px
                    font-size: 10px
                    line-height: 24px
                    &:before
                        color: #FFF

        .bulletin-wrapper
            position: relative
            height: 28px
            line-height 28px
            padding: 0 22px 0 12px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            background-color: rgba(7, 17, 27, 0.2)
            .bulletin-title
                display: inline-block
                vertical-align: top
                margin-top: 8px
                width: 22px
                height: 12px
                bg-image('bulletin')
                background-size: 22px 12px
            .bulletin-text
                vertical-align: top
                margin: 0 4px
                font-size: 10px
                font-weight: 200
            .icon-keyboard_arrow_right
                position: absolute
                font-size: 10px
                right: 20px
                top: 8px
                &:before
                    color: #FFF
        .background
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1
            filter: blur(10px)

        .detail
            position: fixed
            z-index: 2
            overflow auto
            top: 0
            left: 0
            width: 100%
            height: 100%
            backdrop-filter:blur(10px)
            background-color: rgba(7, 17, 27, 0.8)
            &.fade-enter-active, &.fade-leave-active
                transition: all 0.5s
            &.fade-enter, &.fade-leave-active
                opacity: 0
            .detail-wrapper
                min-height: 100%
                width: 100%
                .detail-main
                    margin: 64px 0
                    padding-bottom: 64px
                    .name
                        line-height: 16px
                        text-align: center
                        font-size 16px
                        font-weight: 700
                    .title
                        display: flex
                        margin: 24px auto 28px auto
                        .text
                            margin: 0 12px
                            font-weight: 700
                        .line
                            flex: 1
                            position: relative
                            top: -6px
                            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    .star-wrapper
                        margin: 16px 0 28px 0
                        text-align: center
                    .supports
                        width: 80%
                        margin: 24px auto 28px auto
                        .support-item
                            margin-bottom: 12px
                            list-style-type: none
                            &:last-child
                                margin-bottom: 0
                            .icon
                                display: inline-block
                                float: left
                                width: 16px
                                height: 16px
                                margin: 0 6px 0 12px
                                background-size 16px 16px !important
                                &.decrease
                                    bg-image('decrease_2')
                                &.discount
                                    bg-image('discount_2')
                                &.guarantee
                                    bg-image('guarantee_2')
                                &.special
                                    bg-image('special_2')
                                &.invoice
                                    bg-image('invoice_2')
                            .text
                                font-size 12px
                                font-weight: 200
                                color: #ffffff
                                line-height: 16px
                    .bulletin
                        width: 80%
                        margin: 0 auto
                        font-size: 12px
                        font-weight: 200
                        color: #ffffff
                        line-height: 24px
            .detail-close
                position: relative
                width: 32px
                height: 32px
                margin: -84px auto 0 auto
                clear: both
                font-size 32px
                .icon-close
                    &:before
                        color: rgba(255, 255, 255, 0.5)

    /*.background
        position:fixed
        z-index :-1
        width:100%
        height:100%
        filter:blur(10px)*/
</style>
