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
