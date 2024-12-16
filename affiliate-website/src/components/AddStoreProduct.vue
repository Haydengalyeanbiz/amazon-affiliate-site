<template>
	<div class="add-new-post-container">
		<h1>Create a New Post</h1>
		<form
			class="add-post-form"
			@submit.prevent="handleSubmit"
		>
			<div class="form-group">
				<label for="title">Title:</label>
				<input
					type="text"
					id="title"
					v-model="formData.title"
					placeholder="Enter title"
					required
				/>
			</div>

			<div class="form-group">
				<label for="price">Price:</label>
				<input
					type="text"
					id="price"
					v-model="formData.price"
					placeholder="Enter price"
					required
				/>
			</div>

			<div class="form-group">
				<label for="description">Description:</label>
				<textarea
					id="description"
					v-model="formData.description"
					rows="5"
					placeholder="Enter description"
					required
				></textarea>
			</div>

			<div class="form-group">
				<label for="imageUrl">Image URL:</label>
				<input
					type="text"
					id="imageUrl"
					v-model="formData.image_url"
					placeholder="Enter image URL"
					required
				/>
			</div>

			<div class="form-group">
				<label for="linkUrl">Product Link:</label>
				<input
					type="text"
					id="linkUrl"
					v-model="formData.link_url"
					placeholder="Enter product link"
					required
				/>
			</div>

			<button
				type="submit"
				class="save-btn"
			>
				Submit Post
			</button>
		</form>
		<p
			v-if="error"
			class="error-message"
		>
			{{ error }}
		</p>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			formData: {
				title: '',
				price: '',
				description: '',
				imageUrl: '',
				linkUrl: '',
			},
			error: null,
		};
	},
	methods: {
		...mapActions(['submitPost']),
		async handleSubmit() {
			try {
				await this.submitPost(this.formData);
				this.$router.push('/'); // Redirect to homepage or success page
			} catch (error) {
				this.error = 'Failed to submit the post. Please try again.';
				console.error(error);
			}
		},
	},
};
</script>

<style scoped>
.add-new-post-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3rem 1rem;
	background-color: var(--primary-light);
	border-radius: 8px;
}

.add-post-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 45%;
	padding: 2rem;
	border-radius: 8px;
	background-color: var(--primary-dark);
}

.form-group {
	width: 100%;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
	color: var(--primary-light);
}

input,
textarea {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.save-btn {
	background-color: var(--primary-dark);
	color: white;
	padding: 0.75rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	width: fit-content;
}

.save-btn:hover {
	background-color: var(--secondary-dark);
}

.error-message {
	color: red;
	margin-top: 1rem;
}
</style>
