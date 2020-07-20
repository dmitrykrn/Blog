import { AlertService, AlertType, Alert } from './shared/services/alert.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { DashboardPageComponent } from './views/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './views/create-page/create-page.component';
import { EditPageComponent } from './views/edit-page/edit-page.component';
import { AuthService } from './shared/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthNodeService } from './shared/services/auth.service.node';
import { SearchPipe } from './shared/search.pipe';
import { AuthGuard } from './shared/services/auth.guard';
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SearchPipe,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent,
                children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
                    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
                    {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthNodeService,
        AuthGuard,
        AlertService
    ]
})
export class AdminModule {
}
