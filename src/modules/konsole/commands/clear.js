window.cli.exec['clear'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Clear console output';
	},
	run: args => {
		setTimeout(() => window.cli._output.innerHTML = '', 1);
	}
}
