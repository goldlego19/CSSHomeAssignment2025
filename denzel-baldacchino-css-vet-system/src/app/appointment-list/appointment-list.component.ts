import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {

  ngOnInit(): void {
    this.initialiseAppointments();
  }
  appointments: Appointment[] = [];

  constructor(private appointmentServices:AppointmentService) { }

  initialiseAppointments(){
    this.appointmentServices.getAllAppointments().subscribe((response: Appointment[]) => {
      this.appointments = response;
    })
  }
}
