<template>
	<div>
		<h1>Login</h1>
		<form @submit.prevent="login">
			<div>
				<label for="email">Email:</label>
				<input
					type="email"
					v-model="email"
					id="email"
					required
				/>
			</div>
			<div>
				<label for="password">Password:</label>
				<input
					type="password"
					v-model="password"
					id="password"
					required
				/>
			</div>
			<button type="submit">Login</button>
		</form>

		<p v-if="error">{{ error }}</p>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'LoginForm',
	data() {
		return {
			email: '',
			password: '',
			error: null,
		};
	},
	methods: {
		...mapActions(['login']), // Map Vuex login action to this component
		async login() {
			try {
				this.error = null;
				const credentials = { email: this.email, password: this.password };
				await this.login(credentials); // Call Vuex login action
				this.$router.push('/'); // Redirect to home page on successful login
			} catch (error) {
				this.error = 'Invalid email or password'; // Handle login error
			}
		},
	},
};
</script>
