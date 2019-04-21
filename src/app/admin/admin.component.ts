import {Component} from '@angular/core';
import {AdminService} from './admin.service';
import {AppStore} from '../app.store';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})
export class AdminComponent {
    constructor(public adminService: AdminService, public store: AppStore) {}
}
