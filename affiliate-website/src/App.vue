<template>
	<div id="app">
		<nav class="navbar">
			<router-link
				class="navbar-logo"
				to="/"
				>IndyMamaDeals</router-link
			>
			<div
				v-if="!isAuthenticated"
				class="social-links"
			>
				<a href="https://www.facebook.com/indycouponmama">Facebook</a>
				<a href="https://instagram.com/indy_mama_deals">Instagram</a>
			</div>
			<div
				v-if="isAuthenticated"
				class="navbar-items"
			>
				<router-link
					v-if="isAuthenticated"
					to="/find-store-product"
					>Add Store Product</router-link
				>
				<router-link
					v-if="isAuthenticated"
					to="/find-product"
					>Add Amazon Product</router-link
				>
				<button
					class="logout-btn"
					v-if="isAuthenticated"
					@click="logout"
				>
					Logout
				</button>
			</div>
		</nav>
		<router-view />
		<FooterComponent />
	</div>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'App',
	components: {
		FooterComponent,
	},
	computed: {
		...mapState(['isAuthenticated']),
	},
	methods: {
		...mapActions(['logout']),
	},
};
</script>

<style scoped>
nav {
	position: fixed;
	z-index: 1000;
	height: 8dvh;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	background-color: var(--primary-dark);
	border-bottom: solid 6px var(--secondary-dark);
	box-sizing: border-box;
}

.navbar-logo {
	font-family: var(--header-ff);
}

.social-links {
	display: flex;
	gap: 1rem;
}

.navbar-items {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
}

nav a {
	font-family: var(--header-ff);
}

nav a.router-link-exact-active {
	font-weight: bold;
}

nav a {
	transition: var(--transition);
}

nav a:hover {
	color: var(--secondary-light);
}

.logout-btn {
	font-family: var(--header-ff);
	border: none;
	color: var(--primary-light);
	background-color: var(--primary-dark);
	transition: var(--transition);
}

.logout-btn:hover {
	color: var(--secondary-dark);
}
</style>
