<script setup lang="ts">
import Icon from '@/components/icon.vue';
import {environment} from '@/environments/environment';
import {ref} from 'vue';

const disable = ref(false);
const done = ref(false);
const data = ref({
	name: '',
	email: '',
	subject: '',
	message: '',
});
const errors = ref<any>({
	banner: false,
	name: false,
	email: false,
	subject: false,
	message: false,
});

function reset() {
	disable.value = false;
	done.value = false;
	data.value = {name: '', email: '', subject: '', message: ''};
	errors.value = {banner: false, name: false, email: false, subject: false, message: false};
}

function validateEmail(email: string) {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

function send(name: string, email: string, subject: string, message: string) {
	function formEncode(data: any): string {
		return Object.entries(data).map(([key, value]) =>
			encodeURIComponent(key) + '=' + encodeURIComponent(<any>value)
		).join('&');
	}

	return fetch('https://postmail.invotes.com/send', {
		method: 'post',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		body: formEncode({
			access_token: environment.postMailKey,
			subject: `ZaksCode: ${subject}`,
			text: `App: ZaksCode\nFrom: ${name} <${email}>\nSubject: ${subject}\n\nMessage:\n${message}`
		})
	}).then(async resp => {
		if(!resp.ok) throw new Error(resp.statusText);
		return await resp.text();
	});
}

function submit() {
	disable.value = true;
	const d = data.value;

	errors.value = {
		banner: false,
		name: !d.name,
		email: !d.email || !validateEmail(d.email),
		subject: !d.subject,
		message: !d.message
	};

	if(errors.value.name || errors.value.email || errors.value.subject || errors.value.message) return disable.value = false;
	send(d.name, d.email, d.subject, d.message).then(() => {
		done.value = true;
	}).catch(err => {
		console.error(err);
		errors.value.banner = err?.message || err.toString();
		disable.value = false;
	});
}
</script>

<template>
	<!-- Success Banner -->
	<div v-if="done" class="alert alert-success">
		<span>Success! We will be intouch shortly.</span>
	</div>
	<!-- Error Banner -->
	<div v-if="errors?.banner" class="alert alert-danger">
		Error: {{ (errors as any).banner }}
	</div>
	<!-- Contact Form -->
	<form>
		<div class="d-flex flex-column flex-md-row flex-wrap justify-content-between">
			<!-- Name -->
			<div class="mb-2 p-0 pe-md-1 p-md-0" style="flex: 1 0 0;">
				<div class="input-group">
					<span class="input-group-text"><icon name="user"/></span>
					<input class="form-control" type="text" placeholder="Name" v-model="data.name" v-bind:class="{'is-invalid': errors?.name}" :disabled="disable" required>
				</div>
			</div>
			<!-- Email -->
			<div class="mb-2 p-0 ps-md-1" style="flex: 1 0 0;">
				<div class="input-group">
					<span class="input-group-text"><icon name="envelope"/></span>
					<input class="form-control" type="email" placeholder="Email" v-model="data.email" v-bind:class="{'is-invalid': errors?.email}" :disabled="disable" required>
				</div>
			</div>
		</div>
		<!-- Subject -->
		<div class="input-group mb-2">
			<span class="input-group-text"><icon name="book"/></span>
			<input class="form-control" type="text" placeholder="Subject" v-model="data.subject" v-bind:class="{'is-invalid': errors?.subject}" :disabled="disable" required>
		</div>
		<!-- Message Body -->
		<textarea class="form-control" placeholder="Message" rows="5" v-model="data.message" v-bind:class="{'is-invalid': errors?.message}" :disabled="disable" required></textarea>
		<!-- Buttons -->
		<div class="text-end pt-3">
			<button type="button" class="btn rounded-pill ms-3" @click="reset()">Reset</button>
			<button type="button" class="btn btn-primary rounded-pill ms-3" @click="submit" :disabled="disable">Send Message</button>
		</div>
	</form>
</template>
