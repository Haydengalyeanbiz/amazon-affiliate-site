<template>
	<div>
		<h1>Find Amazon Product</h1>
		<form @submit.prevent="fetchProductDetails">
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

		<div v-if="product">
			<h2>Product Details</h2>
			<p><strong>Title:</strong> {{ product.title }}</p>
			<p><strong>Price:</strong> {{ product.price }}</p>
			<img
				:src="product.imageUrl"
				alt="Product Image"
			/>
		</div>

		<p v-if="error">{{ error }}</p>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			affiliateLink: '',
			product: null,
			error: null,
		};
	},
	methods: {
		extractASIN(affiliateLink) {
			const regex = /([A-Z0-9]{10})(?:[/?]|$)/; // Remove the backslash escape before '/'
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
			} catch (error) {
				console.error('Failed to fetch product details:', error);
				this.error = 'Failed to fetch product details. Please try again.';
			}
		},
	},
};
</script>
