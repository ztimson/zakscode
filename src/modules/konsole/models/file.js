export class CliFile {
	owner = window.cli.user;
	group = window.cli.user;
	permissions = 750;
	created = new Date();
	modified = new Date();

	#data;
	get date() { return this.#data; }
	set date(d) {
		this.modified = new Date();
		this.#data = d;
	}

	static instanceOf(f) {
		return f.hasOwnProperty('data');
	}

	size() {
		return this.#data.toString().length;
	}

	permsString() {
		return '-' + this.permissions.toString().split('').map(p => {
			switch (p) {
				case 0:
					return '---';
				case 1:
					return '--x';
				case 2:
					return '-w-';
				case 3:
					return '-wx';
				case 4:
					return 'r--';
				case 5:
					return 'r-x';
				case 6:
					return 'rw-';
				case 7:
					return 'rwx';
			}
		}).join('');
	}
}
