<script setup lang="ts">
import Icon from '@/components/icon.vue';
</script>

<style scoped>
	.card {
		border-radius: 4px;
		box-shadow: 0 2px 1px -1px #0003;
	}
</style>

<template>
	<div class="card d-inline-flex flex-column flex-sm-row text-center text-sm-start bg-white p-4">
		<div class="mb-4 mb-sm-4 me-sm-4">
			<img src="/profile.jpg" width="150px" height="150px" alt="Zakary Timson" class="rounded-circle">
		</div>
		<div class="me-sm-5">
			<h1 class="m-0" style="font-size: 2.5rem">Zakary Timson</h1>
			<h2 class="mt-0 text-muted" style="font-size: 1.25rem">
				DEVOPS & SOFTWARE ENGINEER
			</h2>
			<ul class="m-0 p-0 text-start" style="list-style: none">
				<li><icon name="map-marker-alt" class="me-1"/> Toronto Ontario, Canada</li>
				<li><icon name="envelope" class="me-1"/> <a href="mailto:zaktimson@gmail.com">zaktimson@gmail.com</a></li>
				<li><icon name="github" class="fa-brands me-1"/> <a href="https://github.com/ztimson" target="_blank">github.com/ztimson</a></li>
				<li><icon name="git-alt" class="fa-brands me-1"/> <a href="https://git.zakscode.com" target="_blank">git.zakscode.com</a></li>
			</ul>
		</div>
	</div>
</template>
