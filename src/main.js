import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

Vue.config.productionTip = false;

Vue.use(VueRouter);

let app = Vue.extend(App);

let router = new VueRouter({
    routes: [
        {
            path: 'goods',
            components: goods
        },
        {
            path: 'ratings',
            components: ratings
        },
        {
            path: 'seller',
            components: seller
        }
    ]
});
router.push('goods');
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(app)
});
