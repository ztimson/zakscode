<script setup lang="ts">
import {momentum} from '@/services/momentum.service';
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
	momentum.data.create('Contact', d).then(() => {
		done.value = true;
	}).catch(err => {
		console.error(err);
		errors.value.banner = err?.message || err.toString();
		disable.value = false;
	});
}
</script>

<template>
	<div>
		<!-- Contact Form -->
		<form class="cf">
			<!-- Success Banner -->
			<div v-if="done" class="cf-banner cf-banner--success">
				<i class="fa fa-check-circle"/> Success! We will be in touch shortly.
			</div>
			<!-- Error Banner -->
			<div v-if="errors?.banner" class="cf-banner cf-banner--error">
				<i class="fa fa-exclamation-circle"/> Error: {{ (errors as any).banner }}
			</div>
			<div class="d-flex flex-c flex-md-r gap-2">
				<!-- Name -->
				<div class="cf-field">
					<i class="fa fa-user cf-icon"/>
					<input class="cf-input" type="text" placeholder="Name" v-model="data.name" :class="{'cf-input--error': errors?.name}" :disabled="disable" required>
				</div>
				<!-- Email -->
				<div class="cf-field">
					<i class="fa fa-envelope cf-icon"/>
					<input class="cf-input" type="email" placeholder="Email" v-model="data.email" :class="{'cf-input--error': errors?.email}" :disabled="disable" required>
				</div>
			</div>
			<!-- Subject -->
			<div class="cf-field mt-2">
				<i class="fa fa-book cf-icon"/>
				<input class="cf-input" type="text" placeholder="Subject" v-model="data.subject" :class="{'cf-input--error': errors?.subject}" :disabled="disable" required>
			</div>
			<!-- Message Body -->
			<textarea class="cf-input cf-textarea mt-2" placeholder="Message" rows="5" v-model="data.message" :class="{'cf-input--error': errors?.message}" :disabled="disable" required></textarea>
			<!-- Buttons -->
			<div class="cf-actions">
				<button type="button" class="cf-btn" @click="reset()">Reset</button>
				<button type="button" class="cf-btn cf-btn--primary" @click="submit" :disabled="disable">
					<i class="fa fa-paper-plane"/> Send Message
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
/* Fields */
.cf-field {
	flex: 1;
	position: relative;
	display: flex;
	align-items: center;
}

.cf-icon {
	position: absolute;
	left: 0.85rem;
	color: #2c2c2c;
	opacity: 0.4;
	font-size: 0.85rem;
	pointer-events: none;
}

.cf-input {
	width: 100%;
	padding: 0.65rem 0.85rem 0.65rem 2.25rem;
	background: #fff;
	border: 1.5px solid rgba(44, 44, 44, 0.15);
	border-radius: 0;
	color: #2c2c2c;
	font-size: 0.95rem;
	transition: border-color 0.2s, box-shadow 0.2s;
	outline: none;
}

.cf-input::placeholder {
	color: rgba(44, 44, 44, 0.35);
}

.cf-input:focus {
	border-color: var(--theme-primary);
	box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primary) 25%, transparent);
}

.cf-input:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.cf-input--error {
	border-color: #c0392b !important;
}

.cf-textarea {
	padding-left: 0.85rem;
	resize: vertical;
	min-height: 130px;
}

/* Banners */
.cf-banner {
	padding: 0.75rem 1rem;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.cf-banner--success {
	background: #ecfdea;
	border-left: 3px solid #55c02b;
	color: #2c2c2c;
}

.cf-banner--error {
	background: #fdecea;
	border-left: 3px solid #c0392b;
	color: #2c2c2c;
}

/* Buttons */
.cf-actions {
	display: flex;
	justify-content: flex-end;
	gap: 0.75rem;
	margin-top: .5rem;
}

.cf-btn {
	padding: 0.6rem 1.4rem;
	border: 1.5px solid rgba(44, 44, 44, 0.2);
	border-radius: 0;
	background: transparent;
	color: #2c2c2c;
	font-size: 0.9rem;
	cursor: pointer;
	transition: background 0.2s, border-color 0.2s;

	&:hover {
		filter: brightness(0.8);
	}

	&:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
}

.cf-btn--primary {
	position: relative;
	background: var(--theme-primary);
	border-color: var(--theme-primary);
	color: var(--theme-primary-contrast);
	font-weight: 500;
}
</style>
