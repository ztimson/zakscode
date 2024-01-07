window.cli.exec['banner'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display login banner';
	},
	run: args => {
		return `Konsole ${window.cli.version} LTS ${window.cli.hostname} tty1\n\n${window.cli.hostname} login: ${window.cli.user}\npassword:\n\n`;
	}
}
