import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserRegistrationComponent } from './features/user-registration/user-registration.component';
import { AdminPortalComponent } from './features/admin-portal/admin-portal.component';
import { UserListComponent } from './features/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserRegistrationComponent,
    AdminPortalComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
