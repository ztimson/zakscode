window.cli.exec['mkdir'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Create new directory';
	},
	run: args => {
		if(!args[0]) throw new Error('mkdir: missing operand');
		if(window.cli.fs(args[0]) != null) throw new Error('mkdir: File or directory already exists');
		window.cli.fs(args[0], {});
	}
}
