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

	build: (elementId) => {
		window.cli._parent = document.querySelector(elementId);
		if(!window.cli._parent)
			throw new Error(`Could not create konsole, element "${elementId}" does not exist`);

		window.cli._parent.innerHTML = `
            <div class="cli-container">
                <div class="cli-stdout"></div>
                <div class="cli-stdin" onclick="window.cli._input.focus()">
                    <label for="${elementId}-cli-stdin-input" class="cli-stdin-prompt">${window.cli.prompt()}</label>
                    <input id="${elementId}-cli-stdin-input" class="cli-stdin-input" type="text" />
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
		setTimeout(() => window.cli.exec['banner'].run(), 1);
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
	prompt: () => `${window.cli.user}@${window.cli.hostname}:${window.cli.pwd}${window.cli.user == 'root' ? '#' : '$'}`,
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
	stdIn:(command, silent=false) => {
		(Array.isArray(command) ? command.join(' ') : command).split(';').filter(c => !!c).forEach(c => {
			const parts = c.match(/(?:[^\s"]+|"[^"]*")+/g);
			if(!parts) return;

			const exec = window.cli.exec[parts[0]];
			if(!exec?.run) {
				window.cli.stdErr(`${window.cli.prompt()} ${command}\n${parts[0]}: command not found`);
			} else {
				try {
					const args = parts.slice(1).map(a => (a[0] == '"' || a[0] == "'") ? a.slice(1, -1) : a);
					const out = exec.run(args);
					if(!silent) window.cli.stdOut(`${window.cli.prompt()} ${command}${out ? '\n' + out : ''}`);
				} catch(err) {
					console.error(err);
					window.cli.stdErr(`${window.cli.prompt()} ${command}\n${err.message || `${parts[0]}: exited with a non-zero status`}`);
				}
			}
		});
	},
	stdOut: (text, html=false) => {
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

window.cli.exec['banner'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display login banner';
	},
	run: args => {
		window.cli.stdOut(`Konsole ${window.cli.version} LTS ${window.cli.hostname} tty1\n\n${window.cli.hostname} login: ${window.cli.user}\npassword:\n\n`);
	}
}
window.cli.exec['cd'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Clear console output';
	},
	run: args => {
		const path = window.cli.fs(args[0]);
		if(!path) throw new Error(`cd: \'${args[0]}\': No such file or directory`)

		window.cli.pwd = window.cli.path(args[0]);
		window.cli._prompt.innerText = window.cli.prompt();
	}
}
window.cli.exec['clear'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Clear console output';
	},
	run: args => {
		window.cli._output.innerHTML = '';
	}
}
window.cli.exec['date'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get current date & time';
	},
	run: args => {
		return (new Date()).toLocaleString();
	}
}
window.cli.exec['echo'] = {
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
window.cli.exec['exit'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'End session';
	},
	run: args => {
		window.cli.stdIn('clear');
		window.cli._history = [];
		window.cli._index = 0;
		window.cli.stdIn('banner');
	}
}
window.cli.exec['help'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display all commands';
	},
	run: args => {
		return `Konsole v${window.cli.version} - A prototype bash emulator written by Zakary Timson\n\n` +
			Object.keys(window.cli.exec).map(command => `${command} - ${window.cli.exec[command].help()}`).join('\n');
	}
}
window.cli.exec['hostname'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get computer hostname';
	},
	run: args => {
		return window.cli.hostname;
	}
}
window.cli.exec['ls'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display directory contents';
	},
	run: args => {
		const target = window.cli.fs(args[0]);
		if(!target) throw new Error(`ls: cannot access \'${args[0]}\': No such file or directory`)
		return Object.keys(target).reduce((acc, p) => acc + `${p}\n`, '');
	}
}
window.cli.exec['man'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'View command\'s manual';
	},
	run: args => {
		return window.cli.exec[args[0]].help();
	}
}
window.cli.exec['mkdir'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Create new directory';
	},
	run: args => {
		if(!args[0]) throw new Error('mkdir: missing operand');
		window.cli.fs(args[0], {});
	}
}
window.cli.exec['pwd'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get present working directory';
	},
	run: args => {
		return window.cli.pwd;
	}
}
window.cli.exec['rm'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Delete file or directory';
	},
	run: args => {
		if(!args[0]) throw new Error('rm: missing operand');
		window.cli.fs(args[0], null);
	}
}
window.cli.exec['shower-thought'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Random shower thought';
	},
	run: args => {
		const motd = [
			'Why do kamikaze pilots wear helmets?',
			'How are giraffes real, but unicorns made up',
			'When you are a kid you don\'t realize you are also watching your parents grow up',
			'Some one at Google was like "Yea, just have someone drive down every road on earth!"',
			'The number of people older than you never goes up',
			'When you brush your teeth you are cleaning your skeleton',
			'Pregnancy is like a group project where one person get\'s stuck with all the work',
			'If the universe wasn\'t infinite it would be even scarier',
			'Either we are alone in the universe or we are not. both are terrifying',
			'The object of golf is to play the least amount of golf.'
		];
		return motd[~~(Math.random() * motd.length)];
	}
}
window.cli.exec['whoami'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get current user account';
	},
	run: args => {
		return window.cli.user;
	}
}
