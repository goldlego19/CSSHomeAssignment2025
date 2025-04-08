import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Appointment } from "../dto/appointment.dto";
import { Injectable } from "@angular/core";
import { AppointmentAddUpdate } from "../dto/appointment-add-update.dto";

@Injectable({
    providedIn: "root"
})
export class AppointmentService{

    endpoint: string = "http://localhost:8080/appointment"
    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }
    constructor(private http: HttpClient) { }
    
    getAllAppointments():Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.endpoint, this.httpHeader);
    }
    getAppointmentById(id: number):Observable<Appointment> {
        return this.http.get<Appointment>(this.endpoint + "/" + id, this.httpHeader);
    }
    addAppointment(appointment: AppointmentAddUpdate):Observable<Appointment> {
        return this.http.post<Appointment>(this.endpoint, appointment, this.httpHeader);
    }
    updateAppointment(appointmentToUpdate:AppointmentAddUpdate, id:number){
        return this.http.put<Appointment>(this.endpoint+"/"+id,appointmentToUpdate,this.httpHeader)
    }
    deleteAppointment(id: number):Observable<Appointment> {
        return this.http.delete<Appointment>(this.endpoint + "/" + id, this.httpHeader);
    }
    
}