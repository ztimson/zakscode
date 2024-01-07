window.cli = {
	// Element references
	_input: null,
	_parent: null,
	_prompt: null,
	_output: null,

	// CLI State
	_history: [],
	_index: 0,
	pwd: '/',
	hostname: 'virtual',
	env: {},
	exec: {},
	filesystem: {},
	user: 'root',
	version: '0.3.0',

	_buildPrompt: () => `${window.cli.user}@${window.cli.hostname}:${window.cli.pwd}${window.cli.user == 'root' ? '#' : '$'}`,

	build: (elementId) => {
		window.cli._parent = document.querySelector(elementId);
		if(!window.cli._parent)
			throw new Error(`Could not create konsole, element "${elementId}" does not exist`);

		window.cli._parent.innerHTML = `
            <div class="cli-container">
                <div class="cli-stdout"></div>
                <div class="cli-stdin" onclick="window.cli._input.focus()">
                    <label for="${elementId}-cli-stdin-input" class="cli-stdin-prompt">${window.cli._buildPrompt()}</label>
                    <input id="${elementId}-cli-stdin-input" class="cli-stdin-input" type="text" autocomplete="off"/>
                </div>
            </div>`;

		window.cli._input = document.querySelector(elementId + ' .cli-stdin-input');
		window.cli._prompt = document.querySelector(elementId + ' .cli-stdin-prompt');
		window.cli._output = document.querySelector(elementId + ' .cli-stdout');
		window.cli._input.addEventListener('keyup', (e) => {
			if(e.key == "Enter") {
				window.cli.disable();
				if(!!window.cli._input.value) {
					window.cli._history.push(window.cli._input.value);
					window.cli._index = window.cli._history.length;
					window.cli.stdIn(window.cli._input.value)
				}
				window.cli._input.value = '';
				window.cli.enable();
			} else if(e.key == 'Up' || e.key == 'ArrowUp') {
				if(window.cli._index > 0) window.cli._index--;
				window.cli._input.value = window.cli._index == window.cli._history.length ? '' : window.cli._history[window.cli._index];
				setTimeout(() => {
					const end = window.cli._input.value.length;
					window.cli._input.setSelectionRange(end, end);
					window.cli._input.focus();
				}, 1)
			} else if(e.key == 'Down' || e.key == 'ArrowDown') {
				if(window.cli._index < window.cli._history.length) window.cli._index++;
				window.cli._input.value = window.cli._index == window.cli._history.length ? '' : window.cli._history[window.cli._index];
				setTimeout(() => {
					const end = window.cli._input.value.length;
					window.cli._input.setSelectionRange(end, end);
					window.cli._input.focus();
				}, 1)
			}
		});
		setTimeout(() => window.cli.stdOut(window.cli.exec['banner'].run()), 1);
	},
	disable: () => {
		window.cli._input.disabled = true;
		window.cli._prompt.style.visibility = 'hidden';
	},
	enable: () => {
		window.cli._input.disabled = false;
		window.cli._input.focus();
		window.cli._prompt.style.visibility = 'visible';
	},
	path: (path=window.cli.pwd) => {
		let p = path[0] == '/'? path : (window.cli.pwd + (window.cli.pwd.endsWith('/') ? '' : '/') + path.replace('./', ''))
			.replaceAll('//', '/');
		const parts = p.split('/').filter(p => !!p);
		for(let i = 0; i < parts.length; i++) {
			if(parts[i] == '..') {
				i--;
				parts.splice(i, 2);
				i--;
			}
		}
		return '/' + (parts.length ? parts.join('/') : '');
	},
	fs: (path, set) => {
		return window.cli.path(path).split('/').filter(p => !!p).reduce((t, p,  i, arr) => {
			if(!t?.hasOwnProperty(p)) {
				if(set == undefined) return undefined;
				t[p] = {};
			}
			if(set !== undefined && i == arr.length - 1) {
				if(set == null) delete t[p];
				else t[p] = set;
			}
			return t[p];
		}, window.cli.filesystem);
	},
	stdErr: (text) => {
		const p = document.createElement('p');
		p.classList.add('cli-stdout-line');
		p.classList.add('cli-stdout-error');
		p.innerText = text;
		window.cli._output.appendChild(p);
	},
	stdIn:(command, suppress=false) => {
		(Array.isArray(command) ? command.join(' ') : command).split(';').filter(c => !!c).forEach(c => {
			const parts = c.match(/(?:[^\s"]+|"[^"]*")+/g);
			if(!parts) return;

			const exec = window.cli.exec[parts[0]];
			if(!exec?.run) {
				if(!suppress) window.cli.stdErr(`${window.cli._buildPrompt()} ${command}\n${parts[0]}: command not found`);
			} else {
				try {
					const args = parts.slice(1).map(a => (a[0] == '"' || a[0] == "'") ? a.slice(1, -1) : a);
					const out = exec.run(args);
					if(!suppress) window.cli.stdOut(`${window.cli._buildPrompt()} ${command}${out != null ? '\n' + (out || '\n') : ''}`);
				} catch(err) {
					console.error(err);
					if(!suppress) {
						window.cli.stdErr(`${window.cli._buildPrompt()} ${command}\n${err.message || `${parts[0]}: exited with a non-zero status`}`);
					}
				}
			}
		});
	},
	stdOut: (text='', html=false) => {
		const p = document.createElement('p');
		p.classList.add('cli-stdout-line');
		p[html ? 'innerHTML' : 'innerText'] = text;
		window.cli._output.appendChild(p);
	},
	type: (text, speed=150) => {
		let counter = 0;
		return new Promise(res => {
			let typing = setInterval(() => {
				if(counter < text.length) {
					window.cli._input.value += text[counter];
				} else {
					clearInterval(typing);
					setTimeout(() => {
						window.cli.stdIn(text);
						window.cli._input.value = '';
						res();
					}, 750);
				}
				counter++;
			}, speed);
		});
	}
};
