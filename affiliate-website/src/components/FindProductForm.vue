<template>
	<div>
		<h1>Find a Product</h1>
		<form @submit.prevent="fetchProductDetails">
			<input
				type="text"
				v-model="affiliateLink"
				placeholder="Enter Amazon Affiliate Link"
			/>
			<button type="submit">Fetch Product</button>
		</form>

		<div v-if="product">
			<h2>{{ product.title }}</h2>
			<img
				:src="product.image"
				alt="Product Image"
			/>
			<p>{{ product.description }}</p>
			<p>Price: {{ product.price }}</p>
			<p>Rating: {{ product.rating }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FindProductForm',
	data() {
		return {
			affiliateLink: '',
			product: null,
		};
	},
	methods: {
		fetchProductDetails() {
			// Mocking product data fetch
			// You will replace this with the actual API call logic
			this.product = {
				title: 'Sample Product',
				image: 'https://via.placeholder.com/150',
				description: 'This is a sample product fetched from the API.',
				price: '$29.99',
				rating: '4.5',
			};
			console.log('Affiliate Link:', this.affiliateLink);
		},
	},
};
</script>

<style scoped>
h1 {
	color: #2c3e50;
}
form {
	margin-bottom: 20px;
}
</style>
