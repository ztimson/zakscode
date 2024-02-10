export interface Project {
	icon?: string;
	invertIcon?: boolean;
	name: string;
	description: string;
	link: string;
	source?: string;
}

export const services: Project[] = [
	{name: 'Phone Reminders (Coming Soon)', icon: 'https://phone-reminders.com/phone-reminders.png', link: 'https://phone-reminders.com', description: 'Automatically call & send SMS reminders to clients for events using Google Calendar'},
	{name: 'Map Alliance', icon: 'https://maps.zakscode.com/assets/images/logo.png', link: 'https://maps.zakscode.com', description: 'An online GIS tool which enables users to view, edit & share various "marked-up" maps'},
	{name: 'Formula Manager', icon: 'https://git.zakscode.com/avatars/7ec6bfd66b2bf9bad5c43c75a33f9cb3f6609b05c33a31f5d1e524a567cd09c1?size=280', link: 'https://screenprintingsuppliescanada.com/formulation-manager', description: 'A web & computer application used by FH&Sons to record chemical formulas & distribute them to clients'},
];

export const openSource: Project[] = [
	{name: 'Momentum', icon: 'https://git.zakscode.com/ztimson/momentum/raw/branch/develop/public/favicon.svg', invertIcon: true, link: 'https://git.zakscode.com/ztimson/momentum', source: 'https://git.zakscode.com/ztimson/momentum', description: 'Server Development Platform'},
	{name: 'Transmute (Coming Soon)', icon: 'https://git.zakscode.com/repo-avatars/b497daaf22a214fe6d6cc35b8ec217cd22401b668dff93dcfcc7557bd8a46d96', link: 'https://git.zakscode.com/ztimson/transmute', source: 'https://git.zakscode.com/ztimson/transmute', description: 'Distributed video conversion tool with built in WebUI'},
	{name: 'ZaksCode', icon: 'https://git.zakscode.com/repo-avatars/590279cb4b176c6a7924364c7b0ef78afa80696703abe5bef8d9ce7e12477f3d', link: 'https://zakscode.com', source: 'https://git.zakscode.com/ztimson/zakscode', description: 'Source code for this website, ZaksCode.com'},
	{name: 'Legio 30', icon: 'https://git.zakscode.com/repo-avatars/f66e3d6f5ff4646b45e859f6bf00c0e0de0621d8a45a47481d53d67b67700f2a', invertIcon: true, link: 'https://legio-30.org', source: 'https://git.zakscode.com/ztimson/legio-30', description: 'Website for a non-profit Roman re-enactment group from Southern Ontario'},
	{name: 'Pelican Landing (Coming Soon)', icon: 'https://git.zakscode.com/ztimson/pelican-landing/raw/branch/develop/src/assets/logo.png', link: 'https://pelican-landing.zakscode.com', source: 'https://git.zakscode.com/ztimson/pelican-landing', description: 'Business website for a hunting & fishing lodge on the Lage of Woods in Northern Ontario'},
	{name: 'Var-Persist', icon: 'https://git.zakscode.com/repo-avatars/89f6c36caf75762ed9f7f98b69044b7db30da5230be7c5cea54f8a1158f1669a', link: 'https://www.npmjs.com/package/var-persist', source: 'https://git.zakscode.com/ztimson/var-persist', description: 'TypeScript library to sync variables with localStorage'},
	{name: 'PyBar', icon: 'https://git.zakscode.com/repo-avatars/002f97340c2781ccfa5d09fde97403fd499c39a9ad5675dc0edf05a8396e9ac5', link: 'https://git.zakscode.com/ztimson/py-bar', source: 'https://git.zakscode.com/ztimson/py-bar', description: 'Python library to display ASCII progress bars using iterators'},
];
