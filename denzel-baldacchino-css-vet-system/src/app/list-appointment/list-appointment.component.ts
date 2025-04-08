import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-appointment',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css'
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
  deleteAppointment(appointmentId: number, index: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      // Call your service to delete the appointment
      this.appointmentServices.deleteAppointment(appointmentId).subscribe({
        next: () => {
          this.appointments.splice(index, 1);
          console.log('Appointment deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting appointment:', err);
        }
      });
    }
  }
}
