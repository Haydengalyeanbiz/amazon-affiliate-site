<template>
	<div>
		<h1>Login</h1>
		<form @submit.prevent="handleLogin">
			<!-- Changed method name to handleLogin -->
			<!-- Prevent default form submission -->
			<div>
				<label for="email">Email:</label>
				<input
					type="email"
					v-model="email"
					id="email"
					required
					autocomplete="email"
				/>
			</div>
			<div>
				<label for="password">Password:</label>
				<input
					type="password"
					v-model="password"
					id="password"
					required
					autocomplete="current-password"
				/>
			</div>
			<!-- Disable the button when loading is true -->
			<button
				type="submit"
				:disabled="loading"
			>
				Login
			</button>
		</form>

		<p v-if="error">{{ error }}</p>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			email: '',
			password: '',
			error: null,
			loading: false, // Ensure loading is defined
		};
	},
	methods: {
		...mapActions(['login']), // Keep Vuex action as login
		async handleLogin() {
			// Renamed the method to handleLogin
			console.log('Login button clicked');
			this.loading = true;

			try {
				this.error = null;

				const credentials = { email: this.email, password: this.password };
				console.log('Credentials:', credentials); // Log credentials

				// Call the Vuex login action
				await this.login(credentials); // Calls the Vuex action, not this method recursively
				console.log('Login successful');

				// Redirect to home page after successful login
				this.$router.push('/');
			} catch (error) {
				console.error('Login failed:', error);
				this.error = error.message;
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>
