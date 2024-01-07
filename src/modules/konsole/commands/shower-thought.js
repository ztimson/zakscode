window.cli.exec['shower-thought'] = {
	autocomplete: () => {
		return [];
	},
	help: () => {
		return 'Random shower thought';
	},
	run: args => {
		const motd = [
			'Why do kamikaze pilots wear helmets?',
			'How are giraffes real, but unicorns made up',
			'When you are a kid you don\'t realize you are also watching your parents grow up',
			'Some one at Google was like "Yea, just have someone drive down every road on earth!"',
			'The number of people older than you never goes up',
			'When you brush your teeth you are cleaning your skeleton',
			'Pregnancy is like a group project where one person get\'s stuck with all the work',
			'If the universe wasn\'t infinite it would be even scarier',
			'Either we are alone in the universe or we are not. both are terrifying',
			'The object of golf is to play the least amount of golf.'
		];
		return motd[~~(Math.random() * motd.length)];
	}
}
