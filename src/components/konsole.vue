<script setup lang="ts">
import '../misc/konsole';
import {onMounted} from 'vue';

onMounted(() => {
	(<any>window).cli?.build('#konsole');
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
			margin: 0;
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

			animation: blink-empty 1s infinite linear;
			background-image: linear-gradient(#0f0, #0f0);
			background-position: 1px  center;
			background-repeat: no-repeat;
			background-size: 1px 1.1em;

			&:focus {
				background-image: none;
			}
		}
	}
}

.hidden-label {
	border: 0;
	padding: 0;
	margin: 0;
	position: absolute !important;
	height: 1px;
	width: 1px;
	overflow: hidden;
	clip: rect(1px 1px 1px 1px); /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
	clip: rect(1px, 1px, 1px, 1px); /*maybe deprecated but we need to support legacy browsers */
	clip-path: inset(50%); /*modern browsers, clip-path works inwards from each corner*/
	white-space: nowrap; /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
}

@keyframes blink-empty {
	0% {background-size: 1px 1.1em;}
	50% {background-size: 1px 1.1em;}
	51% {background-size: 0 1.1em;}
	100% {background-size: 0 1.1em;}
}
</style>

<template>
	<div id="konsole"></div>
</template>
