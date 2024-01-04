<script setup lang="ts">
	const props = defineProps({
		class: {type: String, default: ''},
		name: {type: String, required: true},
	});
</script>

<template>
	<i :class="props.class + ' fa fa-' + props.name"></i>
</template>
