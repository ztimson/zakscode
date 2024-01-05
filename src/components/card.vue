<script setup lang="ts">
import Icon from '@/components/icon.vue';

defineProps({
	color: {type: String, required: true},
	icon: {type: String, required: true},
	title: {type: String, required: true},
	text: {type: String, required: true},
	offset: {type: String, default: '0px'}
});
</script>

<template>
	<div class="d-flex flex-column align-items-center border mb-3 p-3" style="width: 240px">
		<div class="m-3 p-3 rounded-circle text-white d-flex align-items-middle justify-content-center" :style="'height: 50px; width: 50px; background:' + color">
			<icon :name="icon" :style="'margin-top:' + offset"/>
		</div>
		<h4>{{title}}</h4>
		<p class="text-center">
			{{text}}
		</p>
	</div>
</template>
