import { Drug } from '@frontend/drugs';

export class Medication {
    medication?: Drug
    amount?: string
    route?: string
    frequency?: string
    prn?: string
    howMuch?: string
    refills?: number
}