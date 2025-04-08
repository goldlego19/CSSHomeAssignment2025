import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';
import { Router } from '@angular/router';
import { AppointmentAddUpdate } from '../dto/appointment-add-update.dto';
import { Appointment } from '../dto/appointment.dto';
import { DatePipe } from '@angular/common';


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

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router:Router,private datepipe:DatePipe) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['',[Validators.required]],
      animalType: ['',[Validators.required]],
      ownerIdCardNumber: ['',[Validators.required]],
      ownerName: ['',[Validators.required]],
      ownerSurname: ['',[Validators.required]],
      ownerContactNumber: ['',[Validators.required]],
      appointmentDate: ['',[Validators.required]],
      appointmentTime: ['',[Validators.required]],
      appointmentDuration: ['',[Validators.required]],
      reasonForAppointment: ['',[Validators.required]],
      vetNotes: ['',[Validators.required]]
    });
  }

  submitForm() {
    if (this.appointmentForm.invalid) return;
    
    const raw = this.appointmentForm.value;
    const formattedDate = this.datepipe.transform(raw.appointmentDate, 'dd/MM/yyyy');
    
    const appointmentToAdd: AppointmentAddUpdate = {
      ...raw,
      appointmentDate: formattedDate?.toString(),
    }
    console.log(JSON.stringify(appointmentToAdd));
    this.appointmentService.addAppointment(appointmentToAdd).subscribe((addedAppointment:Appointment) => {
      console.log(JSON.stringify(addedAppointment));
      this.router.navigate(['/appointments']);
    });  
  }

  shouldProcessControlValidationMessages(controlName:string){
    let control = this.appointmentForm.get(controlName)
    return ((control!.touched|| control!.dirty)&& control!.errors);
    }
}
