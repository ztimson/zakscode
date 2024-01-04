<script setup lang="ts">
</script>

<style scoped lang="scss">
	.btn-outline-info:hover {
		color: #ffffff;
	}
</style>

<template>
	<div class="d-block d-md-none">
		<div class="mb-3">
			<a class="btn btn-outline-primary w-100">CSV / Resume</a>
		</div>
		<div class="btn-group-vertical w-100" role="group">
			<a class="btn btn-outline-info">CD Projekt Red</a>
			<a class="btn btn-outline-info">Chris Cartwright</a>
			<a class="btn btn-outline-info">Garry Whyte</a>
			<a class="btn btn-outline-info">Ray Power</a>
			<a class="btn btn-outline-info">Linda Nicodemo</a>
		</div>
	</div>
	<div class="d-none d-md-block">
		<a class="btn btn-outline-primary me-3">CSV / Resume</a>
		<div class="btn-group" role="group">
			<a class="btn btn-outline-info">CD Projekt Red</a>
			<a class="btn btn-outline-info">Chris Cartwright</a>
			<a class="btn btn-outline-info">Garry Whyte</a>
			<a class="btn btn-outline-info">Ray Power</a>
			<a class="btn btn-outline-info">Linda Nicodemo</a>
		</div>
	</div>
</template>
