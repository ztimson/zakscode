import {Component} from '@angular/core';
import {ProjectsService} from '../../services/projects.service';

@Component({
	selector: 'projects',
	templateUrl: './projects.component.html'
})
export class ProjectsComponent {
	constructor(public projectsService: ProjectsService) { }
}
