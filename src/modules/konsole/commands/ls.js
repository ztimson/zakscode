window.cli.exec['ls'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display directory contents';
	},
	run: args => {
		const target = window.cli.fs(args[0]);
		if(!target) throw new Error(`ls: cannot access \'${args[0]}\': No such file or directory`)
		return Object.keys(target).reduce((acc, p) => acc + `${p}\n`, '');
	}
}
