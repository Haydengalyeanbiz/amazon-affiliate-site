import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import FindProductForm from '@/components/FindProductForm.vue';

// Define the routes for your application
const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/find-product',
		name: 'FindProduct',
		component: FindProductForm,
	},
];

// Create the router instance
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
