window.cli.exec['rm'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Delete file or directory';
	},
	run: args => {
		if(!args.length) throw new Error('rm: missing operand');
		args.forEach(a => window.cli.fs(a, null));
	}
}
