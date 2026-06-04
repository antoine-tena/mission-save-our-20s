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
	
}

.content {
    flex: 1;
    padding: 20px;
}
</style>
