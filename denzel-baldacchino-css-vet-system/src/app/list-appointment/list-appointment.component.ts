import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../dto/appointment.dto';
import { DatePipe, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { AppointmentStatusPipe } from '../pipes/appointment-status.pipe';
import * as Exceljs from 'exceljs';
import * as FileSaver from 'file-saver';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
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
    const workbook = new Exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Appointments');
  
    // Define the columns based on the Appointment properties
    worksheet.columns = [
      { header: 'Appointment ID', key: 'appointmentId', width: 15 },
      { header: 'Patient Name', key: 'patientName', width: 20 },
      { header: 'Animal Type', key: 'animalType', width: 15 },
      { header: 'Owner ID Card', key: 'ownerIdCardNumber', width: 20 },
      { header: 'Owner Name', key: 'ownerName', width: 20 },
      { header: 'Owner Surname', key: 'ownerSurname', width: 20 },
      { header: 'Contact Number', key: 'ownerContactNumber', width: 15 },
      { header: 'Appointment Date', key: 'appointmentDate', width: 15 },
      { header: 'Appointment Time', key: 'appointmentTime', width: 10 },
      { header: 'Duration (min)', key: 'appointmentDuration', width: 15 },
      { header: 'Reason for Appointment', key: 'reasonForAppointment', width: 25 },
      { header: 'Vet Notes', key: 'vetNotes', width: 30 },
      { header: 'Status', key: 'status', width: 12 }
    ];
  
    this.appointments.forEach(app => {
      const status = this.getStatus(app.appointmentDate, app.appointmentTime);
      const row = worksheet.addRow({
        appointmentId: app.appointmentId,
        patientName: app.patientName,
        animalType: app.animalType,
        ownerIdCardNumber: app.ownerIdCardNumber,
        ownerName: app.ownerName,
        ownerSurname: app.ownerSurname,
        ownerContactNumber: app.ownerContactNumber,
        appointmentDate: app.appointmentDate,
        appointmentTime: app.appointmentTime,
        appointmentDuration: app.appointmentDuration,
        reasonForAppointment: app.reasonForAppointment,
        vetNotes: app.vetNotes,
        status: status
      });
  
      // Highlight 'Upcoming' appointments
      if (status === 'Upcoming') {
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'C6EFCE' } // Light green
          };
          cell.font = {
            bold: true,
            color: { argb: '006100' } // Dark green text
          };
        });
      }
    });
  
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, 'appointments.xlsx');
    });
  }
    
  getStatus(date: Date, time: string): 'Upcoming' | 'Past' {
    const [day, month, year] = date.toString().split('/').map(part => parseInt(part, 10));
    const [hour, minute] = time.split(':').map(part => parseInt(part, 10));
  
    if (!day || !month || !year || isNaN(hour) || isNaN(minute)) {
    }
  
    const appointmentDateTime = new Date(year, month - 1, day, hour, minute);
    const now = new Date();
  
    return appointmentDateTime > now ? 'Upcoming' : 'Past';
  }
  
  exportToPdf() {
    // Create a new PDF document
    const doc = new jsPDF('landscape');
  
    doc.setFontSize(18);
    doc.text('Appointments List', 14, 20);
  
    doc.setFontSize(10);
    
  
    const tableData = this.appointments.map(app => {
      const status = this.getStatus(app.appointmentDate, app.appointmentTime);
      return [
        app.appointmentId,
        app.patientName,
        app.animalType,
        `${app.ownerName} ${app.ownerSurname}`,
        app.ownerIdCardNumber,
        app.ownerContactNumber,
        app.appointmentDate,
        app.appointmentTime,
        `${app.appointmentDuration} min`,
        status,
        app.reasonForAppointment,
        app.vetNotes
      ];
    });
  
    const headers = [
      'ID',
      'Patient',
      'Animal',
      'Owner',
      'Owner ID',
      'Owner Contact Number',
      'Date',
      'Time',
      'Duration',
      'Status',
      'Reason',
      'Vet Notes'
    ];
  
    const tableConfig = {
      head: [headers],
      body: tableData,
      startY: 35,
      margin: { top: 20 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255, 
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] 
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, 
        1: { cellWidth: 'auto' }, 
        2: { cellWidth: 'auto' }, 
        3: { cellWidth: 'auto' }, 
        4: { cellWidth: 'auto' }, 
        5: { cellWidth: 'auto' }, 
        6: { cellWidth: 'auto' }, 
        7: { cellWidth: 'auto' }, 
        8: { cellWidth: 'auto' } 
      },
      didDrawCell: (data: any) => {
        if (data.column.index === 9 && data.cell.raw === 'Upcoming') {
          doc.setFillColor(198, 239, 206); 
          doc.rect(
            data.cell.x,
            data.cell.y,
            data.cell.width,
            data.cell.height,
            'F'
          );
          doc.setTextColor(0, 97, 0); 
          doc.text(
            data.cell.raw,
            data.cell.x + data.cell.width / 2,
            data.cell.y + data.cell.height / 2 + 2,
            { align: 'center' }
          );
          return false; 
        }
        return true;
      }
    };
  
    (doc as any).autoTable(tableConfig);
  
    doc.save('appointments.pdf');
  }
}
