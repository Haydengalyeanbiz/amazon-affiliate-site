<template>
	<div class="homepage-container">
		<h1 class="homepage-h1">IndyCouponMama</h1>
	</div>
</template>

<script>
export default {
	name: 'HomePage',
};
</script>

<style scoped>
.homepage-container {
	display: flex;
	justify-content: center;
	background-color: var(--primary-light);
	margin: 8dvh 0 0;
	height: 92dvh;
}

.homepage-h1 {
	color: var(--primary-dark);
}
</style>
