<script setup lang="ts">
import Icon from '@/components/icon.vue';
import QRCode from 'qrcode';
import {computed, onMounted, ref} from 'vue';

// ---------- Your info (edit here) ----------
const person = {
	first: 'Zakary',
	last: 'Timson',
	title: 'Software Engineer',
	org: 'ZaksCode',
	email: 'zaktimson@gmail.com',
	phone: '+1 (519) 917-1046', // e.g. '+1 519 555 0123' - leave empty to hide
	city: 'London',
	region: 'Ontario',
	country: 'Canada',
	website: 'https://zakscode.com',
	github: 'https://github.com/ztimson',
	git: 'https://git.zakscode.com',
	photo: '/profile.jpg'
};

// ---------- Rows displayed on the card ----------
const rows = computed(() => [
	{key: 'email', label: 'Email', value: person.email, href: `mailto:${person.email}`, icon: 'envelope'},
	person.phone && {key: 'phone', label: 'Phone', value: person.phone, href: `tel:${person.phone.replace(/[^+\d]/g, '')}`, icon: 'phone'},
	{key: 'website', label: 'Website', value: person.website.replace(/^https?:\/\//, ''), copy: person.website, href: person.website, icon: 'globe'},
].filter(Boolean) as any[]);

// ---------- Copy to clipboard ----------
const copied = ref('');
let copyTimer: any;

async function copy(key: string, text: string) {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		const el = document.createElement('textarea');
		el.value = text;
		el.style.position = 'fixed';
		el.style.opacity = '0';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		el.remove();
	}
	copied.value = key;
	clearTimeout(copyTimer);
	copyTimer = setTimeout(() => copied.value = '', 1600);
}

// ---------- vCard ----------
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
const fold = (line: string) => line.match(/.{1,74}/g)?.join('\r\n ') ?? line;

function buildVCard(photoBase64?: string) {
	const lines = [
		'BEGIN:VCARD',
		'VERSION:3.0',
		`N:${esc(person.last)};${esc(person.first)};;;`,
		`FN:${esc(person.first + ' ' + person.last)}`,
		`ORG:${esc(person.org)}`,
		`TITLE:${esc(person.title)}`,
		`EMAIL;TYPE=INTERNET,WORK:${person.email}`,
		person.phone && `TEL;TYPE=CELL:${person.phone}`,
		`ADR;TYPE=WORK:;;;${esc(person.city)};${esc(person.region)};;${esc(person.country)}`,
		`URL:${person.website}`,
		`item1.URL:${person.github}`,
		'item1.X-ABLabel:GitHub',
		`item2.URL:${person.git}`,
		'item2.X-ABLabel:Git',
		photoBase64 && `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`,
		'END:VCARD'
	].filter(Boolean) as string[];
	return lines.map(fold).join('\r\n') + '\r\n';
}

// Shrink the profile picture so the .vcf stays small
async function loadPhoto(size = 256): Promise<string | undefined> {
	try {
		const blob = await (await fetch(person.photo)).blob();
		const bmp = await createImageBitmap(blob);
		const side = Math.min(bmp.width, bmp.height);
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = size;
		canvas.getContext('2d')!.drawImage(
			bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, size, size
		);
		return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
	} catch {
		return undefined;
	}
}

const saving = ref(false);

async function downloadContact() {
	saving.value = true;
	try {
		const vcf = buildVCard(await loadPhoto());
		const url = URL.createObjectURL(new Blob([vcf], {type: 'text/vcard;charset=utf-8'}));
		const a = document.createElement('a');
		a.href = url;
		a.download = `${person.first}-${person.last}.vcf`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	} finally {
		saving.value = false;
	}
}

// ---------- QR code (no photo, so it stays easy to scan) ----------
const qr = ref('');
onMounted(async () => {
	qr.value = await QRCode.toDataURL(buildVCard(), {
		errorCorrectionLevel: 'M',
		margin: 1,
		width: 600,
		color: {dark: '#1c1c1e', light: '#ffffff'}
	});
});
</script>

<template>
	<div class="bc-page">
		<article class="bc">
			<!-- Banner -->
			<div class="bc-banner">
				<span class="bc-ring bc-ring--1"></span>
				<span class="bc-ring bc-ring--2"></span>
				<span class="bc-ring bc-ring--3"></span>
			</div>

			<!-- Identity -->
			<div class="bc-identity">
				<img class="bc-avatar" :src="person.photo" :alt="`${person.first} ${person.last}`">
				<h1 class="bc-name">{{person.first}} {{person.last}}</h1>
				<div class="bc-title">{{person.title}}</div>
			</div>

			<!-- Details -->
			<ul class="bc-list">
				<li v-for="r in rows" :key="r.key" class="bc-row">
					<span class="bc-row-icon"><icon :name="r.icon" :class="{'fa-brands': r.brand}" /></span>
					<div class="bc-row-text">
						<span class="bc-row-label">{{r.label}}</span>
						<a v-if="r.href" class="bc-row-value" :href="r.href" :target="r.href.startsWith('http') ? '_blank' : undefined" rel="noopener">{{r.value}}</a>
						<span v-else class="bc-row-value">{{r.value}}</span>
					</div>
					<button type="button" class="bc-copy" :class="{'bc-copy--done': copied == r.key}" :aria-label="`Copy ${r.label}`" @click="copy(r.key, r.copy || r.value)">
						<icon :name="copied == r.key ? 'check' : 'copy'" />
					</button>
				</li>
			</ul>

			<!-- QR -->
			<div class="bc-qr">
				<div class="bc-qr-box">
					<img v-if="qr" :src="qr" alt="Contact QR code">
				</div>
				<div class="bc-qr-caption">Scan to add me to your contacts</div>
				<a v-if="qr" class="bc-qr-link" :href="qr" :download="`${person.first}-${person.last}-QR.png`">Download QR</a>
			</div>

			<!-- Primary action -->
			<div class="bc-section">
				<button type="button" class="bc-save" :disabled="saving" @click="downloadContact">
					<icon name="user-plus" /> Save to Contacts
				</button>
			</div>
		</article>

		<!-- Toast -->
		<div class="bc-toast" :class="{'bc-toast--show': copied}" role="status">Copied to clipboard</div>
	</div>
</template>

<style scoped>
.bc-page {
	--bc-accent: #732222;
	--bc-accent-2: #a63a3a;
	--bc-ink: #1c1c1e;
	--bc-muted: #7a7a82;
	--bc-line: #ececf0;

	min-height: 100vh;
	min-height: 100dvh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px 16px;
	background:
		radial-gradient(1200px 600px at 10% -10%, #8f2d2d 0%, transparent 60%),
		radial-gradient(900px 500px at 110% 110%, #3b1010 0%, transparent 60%),
		#2a0d0d;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
	color: var(--bc-ink);
}

/* Card */
.bc {
	width: 100%;
	max-width: 400px;
	background: #fff;
	border-radius: 28px;
	overflow: hidden;
	box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06);
}

/* Banner */
.bc-banner {
	position: relative;
	height: 130px;
	background: linear-gradient(135deg, var(--bc-accent) 0%, var(--bc-accent-2) 100%);
	overflow: hidden;
}

.bc-ring {
	position: absolute;
	border-radius: 50%;
	border: 1.5px solid rgba(255, 255, 255, 0.18);
}
.bc-ring--1 { width: 220px; height: 220px; right: -60px; top: -90px; }
.bc-ring--2 { width: 140px; height: 140px; right: -20px; top: -50px; }
.bc-ring--3 { width: 300px; height: 300px; left: -140px; bottom: -190px; }

.bc-org {
	position: absolute;
	top: 18px;
	left: 22px;
	font-size: 0.7rem;
	font-weight: 600;
	letter-spacing: 0.22em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.85);
}

/* Identity */
.bc-identity {
	text-align: center;
	padding: 0 24px 4px;
	margin-top: -60px;
	position: relative;
}

.bc-avatar {
	width: 120px;
	height: 120px;
	object-fit: cover;
	border-radius: 50%;
	border: 5px solid #fff;
	box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.35);
	background: #eee;
}

