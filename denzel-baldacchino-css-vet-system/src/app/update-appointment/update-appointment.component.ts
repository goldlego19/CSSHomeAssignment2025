import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import { AppointmentAddUpdate } from '../dto/appointment-add-update.dto';
import { futureDateValidator } from '../validators/future-date.validator';
import { futureTimeValidator } from '../validators/future-time.validator';
import { AuthorisationService } from '../services/authorisation.service';

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
    private authService: AuthorisationService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  getUserRole(): string | null {
    return this.authService.getUserRole();
  }
  ngOnInit(): void {
    const userRole = this.getUserRole();
    // if the user is a receptionist, the vet notes field will be optional
    if (userRole == 'RECEPTIONIST') {
      this.appointmentForm = this.formBuilder.group({
        patientName: ['', [Validators.required]],
        animalType: ['', [Validators.required]],
        ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^\d+[A-Za-z]$/)]], // Numeric string with an alphabetical character at the end
        ownerName: ['', [Validators.required]],
        ownerSurname: ['', [Validators.required]],
        ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(8)]], // Numeric, non-negative, at least 8 characters
        appointmentDate: ['', [Validators.required, futureDateValidator()]],
        appointmentTime: ['', [Validators.required, futureTimeValidator('appointmentDate')]],
        appointmentDuration: ['', [Validators.required]],
        reasonForAppointment: ['', [Validators.required]],
        vetNotes: ['']
      });
    }
    else {
    this.appointmentForm = this.formBuilder.group({
      patientName: ['', [Validators.required]],
            animalType: ['', [Validators.required]],
            ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^\d+[A-Za-z]$/)]], // Numeric string with an alphabetical character at the end
            ownerName: ['', [Validators.required]],
            ownerSurname: ['', [Validators.required]],
            ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(8)]], // Numeric, non-negative, at least 8 characters
            appointmentDate: ['', [Validators.required, futureDateValidator()]],
            appointmentTime: ['', [Validators.required, futureTimeValidator('appointmentDate')]],
            appointmentDuration: ['', [Validators.required]],
            reasonForAppointment: ['', [Validators.required]],
            vetNotes: ['', [Validators.required]]
    });
  }
    this.appointmentForm.get('appointmentDate')?.valueChanges.subscribe(() => {
      this.appointmentForm.get('appointmentTime')?.updateValueAndValidity();
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
      const [day, month, year] = appointment.appointmentDate!.toString().split('/');
      const formattedDate = `${year}-${month}-${day}`;

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
