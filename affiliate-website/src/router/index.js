import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import FindProductForm from '@/components/FindProductForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import EditProductPage from '@/components/EditProductPage.vue';

// Define the routes for your application
const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/mom-log-in',
		name: 'LoginForm',
		component: LoginForm,
	},
	{
		path: '/find-product',
		name: 'FindProduct',
		component: FindProductForm,
	},
	{
		path: '/edit-product/:id',
		name: 'EditProductPage',
		component: EditProductPage,
		props: true,
	},
];

// Create the router instance
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