.bc-name {
	margin: 14px 0 2px;
	font-size: 1.65rem;
	line-height: 1.15;
	font-weight: 700;
	letter-spacing: -0.01em;
}

.bc-title {
	font-size: 0.8rem;
	font-weight: 600;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--bc-accent);
}

/* Save button */
.bc-section {
	padding: 20px 24px 8px;
}

.bc-save {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.6rem;
	padding: 0.9rem 1rem;
	border: 0;
	border-radius: 14px;
	background: linear-gradient(135deg, var(--bc-accent) 0%, var(--bc-accent-2) 100%);
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	box-shadow: 0 10px 20px -10px var(--bc-accent);
	transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
}
.bc-save:hover { transform: translateY(-1px); box-shadow: 0 14px 24px -10px var(--bc-accent); }
.bc-save:active { transform: translateY(0); }
.bc-save:disabled { opacity: 0.6; cursor: progress; }

/* Rows */
.bc-list {
	list-style: none;
	margin: 0;
	padding: 8px 12px 4px;
}

.bc-row {
	display: flex;
	align-items: center;
	gap: 14px;
	padding: 10px 12px;
	border-radius: 14px;
	transition: background 0.15s;
}
.bc-row:hover { background: #f7f7f9; }

.bc-row-icon {
	flex: none;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 12px;
	background: color-mix(in srgb, var(--bc-accent) 10%, white);
	color: var(--bc-accent);
	font-size: 0.95rem;
}

.bc-row-text {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
}

.bc-row-label {
	font-size: 0.68rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--bc-muted);
}

