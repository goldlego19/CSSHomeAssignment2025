import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import { DatePipe, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { AppointmentStatusPipe } from '../pipes/appointment-status.pipe';

@Component({
  selector: 'app-list-appointment',
  standalone: true,
  imports: [RouterLink,NgClass,AppointmentStatusPipe],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css',
  providers: [DatePipe]
})
export class AppointmentListComponent implements OnInit {

  ngOnInit(): void {
    this.initialiseAppointments();
    this.checkForCreationNotification();
  }
  appointments: Appointment[] = [];

  constructor(private appointmentServices:AppointmentService) { }

  initialiseAppointments(){
    this.appointmentServices.getAllAppointments().subscribe((response: Appointment[]) => {
      this.appointments = response;
    })
  }

  private checkForCreationNotification() {
    const created = history.state?.created;
    if (created) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'New appointment created successfully!',
        showConfirmButton: false,
        timer: 3000
      });
      // Clear the state
      history.replaceState({ ...history.state, created: false }, '');
    }
  }

  confirmDelete(appointmentId: number, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAppointment(appointmentId, index);
      }
    });
  }

  deleteAppointment(appointmentId: number, index: number) {
    this.appointmentServices.deleteAppointment(appointmentId).subscribe({
      next: () => {
        this.appointments.splice(index, 1);
        Swal.fire(
          'Deleted!',
          'The appointment has been deleted.',
          'success'
        );
      },
      error: (err) => {
        console.error('Error deleting appointment:', err);
        Swal.fire(
          'Error!',
          'Failed to delete the appointment.',
          'error'
        );
      }
    });
  }


  exportToExcel() {
    return null;
  }
  exportToPDF() {
    return null;
  }
}
