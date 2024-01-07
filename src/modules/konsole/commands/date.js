window.cli.exec['date'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get current date & time';
	},
	run: args => {
		return new Date().toLocaleString();
	}
}
