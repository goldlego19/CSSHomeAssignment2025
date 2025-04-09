import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    
    // Set the time of both dates to midnight for accurate comparison
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    return selectedDate >= currentDate ? null : { pastDate: true };
    }
}