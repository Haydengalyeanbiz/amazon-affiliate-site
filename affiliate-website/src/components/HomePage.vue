<template>
	<div class="homepage-container">
		<div class="posts-container">
			<div
				class="post-card"
				v-for="post in posts"
				:key="post.title"
			>
				<img
					:src="post.image_url"
					alt="Product Image"
					class="post-image"
				/>
				<h3 class="post-title">{{ post.title }}</h3>
				<p class="post-price">{{ post.price }}</p>
				<p class="post-description">{{ post.description }}</p>
				<button
					class="visit-link-btn"
					@click="goToLink(post.link_url)"
				>
					Visit Product
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'HomePage',
	computed: {
		...mapState(['posts']),
	},
	methods: {
		...mapActions(['fetchPosts']),
		goToLink(link) {
			console.log('Navigating to:', link);
			window.open(link);
		},
	},
	created() {
		this.fetchPosts();
	},
};
</script>

<style scoped>
.homepage-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: var(--primary-light);
	padding: 10dvh 0 8dvh;
	height: auto;
}

.posts-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 2rem;
}

.post-card {
	border: 1px solid var(--secondary-dark);
	border-radius: 8px;
	padding: 1rem;
	max-width: 300px;
	text-align: center;
	background-color: var(--primary-dark);
}

.post-image {
	width: 100%;
	height: auto;
	max-height: 300px;
	object-fit: cover;
	border-radius: 8px;
}

.post-title {
	font-size: 1.2rem;
	font-weight: bold;
}

.post-title,
.post-price,
.post-description {
	margin: 0.5rem 0;
	color: var(--primary-light);
}
</style>
