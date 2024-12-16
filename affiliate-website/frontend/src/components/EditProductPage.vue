<template>
	<div class="edit-product-container">
		<h1>Edit Product</h1>
		<form
			@submit.prevent="submitEditForm"
			class="edit-product-form"
		>
			<div class="form-group">
				<label for="title">Title:</label>
				<input
					type="text"
					id="title"
					v-model="editForm.title"
					required
				/>
			</div>

			<div class="form-group">
				<label for="price">Price:</label>
				<input
					type="text"
					id="price"
					v-model="editForm.price"
					required
				/>
			</div>

			<div class="form-group">
				<label for="description">Description:</label>
				<textarea
					id="description"
					v-model="editForm.description"
					rows="5"
					required
				></textarea>
			</div>

			<div class="form-group">
				<label for="imageUrl">Image URL:</label>
				<input
					type="text"
					id="imageUrl"
					v-model="editForm.image_url"
					required
				/>
			</div>

			<div class="form-group">
				<label for="linkUrl">Product Link:</label>
				<input
					type="text"
					id="linkUrl"
					v-model="editForm.link_url"
					required
				/>
			</div>

			<button
				type="submit"
				class="save-btn"
			>
				Save Changes
			</button>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'EditProductPage',
	props: ['id'],
	data() {
		return {
			editForm: {
				title: '',
				price: '',
				description: '',
				image_url: '',
				link_url: '',
			},
			error: null,
		};
	},
	methods: {
		...mapActions(['fetchSinglePost', 'updatePost']),
		async loadPostData() {
			const postId = this.$route.params.id; // Get ID from route
			try {
				const post = await this.fetchSinglePost(postId); // Call the Vuex action
				this.editForm = { ...post }; // Populate the form with post data
			} catch (error) {
				console.error('Failed to load product data:', error);
				this.error = 'Failed to load product data. Please try again.';
			}
		},
		async submitEditForm() {
			const postId = this.$route.params.id;
			try {
				await this.updatePost({ id: postId, ...this.editForm });
				this.$router.push('/'); // Redirect to the homepage
			} catch (error) {
				console.error('Failed to update product:', error);
				this.error = 'Failed to update product. Please try again.';
			}
		},
	},
	created() {
		this.loadPostData(); // Load post data when the component is created
	},
};
</script>

<style scoped>
.edit-product-container {
	padding: 10dvh 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;

	background-color: var(--primary-light);
}

h1 {
	color: var(--primary-dark);
	margin-bottom: 1.5rem;
}

.edit-product-form {
	width: 100%;
	max-width: 500px;
	background: var(--primary-dark);
	color: var(--primary-light);
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
	margin-bottom: 1.5rem;
}

label {
	display: block;
	margin-bottom: 0.5rem;
	font-weight: bold;
}

input,
textarea {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid var(--secondary-dark);
	border-radius: 4px;
}

textarea {
	resize: none;
}

.save-btn {
	background-color: var(--secondary-dark);
	color: var(--primary-light);
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
}

.save-btn:hover {
	background-color: var(--secondary-light);
}
</style>
