import { Component, Input } from '@angular/core';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [NgClass],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.css'
})
export class AppointmentDetailComponent {

  @Input()
  id!: number;

  appointment!: Appointment;

  constructor(private appointmentService:AppointmentService, private router:Router) { }

  ngOnInit(): void {
    console.log(this.id);
    this.appointmentService.getAppointmentById(this.id).subscribe((response: Appointment) => {
      this.appointment = response;
    })
  }
  


  onBackButtonClick() {
    this.router.navigate(['/appointments']);
  }

}
