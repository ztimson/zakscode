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
