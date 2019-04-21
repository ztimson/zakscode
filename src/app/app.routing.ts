import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AuthService} from './auth.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'admin', component: AdminComponent, canActivate: [AuthService]},
            {path: '**', redirectTo: ''}
        ])
    ],
    exports: [RouterModule]
})
export class AppRouting {}
