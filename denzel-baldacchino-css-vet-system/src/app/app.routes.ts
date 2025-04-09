import { Routes } from '@angular/router';
import { AppointmentDetailComponent } from './view-appointment-details/view-appointment-details.component';
import { AppointmentListComponent } from './list-appointment/list-appointment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { LoginComponent } from './login/login.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: "add", component: AddAppointmentComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN', 'RECEPTIONIST'] } },
    { path: "appointments", component: AppointmentListComponent, canActivate: [AuthGuard] },
    { path: "appointments/:id", component: AppointmentDetailComponent, canActivate: [AuthGuard] },
    { path: "appointments/update/:id", component: UpdateAppointmentComponent, canActivate: [AuthGuard]},
    { path: "login", component: LoginComponent },
    { path: "", redirectTo: "/appointments", pathMatch: "full" },
    { path: "**", redirectTo: "/login" }, 
];