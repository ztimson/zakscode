<script setup lang="ts">
import '../misc/konsole';
import {onMounted, ref} from 'vue';

const animate = ref(true);

function sleep(time: number) {
	return new Promise(res => setTimeout(res, time));
}

async function showerThought(s=10000) {
	if(!animate.value) return;
	await (<any>window).cli.type('shower-thought');
	if(!animate.value) return;
	await sleep(s);
	if(!animate.value) return;
	await(<any>window).cli.type('clear');
}

onMounted(async () => {
	(<any>window).cli.build('#konsole');
	while(animate) {
		if(!animate.value) break;
		await sleep(3000);
		if(!animate.value) break;
		await showerThought();
	}
});
</script>

<style>
.cli-container {
	padding: 1rem;
	background: #333;
	font-family: monospace !important;
	overflow-y: auto;
	min-height: 150px;
	max-height: 300px;

	.cli-stdout {
		flex-grow: 1;
		color: #0f0;

		.cli-stdout-line {
			padding: 0;
			min-height: 1.25rem;
		}
	}

	.cli-stdin {
		display: flex;
		margin: 0;

		.cli-stdin-prompt {
			padding-right: 0.55em;
			text-wrap: nowrap;
			color: #0f0;
		}

		.cli-stdin-input {
			border: none;
			outline: none;
			font-size: 1rem;
			background-color: rgba(0, 0, 0, 0);
			color: #0f0;
			flex-grow: 1;
			padding: 0;
		}
	}
}
</style>

<template>
	<div id="konsole" @click="animate = false"></div>
</template>
