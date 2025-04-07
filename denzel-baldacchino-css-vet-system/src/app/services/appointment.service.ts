import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Appointment } from "../dto/appointment.dto";
import { Injectable } from "@angular/core";

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
    
}