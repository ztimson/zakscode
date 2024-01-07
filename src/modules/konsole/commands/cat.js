window.cli.exec['cat'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display file contents';
	},
	run: args => {
		if(!args[0]) throw new Error('cat: missing operand');
		const file = window.cli.fs(args[0]);
		if(file == null) throw new Error('cat: File does not exist');
		return file;
	}
}
