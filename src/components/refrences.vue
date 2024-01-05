<script setup lang="ts">

const resume = 'https://drive.google.com/file/d/1N1L2SYvqY49OJAR97cjjHANj0ModmZSy/view?usp=drive_link';

const refrences = [
	// ['Andre Mourinho', ''],
	['CD Projekt Red', 'https://files.zakscode.com/share/N61Db3y0'],
	['Chris Cartwright', 'https://files.zakscode.com/share/luyY49_N'],
	['Garry Whyte', 'https://files.zakscode.com/share/zHjnHReT'],
	['Linda Nicodemo', 'https://files.zakscode.com/share/1wKpkQzW'],
	['Ray Power', 'https://files.zakscode.com/share/bTR2ab_P'],
]
</script>

<template>
	<div class="d-block d-md-none">
		<div class="mb-3">
			<a class="btn btn-outline-danger w-100" :href="resume" target="_blank">CSV / Resume</a>
		</div>
		<div class="btn-group-vertical w-100" role="group">
			<a v-for="ref in refrences" class="btn btn-outline-primary" :href="ref[1]" target="_blank">{{ref[0]}}</a>
		</div>
	</div>
	<div class="d-none d-md-block">
		<a class="btn btn-outline-danger me-3" :href="resume" target="_blank">CSV / Resume</a>
		<div class="btn-group" role="group">
			<a v-for="ref in refrences" class="btn btn-outline-primary" :href="ref[1]" target="_blank">{{ref[0]}}</a>
		</div>
	</div>
</template>
