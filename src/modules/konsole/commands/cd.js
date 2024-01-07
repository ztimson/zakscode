window.cli.exec['cd'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Change present working directory';
	},
	run: args => {
		const path = window.cli.fs(args[0]);
		if(!path) throw new Error(`cd: \'${args[0]}\': No such file or directory`);
		if(typeof path != 'object') throw new Error(`cd: \'${args[0]}\': Not a directory`);

		window.cli.pwd = window.cli.path(args[0]);
		window.cli._prompt.innerText = window.cli._buildPrompt();
	}
}
