<template>
	<div class="find-product-form-container">
		<h1>Find Amazon Product</h1>
		<form
			@submit.prevent="fetchProductDetails"
			class="fetch-form"
		>
			<div>
				<label for="affiliate-link">Affiliate Link:</label>
				<input
					type="text"
					v-model="affiliateLink"
					id="affiliate-link"
					placeholder="Paste your Amazon affiliate link here"
					required
				/>
			</div>
			<button type="submit">Fetch Product Details</button>
		</form>

		<div class="preview-form-structure">
			<!-- visual structure of the new post before submission -->
			<div
				class="preview-post-structure"
				v-if="product && product.title"
			>
				<p class="preview-title">{{ product.title }}</p>
				<img
					class="preview-img"
					:src="product.imageUrl"
					alt=""
				/>
				<p class="preview-price">{{ product.price }}</p>
			</div>

			<!-- Form to display product details and allow for a new post submission -->
			<form
				v-if="product && product.title"
				@submit.prevent="submitPost"
				class=""
			>
				<div>
					<label for="title">Title:</label>
					<input
						type="text"
						id="title"
						v-model="postForm.title"
						:placeholder="product?.title || ''"
						required
					/>
				</div>

				<div>
					<label for="price">Price:</label>
					<input
						type="text"
						id="price"
						v-model="postForm.price"
						:placeholder="product?.price || 'Price unavailable'"
						required
					/>
				</div>

				<div>
					<label for="description">Description:</label>
					<textarea
						id="description"
						v-model="postForm.description"
						placeholder="Product Description"
						required
					></textarea>
				</div>

				<div>
					<label for="image">Image URL:</label>
					<input
						type="text"
						id="image"
						v-model="postForm.imageUrl"
						:placeholder="product?.imageUrl || ''"
						required
					/>
				</div>

				<button type="submit">Submit Post</button>
			</form>

			<p v-if="error">{{ error }}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			affiliateLink: '',
			product: {},
			error: null,
			postForm: {
				title: '',
				price: '',
				description: '',
				imageUrl: '',
			},
		};
	},
	methods: {
		extractASIN(affiliateLink) {
			const regex = /([A-Z0-9]{10})(?:[/?]|$)/;
			const match = affiliateLink.match(regex);
			return match ? match[1] : null;
		},
		async fetchProductDetails() {
			this.error = null;
			this.product = null;

			const asin = this.extractASIN(this.affiliateLink);
			if (!asin) {
				this.error = 'Invalid Amazon link. Could not extract ASIN.';
				return;
			}

			try {
				const response = await axios.post(
					'http://127.0.0.1:5000/fetch-product-details',
					{ asin }
				);
				this.product = response.data;

				this.postForm.title = this.product?.title || '';
				this.postForm.price = this.product?.price || 'Price unavailable';
				this.postForm.imageUrl = this.product?.imageUrl || '';
			} catch (error) {
				console.error('Failed to fetch product details:', error);
				this.error = 'Failed to fetch product details. Please try again.';
			}
		},
	},
};
</script>

<style>
.find-product-form-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	height: 91dvh;
	background-color: var(--primary-light);
}

.fetch-form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.preview-form-structure {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	gap: 1rem;
}

.preview-post-structure {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 200px;
	border: solid 4px var(--primary-dark);
	border-radius: 12px;
	background: var(--secondary-light);
}

.preview-title {
	max-width: 200px;
}
</style>
