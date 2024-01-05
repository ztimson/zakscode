<script setup lang="ts">
import type {Project} from '@/models/project';

defineProps({
	projects: {type: Array as () => Project[], required: true}
});
</script>

<template>
	<div>
		<div v-for="(p, i) in projects">
			<div class="d-flex align-items-center border p-2" :class="i == 0 ? '' : 'border-top-0'">
				<div class="me-2">
					<img :src="p.icon || '/git.png'" alt="Logo" style="height: 40px; width: 40px;">
				</div>
				<div class="d-flex flex-column">
					<div>
						<a :href="p.link" target="_blank" class="me-2">{{p.name}}</a>
						<a v-if="p.source" :href="p.source" target="_blank" class="text-small" style="font-size: 0.75em">[source]</a>
					</div>
					<div class="text-muted">{{p.description}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
