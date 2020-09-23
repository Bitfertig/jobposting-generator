console.log('It`s working.');


import './style.scss';


import Vue from 'vue'
import App from './vue/app.vue';

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = false;

import _ from 'lodash';
Vue.set(Vue.prototype, '_', _);

import countryFlagEmoji from "country-flag-emoji";
Vue.set(Vue.prototype, 'countryFlagEmoji', countryFlagEmoji);


import store from './vue/store.js';

window.vm = new Vue({
    store,
    render: h => h(App),
}).$mount('#app');

