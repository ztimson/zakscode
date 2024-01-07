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