.bc-row-value {
	font-size: 0.95rem;
	font-weight: 500;
	color: var(--bc-ink);
	text-decoration: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
a.bc-row-value:hover { color: var(--bc-accent); }

.bc-copy {
	flex: none;
	width: 38px;
	height: 38px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1.5px solid var(--bc-line);
	border-radius: 50%;
	background: #fff;
	color: var(--bc-muted);
	cursor: pointer;
	transition: all 0.15s;
}
.bc-copy:hover { border-color: var(--bc-accent); color: var(--bc-accent); }
.bc-copy:active { transform: scale(0.92); }
.bc-copy--done { background: #2e9e5b; border-color: #2e9e5b; color: #fff; }
.bc-copy--done:hover { background: #2e9e5b; border-color: #2e9e5b; color: #fff; }

/* QR */
.bc-qr {
	padding: 24px 20px 18px;
	text-align: center;
	border-top: 1px dashed var(--bc-line);
}

.bc-qr-box {
	width: 200px;
	height: 200px;
	margin: 0 auto;
	padding: 10px;
	border-radius: 20px;
	background: #fff;
	box-shadow: 0 0 0 1.5px var(--bc-line), 0 12px 24px -12px rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
}
.bc-qr-box img { width: 100%; height: 100%; display: block; border-radius: 8px; }

.bc-qr-caption {
	margin-top: 14px;
	font-size: 0.82rem;
	color: var(--bc-muted);
}

.bc-qr-link {
	display: inline-block;
	margin-top: 4px;
	font-size: 0.8rem;
	font-weight: 600;
	color: var(--bc-accent);
	text-decoration: none;
}
.bc-qr-link:hover { text-decoration: underline; }

/* Toast */
.bc-toast {
	position: fixed;
	left: 50%;
	bottom: 28px;
	transform: translate(-50%, 20px);
	padding: 0.65rem 1.1rem;
	border-radius: 999px;
	background: rgba(28, 28, 30, 0.92);
	color: #fff;
	font-size: 0.85rem;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.2s, transform 0.2s;
}
.bc-toast--show { opacity: 1; transform: translate(-50%, 0); }

@media (max-width: 440px) {
	.bc-page { padding: 0; align-items: stretch; }
	.bc { max-width: none; border-radius: 0; }
}
</style>
