import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const appRoute: Routes = [
  { path: '', component: AppComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [AppComponent, DashboardComponent, SidebarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
