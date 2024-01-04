<script setup lang="ts">
import Foot from '@/components/foot.vue';
import Profile from '@/components/profile.vue';
</script>

<template>
	<!-- Spacer -->
	<div class="w-100" style="height: min(75vh, 500px)"></div>

	<!-- Content -->
	<div class="cap-width mb-3 bg-white">
		<!-- Header -->
		<header class="p-3 mx-auto" style="background: #732222">
			<profile style="transform: translateY(-33%)" />
		</header>

		<!-- Body -->
		<main class="p-3">
			<router-view></router-view>
		</main>

		<!-- Footer -->
		<foot />
	</div>

	<!-- Spacer -->
	<div class="d-none d-sm-block w-100" style="height: 40px"></div>
</template>
