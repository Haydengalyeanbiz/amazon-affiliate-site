import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

// Enable Vue Devtools in development mode
if (process.env.NODE_ENV === 'development') {
	app.config.devtools = true;
}

app.use(store);
app.use(router);
app.mount('#app');
