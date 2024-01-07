window.cli.exec['exit'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'End session';
	},
	run: args => {
		setTimeout(() => {
			window.cli._history = [];
			window.cli._index = 0;
			window.cli._output.innerHTML = ''
			window.cli.stdOut(window.cli.exec['banner'].run());
		}, 1);
	}
}
