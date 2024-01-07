window.cli.exec['touch'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Change file timestamps & create file if missing';
	},
	run: args => {
		if(!args[0]) throw new Error('touch: missing operand');
		if(!window.cli.fs(args[0])) window.cli.fs(args[0], '');
	}
}
