import { Routes } from '@angular/router';
import { AppointmentDetailComponent } from './view-appointment-details/view-appointment-details.component';
import { AppointmentListComponent } from './list-appointment/list-appointment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { LoginComponent } from './login/login.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';

export const routes: Routes = [
    {path: "add", component:AddAppointmentComponent},
    {path: "appointments", component:AppointmentListComponent},
    {path: "appointments/:id", component:AppointmentDetailComponent},
    {path: "appointments/update/:id", component:UpdateAppointmentComponent},
    {path: "login", component:LoginComponent},
    {path: "", redirectTo: "/appointments", pathMatch: "full"},
];
