window.cli.exec['help'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display all commands';
	},
	run: args => {
		return `Konsole v${window.cli.version} - an experimental bash emulator written in JavaScript\nCreated By: Zakary Timson\n\n` +
			Object.keys(window.cli.exec).map(command => `${command} - ${window.cli.exec[command].help()}`).join('\n');
	}
}
