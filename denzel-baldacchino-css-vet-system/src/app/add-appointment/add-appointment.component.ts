import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { AppointmentAddUpdate } from '../dto/appointment-add-update.dto';
import { Appointment } from '../dto/appointment.dto';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { futureDateValidator } from '../validators/future-date.validator';
import { futureTimeValidator } from '../validators/future-time.validator';

@Component({
  selector: 'app-add-appointment',
  imports: [ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css',
  providers: [DatePipe],
  standalone: true
})
export class AddAppointmentComponent {

  appointmentForm!: FormGroup;
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router:Router,private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
      animalType: ['', [Validators.required]],
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^\d+[A-Za-z]$/)]], // Numeric string with an alphabetical character at the end
      ownerName: ['', [Validators.required]],
      ownerSurname: ['', [Validators.required]],
      ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(8)]], // Numeric, non-negative, at least 8 characters
      appointmentDate: ['', [Validators.required, futureDateValidator()]], // Custom validator for future date
      appointmentTime: ['', [Validators.required, futureTimeValidator('appointmentDate')]], // Custom validator for future time
      appointmentDuration: ['', [Validators.required]],
      reasonForAppointment: ['', [Validators.required]],
      vetNotes: ['', [Validators.required]]
    });
    //this will revalidate the appointment time validator when the date changes
    this.appointmentForm.get('appointmentDate')?.valueChanges.subscribe(() => {
      this.appointmentForm.get('appointmentTime')?.updateValueAndValidity();
    });
  }

  submitForm() {
    if (this.appointmentForm.invalid) return;
    
    this.isSubmitting = true;
    
    const raw = this.appointmentForm.value;
    const formattedDate = this.datepipe.transform(raw.appointmentDate, 'dd/MM/yyyy');
    
    const appointmentToAdd: AppointmentAddUpdate = {
      ...raw,
      appointmentDate: formattedDate?.toString(),
    }
    Swal.fire({
      title: 'Adding Appointment',
      html:'Please Wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    console.log(JSON.stringify(appointmentToAdd));
    this.appointmentService.addAppointment(appointmentToAdd).subscribe({
      next: (addedAppointment: Appointment) => {
        Swal.fire({
          title: 'Success!',
          text: 'Appointment created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate with state to trigger notification in list component
            this.router.navigate(['/appointments'], {
              state: { created: true }
            });
          }
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create appointment: ' + (error.error?.message || 'Unknown error'),
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  shouldProcessControlValidationMessages(controlName:string){
    let control = this.appointmentForm.get(controlName)
    return ((control!.touched|| control!.dirty)&& control!.errors);
    }
}
