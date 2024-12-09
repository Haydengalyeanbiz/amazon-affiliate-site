import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles.css';

const app = createApp(App);

if (process.env.NODE_ENV === 'development') {
	app.config.devtools = true;
}

app.use(store);
app.use(router);
app.mount('#app');
