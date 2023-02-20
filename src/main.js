import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index';
//import store from '@/store/index';
import store from '@/vuex/store';
import './assets/common.css';

//Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);

app.config.performance = true;

app.mount('#app');
