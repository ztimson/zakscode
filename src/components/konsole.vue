<script setup lang="ts">
import '../modules/konsole';
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

<template>
	<div id="konsole" @click="animate = false"></div>
</template>
