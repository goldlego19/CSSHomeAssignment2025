import { AnimalType } from "../enum/animalType.dto";
export class Appointment {
    private _appointmentId: number;
    private _patientName: string;
    private _animalType: AnimalType;
    private _ownerIdCardNumber
    private _ownerName: string;
    private _ownerSurname: string;
    private _ownerContactNumber: string;
    private _appointmentDate: Date;
    private _appointmentTime: string;
    private _appointmentDuration: number;
    private _reasonForAppointment: string;
    private _vetNotes: string;

    constructor(
        appointmentId: number,
        patientName: string,
        animalType: AnimalType,
        ownerIdCardNumber: string,
        ownerName: string,
        ownerSurname: string,
        ownerContactNumber: string,
        appointmentDate: Date,
        appointmentTime: string,
        appointmentDuration: number,
        reasonForAppointment: string,
        vetNotes: string
    ) {
        this._appointmentId = appointmentId;
        this._patientName = patientName;
        this._animalType = animalType;
        this._ownerIdCardNumber = ownerIdCardNumber;
        this._ownerName = ownerName;
        this._ownerSurname = ownerSurname;
        this._ownerContactNumber = ownerContactNumber;
        this._appointmentDate = appointmentDate;
        this._appointmentTime = appointmentTime;
        this._appointmentDuration = appointmentDuration;
        this._reasonForAppointment = reasonForAppointment;
        this._vetNotes = vetNotes;
    }
    // Getters and Setters

    public get appointmentId(): number {
        return this._appointmentId;
    }
    public set appointmentId(value: number) {
        this._appointmentId = value;
    }

    public get patientName(): string {
        return this._patientName;
    }
    public set patientName(value: string) {
        this._patientName = value;
    }

    public get animalType(): AnimalType {
        return this._animalType;
    }
    public set animalType(value: AnimalType) {  
        this._animalType = value;
    }

    public get ownerIdCardNumber(): string {
        return this._ownerIdCardNumber;
    }
    public set ownerIdCardNumber(value: string) {
        this._ownerIdCardNumber = value;
    }

    public get ownerName(): string {
        return this._ownerName;
    }
    public set ownerName(value: string) {
        this._ownerName = value;
    }

    public get ownerSurname(): string {
        return this._ownerSurname;
    }
    public set ownerSurname(value: string) {
        this._ownerSurname = value;
    }

    public get ownerContactNumber(): string {
        return this._ownerContactNumber;
    }
    public set ownerContactNumber(value: string) {
        this._ownerContactNumber = value;
    }

    public get appointmentDate(): Date {
        return this._appointmentDate;
    }
    public set appointmentDate(value: Date) {
        this._appointmentDate = value;
    }

    public get appointmentTime(): string {
        return this._appointmentTime;
    }
    public set appointmentTime(value: string) {
        this._appointmentTime = value;
    }

    public get appointmentDuration(): number {
        return this._appointmentDuration;
    }
    public set appointmentDuration(value: number) {
        this._appointmentDuration = value;
    }

    public get reasonForAppointment(): string {
        return this._reasonForAppointment;
    }
    public set reasonForAppointment(value: string) {
        this._reasonForAppointment = value;
    }

    public get vetNotes(): string {
        return this._vetNotes;
    }
    public set vetNotes(value: string) {
        this._vetNotes = value;
    }

}