<script setup lang="ts">
import Icon from '@/components/icon.vue';
import {ref} from 'vue';

const disable = ref(false);
const done = ref(false);
const data = ref({
	name: '',
	email: '',
	subject: '',
	message: '',
});
const errors = ref({
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
	// Email.send(d.name, d.email, d.subject, d.message).then(() => {
	// 	done.value = true;
	// }).catch(err => {
	// 	console.error(err);
	// 	errors.value.banner = err?.message || err.toString();
	// 	disable.value = false;
	// });
}
</script>

<template>
	<div v-if="done" class="alert alert-success">
		<span>Success! We sent you a copy & we will be intouch shortly.</span>
	</div>
	<div v-if="errors?.banner" class="alert alert-danger">
		{{ errors.banner }}
	</div>
	<form>
		<div class="d-flex flex-wrap justify-content-between mb-2">
			<div class="input-group mb-2 mb-sm-0" style="width: 49%; min-width: 250px">
				<span class="input-group-text"><icon name="user"/></span>
				<input class="form-control" type="text" placeholder="Name" v-model="data.name" v-bind:class="{'is-invalid': errors?.name}" :disabled="!!user || disable" required>
			</div>
			<div class="input-group" style="width: 49%; min-width: 250px">
				<span class="input-group-text"><icon name="envelope"/></span>
				<input class="form-control" type="email" placeholder="Email" v-model="data.email" v-bind:class="{'is-invalid': errors?.email}" :disabled="!!user || disable" required>
			</div>
		</div>
		<div class="input-group mb-2">
			<span class="input-group-text"><icon name="book"/></span>
			<input class="form-control" type="text" placeholder="Subject" v-model="data.subject" v-bind:class="{'is-invalid': errors?.subject}" :disabled="disable" required>
		</div>
		<textarea class="form-control" placeholder="Message" rows="5" v-model="data.message" v-bind:class="{'is-invalid': errors?.message}" :disabled="disable" required></textarea>
		<div class="text-end pt-3">
			<button type="button" class="btn rounded-pill ms-3" @click="reset()">Reset</button>
			<button type="button" class="btn btn-primary rounded-pill ms-3" @click="submit" :disabled="disable">Send Message</button>
		</div>
	</form>
</template>
