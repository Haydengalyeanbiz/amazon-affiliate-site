import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles.css';

library.add(faFacebook, faInstagram);

const app = createApp(App);

if (process.env.NODE_ENV === 'development') {
	app.config.devtools = true;
}

app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
