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
