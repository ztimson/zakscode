<script setup>
import {onMounted} from 'vue';

const hostname = 'virtual';
let history = [];
let historyIndex = 0;
let prompt;
let input;
let output;

function focus() {
	input.focus();
}

function disable() {
	input.disabled = true;
	prompt.style.visibility = 'hidden';
}

function enable() {
	input.disabled = false;
	input.focus();
	prompt.style.visibility = 'visible';
}

function banner() {
	stdOut(`Konsole 0.2.0 LTS virtual tty1<br><br>${hostname} login: root<br>password:<br><br>`);
}

function process(command) {
	(Array.isArray(command) ? command.join(' ') : command).split(';').filter(c => !!c).forEach(c => {
		const parts = c.split(' ').filter(c => !!c);
		if(window.cli[parts[0]] == undefined || window.cli[parts[0]].run == undefined) {
			stdErr(`${parts[0]}: command not found`);
		} else {
			try {
				const out = window.cli[parts[0]].run(parts.slice(1));
				if(!!out) stdOut(out);
			} catch(err) {
				console.error(err)
				stdErr(`${parts[0]}: exited with a non-zero status`);
			}
		}
	});
}

function stdErr(text) {
	const p = document.createElement('p');
	p.classList.add('console-output-line');
	p.classList.add('console-output-error');
	p.innerText = text;
	output.appendChild(p);
}

function stdOut(text, html=true) {
	const p = document.createElement('p');
	p.classList.add('console-output-line');
	p[html ? 'innerHTML' : 'innerText'] = text;
	output.appendChild(p);
}

function stdIn(event) {
	if(event.key == "Enter") {
		disable();
		let inputValue = input.value;
		input.value = '';
		stdOut(`root@localhost:~ # ${inputValue}`, false);
		if(!!inputValue) {
			history.push(inputValue);
			historyIndex = history.length;
			process(inputValue)
		}
		enable();
	} else if(event.key == 'Up' || event.key == 'ArrowUp') {
		if(historyIndex > 0) historyIndex--;
		input.value = historyIndex == history.length ? '' : history[historyIndex];
		setTimeout(() => {
			const end = input.value.length;
			input.setSelectionRange(end, end);
			input.focus();
		}, 1)
	} else if(event.key == 'Down' || event.key == 'ArrowDown') {
		if(historyIndex < history.length) historyIndex++;
		input.value = historyIndex == history.length ? '' : history[historyIndex];
		setTimeout(() => {
			const end = input.value.length;
			input.setSelectionRange(end, end);
			input.focus();
		}, 1)
	}
}

onMounted(() => {
	prompt = document.getElementsByClassName('console-input-prompt')[0];
	input = document.getElementsByClassName('console-input-field')[0];
	output = document.getElementsByClassName('console-output')[0];
	banner();
});

window.cli = {};
window.cli['clear'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Clear console output';
	},
	run: args => {
		output.innerHTML = '';
	}
}
window.cli['echo'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Output text to console';
	},
	run: args => {
		return args.join(' ');
	}
}
window.cli['exit'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'End session';
	},
	run: args => {
		process('clear');
		history = [];
		historyIndex = 0;
		banner();
	}
}
window.cli['help'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display all commands';
	},
	run: args => {
		return Object.keys(window.cli).map(command => `${command} - ${window.cli[command].help()}`).join('<br>') + '<br><br>';
	}
}
window.cli['hostname'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get computer hostname';
	},
	run: args => {
		return 'localhost'
	}
}
window.cli['man'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Command manual';
	},
	run: args => {
		return window.cli[args[0]].help();
	}
}
window.cli['whoami'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get username';
	},
	run: args => {
		return 'root'
	}
}
</script>

<style>
.console {
	display: flex;
	flex-direction: column;
	padding: 1rem;
	background: #333;
	font-family: monospace !important;
	overflow-y: auto;

	.console-output {
		flex-grow: 1;
		color: #0f0;
	}

	.console-output-line {
		margin: 0;
		padding: 0;
		min-height: 1.25rem;
	}

	.console-input {
		display: flex;
		margin: 0;

		.console-input-prompt {
			padding-right: 0.55em;
			text-wrap: nowrap;
			color: #0f0;
		}

		.console-input-field {
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

@keyframes blink-empty {
	0% {background-size: 1px 1.1em;}
	50% {background-size: 1px 1.1em;}
	51% {background-size: 0 1.1em;}
	100% {background-size: 0 1.1em;}
}
</style>

<template>
	<div class="console">
		<div class="console-output"></div>
		<div class="console-input" @click=" focus()">
			<div class="console-input-prompt">root@{{hostname}}:~ #</div>
			<input class="console-input-field" type="text" @keydown="stdIn($event)">
		</div>
	</div>
</template>
