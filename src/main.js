import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index';
import store from '@/store/index';
import './assets/common.css';

createApp(App).use(store).use(router).mount('#app');



// const app = createApp(App);
// app.use(store);
// app.use(router);
// app.mount('#app');


// new Vue({
//   render: h => h(App),
//   router,
//   store,
// }).$mount('#app');
