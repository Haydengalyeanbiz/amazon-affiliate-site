<template>
	<div id="app">
		<nav class="navbar">
			<router-link to="/">Home</router-link>

			<router-link
				v-if="isAuthenticated"
				to="/find-product"
				>Find Product</router-link
			>
			<button
				class="logout-btn"
				v-if="isAuthenticated"
				@click="logout"
			>
				Logout
			</button>
		</nav>
		<router-view />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'App',
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
	height: 8dvh;
	display: flex;
	gap: 1rem;
	align-items: center;
	padding: 0 2rem;
	background-color: var(--primary-dark);
	border-bottom: solid 6px var(--secondary-dark);
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
	border: none;
	color: var(--primary-light);
	background-color: var(--primary-dark);
	transition: var(--transition);
}

.logout-btn:hover {
	background-color: var(--secondary-dark);
	border-radius: 12px;
}
</style>
