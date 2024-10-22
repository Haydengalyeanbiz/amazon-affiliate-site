<template>
	<div id="app">
		<nav>
			<router-link to="/">Home</router-link>

			<router-link
				v-if="isAuthenticated"
				to="/find-product"
				>Find Product</router-link
			>
			<button
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
	margin-bottom: 20px;
}
nav a {
	margin-right: 10px;
	text-decoration: none;
	color: #42b983;
}
nav a.router-link-exact-active {
	font-weight: bold;
}
button {
	margin-left: 10px;
	padding: 5px 10px;
	color: white;
	background-color: #42b983;
	border: none;
	cursor: pointer;
}
button:hover {
	background-color: #358a6e;
}
</style>
