<script setup lang="ts">

const resume = 'https://drive.google.com/file/d/1km4XqtXrYtoUnrDpEtDmAeKWh1qyp9nQ/view?usp=drive_link';

const refrences = [
	['Andre Mourinho', 'https://drive.google.com/file/d/1QSRzBg6xj1evwIhpAkrKZqPrbJOjwkYR/view?usp=drive_link'],
	['CD Projekt Red', 'https://drive.google.com/file/d/1QT02DBRFg4HcJXoxuH0WfiozjYHoJWrn/view?usp=drive_link'],
	['Chris Cartwright', 'https://drive.google.com/file/d/17JtSlVvMt_84XG0iQO8cHlDsi30oR34c/view?usp=drive_link'],
	['Garry Whyte', 'https://drive.google.com/file/d/18Mqv1vX2wmseQkqEPRIZiuSuGhDri-dB/view?usp=drive_link'],
	['Linda Nicodemo', 'https://drive.google.com/file/d/1c4rB1oSWW4OoaURHkSeCHpOEkdBdQ_fH/view?usp=drive_link'],
	['Ray Power', 'https://drive.google.com/file/d/1aP8Xpg3hlP0yQV8_sg9yeTgsrTRCcJZH/view?usp=drive_link'],
]
</script>

<template>
	<div class="d-block d-md-none">
		<div class="mb-3">
			<a class="btn btn-outline-danger w-100" :href="resume" target="_blank">Resume</a>
		</div>
		<div class="btn-group-vertical w-100" role="group">
			<a v-for="ref in refrences" class="btn btn-outline-primary" :href="ref[1]" target="_blank">{{ref[0]}}</a>
		</div>
	</div>
	<div class="d-none d-md-flex align-items-start">
		<a class="btn btn-outline-danger me-3" :href="resume" target="_blank">Resume</a>
		<div class="btn-group" role="group">
			<a v-for="ref in refrences" class="btn btn-outline-primary" :href="ref[1]" target="_blank">{{ref[0]}}</a>
		</div>
	</div>
</template>
