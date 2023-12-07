import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddServiceCenterComponent } from './component/admin/add-service-center/add-service-center.component';
import { EditServiceCenterComponent } from './component/admin/edit-service-center/edit-service-center.component';
import { HomepageComponent } from './component/user/homepage/homepage.component';
import { DashboardComponent } from './component/user/dashboard/dashboard.component';
import { AppointmentComponent } from './component/user/appointment/appointment.component';
import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'admin/dashboard', component: AdmindashboardComponent },
  // { path: 'admin/addServiceCenter', component: AddServiceCenterComponent },
  // { path: 'admin/editServiceCenter', component: EditServiceCenterComponent },
  // { path: 'user/homepage', component: HomepageComponent },
  // { path: 'user/dashboard', component: DashboardComponent },
  // { path: 'user/appointment', component: AppointmentComponent },

  { path: 'admin/dashboard', component: AdmindashboardComponent ,canActivate:[AdminGuard]},
  { path: 'admin/addServiceCenter', component: AddServiceCenterComponent,canActivate:[AdminGuard] },
  { path: 'admin/editServiceCenter', component: EditServiceCenterComponent,canActivate:[AdminGuard] },
  { path: 'user/homepage', component: HomepageComponent,canActivate:[UserGuard] },
  { path: 'user/dashboard', component: DashboardComponent ,canActivate:[UserGuard]},
  { path: 'user/appointment', component: AppointmentComponent ,canActivate:[UserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
