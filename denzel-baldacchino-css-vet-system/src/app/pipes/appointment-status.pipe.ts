import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {

  transform(date: Date, time: string): string {
    const [day, month, year] = date.toString().split('/').map(part => parseInt(part, 10));
    const [hour, minute] = time.split(':').map(part => parseInt(part, 10));

    if (!day || !month || !year || !hour || isNaN(minute)) return 'Invalid';

    const appointmentDateTime = new Date(year, month - 1, day, hour, minute);
    const now = new Date();
    return appointmentDateTime > now ? 'Upcoming' : 'Past';
  }
}
