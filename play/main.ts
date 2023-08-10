import { createApp } from 'vue';
import App from './app.vue';
import zanui from '@yodn-ui/components';
const app = createApp(App);
app.use(zanui);
app.mount('#app');
