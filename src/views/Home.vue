<script setup lang="ts">
import Card from '@/components/card.vue';
import Contact from '@/components/contact.vue';
import Konsole from '@/components/konsole.vue';
import Projects from '@/components/projects.vue';
import Refrences from '@/components/refrences.vue';
import type {Project as P} from '@/models/project';
import {ref} from 'vue';

const services: P[] = [
	{name: 'Formula Manager', icon: 'https://git.zakscode.com/avatars/7ec6bfd66b2bf9bad5c43c75a33f9cb3f6609b05c33a31f5d1e524a567cd09c1?size=280', link: 'https://screenprintingsuppliescanada.com/formulation-manager', description: 'A web & computer application used by FH&Sons to record chemical formulas & distribute them to clients'},
	{name: 'Map Alliance', icon: 'https://maps.zakscode.com/assets/images/logo.png', link: 'https://maps.zakscode.com', description: 'An online GIS tool which enables users to view, edit & share various "marked-up" maps'},
	{name: 'Phone Reminders', icon: 'https://phone-reminders.com/phone-reminders.png', link: 'https://phone-reminders.com', description: 'Automatically call & send SMS reminders to clients for events using Google Calendar'},
];

const openSource: P[] = [
	{name: 'ETF Demo', icon: 'https://git.zakscode.com/repo-avatars/0709db0c51d295d2d29b709865bd95f26e351f72a5c993ca63cd9ec4b4a07f43', link: 'https://etf.zakscode.com', source: 'https://git.zakscode.com/ztimson/etf-demo', description: 'Compare CSV files containing "Electronically Traded Funds" data (Check source for CSV files)'},
	{name: 'Legio 30', icon: 'https://git.zakscode.com/repo-avatars/f66e3d6f5ff4646b45e859f6bf00c0e0de0621d8a45a47481d53d67b67700f2a', link: 'https://legio-30.org', source: 'https://git.zakscode.com/ztimson/legio-30', description: 'Website for a non-profit Roman re-enactment group from Southern Ontario'},
	{name: 'Pelican Landing', icon: 'https://git.zakscode.com/ztimson/pelican-landing/raw/branch/develop/src/assets/logo.png', link: 'https://pelican-landing.zakscode.com', source: 'https://git.zakscode.com/ztimson/pelican-landing', description: 'Business website for a hunting & fishing lodge on the Lage of Woods in Northern Ontario '},
	{name: 'Persist', icon: 'https://git.zakscode.com/repo-avatars/89f6c36caf75762ed9f7f98b69044b7db30da5230be7c5cea54f8a1158f1669a', link: 'https://www.npmjs.com/package/@ztimson/persist', source: 'https://git.zakscode.com/ztimson/persist', description: 'Typescript library to sync variables with LocalStorage & persist state through page reloads'},
	{name: 'PyBar', icon: 'https://git.zakscode.com/repo-avatars/002f97340c2781ccfa5d09fde97403fd499c39a9ad5675dc0edf05a8396e9ac5', link: 'https://git.zakscode.com/ztimson/py-bar', source: 'https://git.zakscode.com/ztimson/py-bar', description: 'Python library to display ASCII progress bars using iterators'},
	{name: 'Transmute', icon: 'https://git.zakscode.com/repo-avatars/b497daaf22a214fe6d6cc35b8ec217cd22401b668dff93dcfcc7557bd8a46d96', link: 'https://git.zakscode.com/ztimson/transmute', source: 'https://git.zakscode.com/ztimson/transmute', description: 'Distributed video conversion tool with built in WebUI'},
	{name: 'ZaksCode', icon: 'https://git.zakscode.com/repo-avatars/590279cb4b176c6a7924364c7b0ef78afa80696703abe5bef8d9ce7e12477f3d', link: 'https://zakscode.com', source: 'https://git.zakscode.com/ztimson/zakscode', description: 'Source code for this website, ZaksCode.com'},
];

// Get repository count
let remainder = ref(0);
fetch('https://git.zakscode.com/api/v1/repos/search', {
	method: 'get',
	headers: {"Content-Type": "application/json"}
}).then(async repos => {
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
				<card color="#e69138" icon="message" offset="3px" title="Feedback" text="Clients are notified with the release notes and can test at their convince. Any critiques can be communicated directly to us or through our ticketing system."/>
				<card color="#674ea7" icon="play" offset="2px" title="Release" text="Once all goals are complete we will work with you to deploy the product to any location. Once setup, future updates are automatically deployed to our clients."/>
			</div>
		</div>

		<!-- About Section -->
		<div class="mb-5">
			<h3 class="mb-0">About</h3>
			<hr class="mb-4">
			<img alt="Childhood" src="/childhood.jpg" height="150px" width="auto" class="float-end m-3 m-md-0 ml-md-3" style="border-radius: 50%;">
			<p>Zak Timson is a software engineer with over 10 years of professional experience. Zak has had a love for computers since he was born & taught himself to code at the age of 13. Since then, he has gone to school for computer science & has worked for both small businesses and large corporations as a developer and team lead.</p>
			<p>Zak specializes in full-stack web development, DevOps & cloud/server infrastructure, and primarily works on large enterprise grade "Software as a service" (SaaS) products. As a software architect & team lead he is able to work with businesses to create a road map of their needs, build enterprise grade software solutions that meet those needs & work with clients to host & deliver automatic updates at scale using continuous integration.</p>

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
