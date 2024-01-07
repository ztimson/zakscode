window.cli.exec['cd'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Clear console output';
	},
	run: args => {
		const path = window.cli.fs(args[0]);
		if(!path) throw new Error(`cd: \'${args[0]}\': No such file or directory`)

		window.cli.pwd = window.cli.path(args[0]);
		window.cli._prompt.innerText = window.cli._buildPrompt();
	}
}
