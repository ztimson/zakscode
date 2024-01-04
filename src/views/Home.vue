<script setup lang="ts">
import Contact from '@/components/contact.vue';
import Icon from '@/components/icon.vue';
import Konsole from '@/components/konsole.vue';
import Projects from '@/components/projects.vue';
import Refrences from '@/components/refrences.vue';

const services: Projects[] = [
	{name: 'Formula Manager', icon: 'https://git.zakscode.com/avatars/7ec6bfd66b2bf9bad5c43c75a33f9cb3f6609b05c33a31f5d1e524a567cd09c1?size=280', link: 'https://screenprintingsuppliescanada.com/formulation-manager', description: 'Screen Printing Supplies'},
	{name: 'Map Alliance', icon: 'https://maps.zakscode.com/assets/images/logo.png', link: 'https://maps.zakscode.com', description: 'Online GIS & map editing solution'},
	{name: 'Phone Reminders', icon: 'https://phone-reminders.com/phone-reminders.png', link: 'https://phone-reminders.com', description: 'Send SMS & Voice call reminders from Google Calendar'},
];

const openSource: Projects[] = [
	{name: 'Formula Manager', icon: 'https://git.zakscode.com/avatars/7ec6bfd66b2bf9bad5c43c75a33f9cb3f6609b05c33a31f5d1e524a567cd09c1?size=280', link: 'https://screenprintingsuppliescanada.com/formulation-manager', description: 'Screen Printing Supplies'},
	{name: 'Map Alliance', icon: 'https://maps.zakscode.com/assets/images/logo.png', link: 'https://maps.zakscode.com', description: 'Online GIS & map editing solution', source: 'https://google.com'},
	{name: 'Phone Reminders', icon: 'https://phone-reminders.com/phone-reminders.png', link: 'https://phone-reminders.com', description: 'Send SMS & Voice call reminders from Google Calendar'},
];
</script>

<template>
	<div class="p-3">
		<konsole class="mb-5" style="max-height: 300px" />

		<div class="mb-5 pt-5">
			<h4 class="mb-0 text-center">Plan for Success</h4>
			<hr class="mb-4">
			<div class="text-center my-5">
				<img src="/cycle.svg" alt="Development Cycle" style="width: 100%; max-width: 600px; height: auto;">
			</div>
			<div class="d-flex">
				<div class="d-flex flex-column align-items-center border m-3 p-3 text-center" style="flex: 1 0 0;">
					<div class="m-3 p-3 rounded-circle text-white d-flex align-items-middle justify-content-center" style="background: #6aa84f; height: 50px; width: 50px">
						<icon name="clipboard"/>
					</div>
					<h5>Plan</h5>
					<p class="text-center">
						Working with the client we will identify the goals of the project. This includes things like the target audience, use case, features, style, and deployment strategy.
					</p>
				</div>
				<div class="d-flex flex-column align-items-center border m-3 p-3" style="flex: 1 0 0;">
					<div class="m-3 p-3 rounded-circle text-white d-flex align-items-middle justify-content-center" style="background: #6d9eeb; height: 50px; width: 50px">
						<icon name="code"/>
					</div>
					<h5>Develop</h5>
					<p class="text-center">
						Goals are broken down into tasks and are prioritized. Using CI/CD, tasks are automatically deployed for testing as they are completed.
					</p>
				</div>
				<div class="d-flex flex-column align-items-center border m-3 p-3" style="flex: 1 0 0;">
					<div class="m-3 p-3 rounded-circle text-white d-flex align-items-middle justify-content-center" style="background: #e69138; height: 50px; width: 50px">
						<icon name="message"/>
					</div>
					<h5>Feedback</h5>
					<p class="text-center">
						Clients are notified with the release notes and can test at their convince. Any critiques can be communicated directly to us or through our ticketing system.
					</p>
				</div>
				<div class="d-flex flex-column align-items-center border m-3 p-3" style="flex: 1 0 0;">
					<div class="m-3 p-3 rounded-circle text-white" style="background: #674ea7; height: 50px; width: 50px">
						<h5 class="m-0">4</h5>
					</div>
					<h5>Release</h5>
					<p class="text-center">
						Once all goals are complete we will work with you to deploy the product to any location. Once setup, future updates are automatically rolled out.
					</p>
				</div>
			</div>
			<div class="d-flex align-items-center">
				<div>

				</div>
				<div class="d-flex flex-column">

				</div>
			</div>
		</div>

		<div class="mb-5">
			<h3 class="mb-0">About</h3>
			<hr class="mb-4">
			<img alt="Childhood" src="/childhood.jpg" height="150px" width="auto" class="float-end m-3 m-md-0 ml-md-3" style="border-radius: 50%;">
			<p>
				Zak Timson is a software engineer with over 10 years of professional experience. Zak has had a love for
				computers since he was born & taught him self to code at the age of 13. Since then, he has gone to school
				for computer science & has worked for both small businesses and large corporations as a developer and team lead.
			</p>
			<p>
				Zak specializes in full-stack web development & server infrastructure, and primarily works on large enterprise
				grade "Software as a service" (SaaS) products. As a software architect & team lead he is able to work with
				business's to create a road map of their needs, build enterprise grade software solutions that meet those
				needs & work with clients to host & deliver automatic updates at scale using continuous integration.
			</p>

			<div class="mt-4">
				<h4 class="mb-3 text-muted">CSV & References</h4>
				<refrences />
			</div>
		</div>

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
		</div>

		<div>
			<h3 class="m-0">Contact</h3>
			<hr class="mb-4">
			<div>
				<contact />
			</div>
		</div>
	</div>
</template>
