<template>
	<div class="layout">
		<Header />
		<main class="content">
			<slot />
		</main>
	</div>
</template>

<style scoped>
.layout {
	min-height: 100vh;
	background: #fafafa;
}

.content {
	padding: 24px;
}
</style>
