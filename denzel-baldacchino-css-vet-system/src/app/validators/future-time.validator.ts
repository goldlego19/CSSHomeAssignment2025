import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function futureTimeValidator(appointmentDateControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const timeValue = control.value; 
    if (!timeValue) {console.log("time Value not found");return null;}

    const formGroup = control.parent; 
    if (!formGroup) {console.log("FormGroup not found");return null;}

    const appointmentDateValue = formGroup.get(appointmentDateControlName)?.value;
    console.log("appointmentDateValue: ", appointmentDateValue);
    if (!appointmentDateValue) {console.log("date not found");return null;}

    const appointmentDate = new Date(appointmentDateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    appointmentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    console.log("today: ", today);
    console.log("appointmentDate: ", appointmentDate);
    
    if (appointmentDate > today) {
        console.log("Appointment date is in the future");
        
      return null;
    }

    
    const [hours, minutes] = timeValue.split(':').map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);

    const currentTime = new Date();
    currentTime.setSeconds(0, 0);

    return selectedTime > currentTime ? null : { pastTime: true }; // Return error if time is in the past
  };
}