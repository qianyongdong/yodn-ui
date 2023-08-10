import { createApp } from 'vue';
import App from './app.vue';
import yodnui from '@yodn-ui/components';
const app = createApp(App);
app.use(yodnui);
app.mount('#app');
