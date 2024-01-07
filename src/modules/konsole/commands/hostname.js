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
