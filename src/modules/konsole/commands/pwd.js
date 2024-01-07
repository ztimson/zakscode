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
