import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { AdminPortalComponent } from './features/admin-portal/admin-portal.component';
import { UserListComponent } from './features/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'admin', component: AdminPortalComponent },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
