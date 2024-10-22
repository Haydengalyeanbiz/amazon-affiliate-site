<template>
	<div id="app">
		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/find-product">Find Product</router-link>
		</nav>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
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
</style>
