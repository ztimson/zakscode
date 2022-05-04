import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

export type Project = {
	avatar_url: string;
	created_at: string;
	default_branch: string;
	description: string;
	forks_count: number;
	http_url_to_repo: string;
	id: number;
	last_activity_at: string;
	name: string;
	name_with_namespace: string;
	namespace: {
		full_path: string;
		id: number;
		kind: string;
		name: string;
		parent_id: number;
		path: string;
		web_url: string;
	};
	path: string;
	path_with_namespace: string;
	readme_url: string;
	ssh_url_to_repo: string;
	star_count: number;
	tag_list: string[];
	topics: string[];
	web_url: string;
}

@Injectable({providedIn: 'root'})
export class ProjectsService {
	all: Project[] = [];

	constructor(private http: HttpClient) {
		this.http.get<Project[]>('https://gitlab.zakscode.com/api/v4/projects').toPromise().then(projects => {
			this.all = (projects || []).sort((a, b) => {
				if(a.name > b.name) return 1;
				if(a.name < b.name) return -1;
				return 0;
			});
		});
	}
}
