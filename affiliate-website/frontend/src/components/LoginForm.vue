<template>
	<div class="login-form-container">
		<h1>Login</h1>
		<form
			@submit.prevent="handleLogin"
			class="login-form"
		>
			<!-- Changed method name to handleLogin -->
			<!-- Prevent default form submission -->
			<div class="label-input">
				<label for="email">Email</label>
				<input
					type="email"
					v-model="email"
					id="email"
					required
					autocomplete="email"
				/>
			</div>
			<div class="label-input">
				<label for="password">Password</label>
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
				class="log-in-btn"
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
				console.log('Vuex state after login:', this.$store.state);

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

<style>
.login-form-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--primary-light);
}

.login-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	width: 300px;
}

.label-input {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 300px;
}

.label-input input {
	height: 30px;
	width: 300px;
}
</style>
