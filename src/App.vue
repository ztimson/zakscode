<script setup lang="ts">
import {momentum} from '@/services/momentum.service';
momentum.client.inject();
</script>

<template>
	<router-view />
</template>
