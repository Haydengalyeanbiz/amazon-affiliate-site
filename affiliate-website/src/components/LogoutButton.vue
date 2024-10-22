<template>
	<div>
		<button
			v-if="isAuthenticated"
			@click="logout"
		>
			Logout
		</button>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState(['isAuthenticated']), // Access the Vuex state to check if the user is authenticated
	},
	methods: {
		...mapActions(['logout']), // Map Vuex logout action to this component
	},
};
</script>
