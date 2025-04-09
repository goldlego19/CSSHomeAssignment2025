import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Appointment } from "../dto/appointment.dto";
import { Injectable } from "@angular/core";
import { AppointmentAddUpdate } from "../dto/appointment-add-update.dto";
import { AuthorisationService } from "./authorisation.service";

@Injectable({
    providedIn: "root"
})
export class AppointmentService {

    endpoint: string = "http://localhost:8080/appointment";

    constructor(private http: HttpClient, private authService: AuthorisationService) {}

    private getHttpHeaders(): { headers: HttpHeaders } {
        const token = this.authService.getToken() || '';
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        };
    }

    getAllAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.endpoint, this.getHttpHeaders());
    }

    getAppointmentById(id: number): Observable<Appointment> {
        return this.http.get<Appointment>(this.endpoint + "/" + id, this.getHttpHeaders());
    }

    addAppointment(appointment: AppointmentAddUpdate): Observable<Appointment> {
        return this.http.post<Appointment>(this.endpoint, appointment, this.getHttpHeaders());
    }

    updateAppointment(appointmentToUpdate: AppointmentAddUpdate, id: number): Observable<Appointment> {
        return this.http.put<Appointment>(this.endpoint + "/" + id, appointmentToUpdate, this.getHttpHeaders());
    }

    deleteAppointment(id: number): Observable<Appointment> {
        console.log("Deleting appointment with id: " + id);
        console.log("Endpoint: " + this.endpoint + "/" + id);
        console.log("Headers: ", this.getHttpHeaders());
        return this.http.delete<Appointment>(this.endpoint + "/" + id, this.getHttpHeaders());
    }
}