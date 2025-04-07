import { Routes } from '@angular/router';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: "add", component:AddAppointmentComponent},
    {path: "appointments", component:AppointmentListComponent},
    {path: "appointments/:id", component:AppointmentDetailComponent},
    {path: "login", component:LoginComponent},
    {path: "", redirectTo: "/appointments", pathMatch: "full"},
];
