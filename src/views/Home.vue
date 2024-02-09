<script setup lang="ts">
import Card from '@/components/card.vue';
import Contact from '@/components/contact.vue';
import Konsole from '@/components/konsole.vue';
import Projects from '@/components/projects.vue';
import Refrences from '@/components/refrences.vue';
import {services, openSource} from '@/models/project';
import {ref} from 'vue';

// Get repository count
let remainder = ref(0);
fetch('https://git.zakscode.com/api/v1/repos/search', {
	method: 'get',
	headers: {"Content-Type": "application/json"}
}).then(async (repos: any) => {
	const data = (await repos.json())?.data;
	remainder.value = data.length - openSource.length;
});
</script>

<template>
	<div class="p-3">
		<!-- Terminal -->
		<konsole class="mb-5" />

		<!-- Steps -->
		<div class="mb-5 pt-5">
			<h3 class="mb-0 text-center">Plan for Success</h3>
			<hr class="mb-4">
			<div class="text-center my-5">
				<img src="/cycle.svg" alt="Development Cycle" style="width: 100%; max-width: 600px; height: auto;">
			</div>
			<div class="d-flex flex-wrap justify-content-around">
				<card color="#6aa84f" icon="clipboard" offset="1px" title="Plan" text="Working with the client we will identify the goals of the project. This includes things like the target audience, use case, features, style, and delivery."/>
				<card color="#6d9eeb" icon="code" offset="2px" title="Code" text="Goals are broken down into tasks and prioritized in our ticketing system. Using CI/CD, tasks are automatically deployed for testing as they are completed."/>
				<card color="#e69138" icon="message" offset="3px" title="Feedback" text="Clients are notified with the release notes and can test at their convenience. Any critiques can be communicated directly to us or through our ticketing system."/>
				<card color="#674ea7" icon="play" offset="2px" title="Release" text="Once all goals are complete we will work with you to deploy the product to any location. Once setup, future updates are automatically deployed to our clients."/>
			</div>
		</div>

		<!-- About Section -->
		<div class="mb-5">
			<h3 class="mb-0">About</h3>
			<hr class="mb-4">
			<img alt="Childhood" src="/childhood.jpg" height="150px" width="auto" class="float-end m-3 m-md-0 ml-md-3" style="border-radius: 50%;">
			<p>Zak Timson is a software engineer with over 10 years of professional experience. Zak has had a love for computers since he was born & taught himself to code at the age of 13. Since then, he has gone to school for computer science & has worked for both small businesses and large corporations as a developer and team lead.</p>
			<p>Zak specializes in full-stack web development, DevOps, cloud/server infrastructure, and primarily works on large enterprise grade "Software as a service" (SaaS) products. As a software architect & team lead he is able to work with businesses to create a road map of their needs, build enterprise grade software solutions that meet those needs & work with clients to host & deliver automatic updates at scale using continuous integration.</p>

			<div class="mt-4">
				<h4 class="mb-3 text-muted">CSV & References</h4>
				<refrences />
			</div>
		</div>

		<!-- Projects List -->
		<div class="mb-5">
			<h3 class="m-0">Projects</h3>
			<hr class="mb-4">
			<div class="mb-4">
				<h4 class="mb-3 text-muted">Products & Services</h4>
				<projects :projects="services"/>
			</div>
			<div>
				<h4 class="mb-3 text-muted">Open Source</h4>
				<projects :projects="openSource"/>
			</div>
			<a v-if="remainder" class="float-end m-2" href="https://git.zakscode.com/explore" target="_blank">See {{remainder}} More...</a>
		</div>

		<!-- Contact Form -->
		<div>
			<h3 class="m-0">Contact</h3>
			<hr class="mb-4">
			<div>
				<contact />
			</div>
		</div>
	</div>
</template>
