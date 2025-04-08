import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentAddUpdate } from '../dto/appointment-add-update.dto';

@Component({
  selector: 'app-update-appointment',
  imports: [ReactiveFormsModule],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css',
  providers: [DatePipe],
})
export class UpdateAppointmentComponent {

  appointmentId!: number;
  appointmentForm!: FormGroup;
  appointment!: Appointment;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      animalType: ['', Validators.required],
      ownerIdCardNumber: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerSurname: ['', Validators.required],
      ownerContactNumber: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      appointmentDuration: ['', Validators.required],
      reasonForAppointment: ['', Validators.required],
      vetNotes: ['', Validators.required],
    });
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.appointmentId = +idParam;
        this.loadAppointment(this.appointmentId);
      }
    });
  }

  loadAppointment(id: number): void {
    this.appointmentService.getAppointmentById(id).subscribe((appointment: Appointment) => {
      const [day, month, year] = this.datepipe.transform(appointment.appointmentDate, 'dd/MM/yyyy')!.split('/');
      const formattedDate = `${year}-${month}-${day}`; // dd/MM/yyyy format

      this.appointmentForm.patchValue({
        ...appointment,
        appointmentDate: formattedDate,
      });
    });
  }

  submitForm(): void {
    if (this.appointmentForm.invalid) return;

    const raw = this.appointmentForm.value;
    const formattedDate = this.datepipe.transform(raw.appointmentDate, 'dd/MM/yyyy');

    const updatedAppointment: AppointmentAddUpdate = {
      ...raw,
      appointmentDate: formattedDate?.toString(),
    };

    this.appointmentService.updateAppointment(updatedAppointment,this.appointmentId)
      .subscribe(() => {
        this.router.navigate(['/appointments']);
      });
  }

  shouldProcessControlValidationMessages(controlName: string) {
    const control = this.appointmentForm.get(controlName);
    return ((control?.touched || control?.dirty) && control?.errors);
  }
}
