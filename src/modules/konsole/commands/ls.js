window.cli.exec['ls'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Display directory contents';
	},
	run: args => {
		const target = window.cli.fs(args[0]);
		if(!target || typeof target != 'object') throw new Error(`ls: cannot access \'${args[0]}\': No such file or directory`)
		return Object.keys(target)
			.sort((a, b) => {
				if(a > b) return 1;
				if(b > a) return -1;
				return 0;
			})
			.map(p => `-rwxrw---- 1 root root ${typeof target[p] =='object' ? '-' : target[p].length} ${p}`)
			.join('\n');
	}
}
