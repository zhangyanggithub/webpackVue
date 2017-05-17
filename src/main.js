import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import './common/stylus/mixin.styl';
import './common/stylus/icon.styl';
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/goods',
            component: goods
        },
        {
            path: '/ratings',
            component: ratings
        },
        {
            path: '/seller',
            component: seller
        }
    ]
});
router.push('/goods');
/* eslint-disable no-new */
 new Vue({
    el: '#app',
    router,
    render: h => h(app)
});

