import { Medication } from "./medication"

export class Prescription {
    _id?: string
    patientName?: string
    patientAge?: number
    medications?: Medication[]
    doctor?: string
    status?: string
    dateCreated?: Date
}