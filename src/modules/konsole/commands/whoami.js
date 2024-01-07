window.cli.exec['whoami'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Get current user account';
	},
	run: args => {
		return window.cli.user;
	}
}
