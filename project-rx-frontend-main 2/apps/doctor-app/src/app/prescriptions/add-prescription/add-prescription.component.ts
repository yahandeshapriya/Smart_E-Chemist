/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { PrescriptionService, Prescription, Medication } from '@frontend/prescription';
import { Drug, DrugsService } from '@frontend/drugs';
import { MessageService } from 'primeng/api'
import { timer, firstValueFrom } from 'rxjs'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'doctor-add-prescription',
  templateUrl: './add-prescription.component.html',
})
export class AddPrescriptionComponent implements OnInit {

  form!: FormGroup
  medications: Medication[] = []
  isSubmitted = false
  isAdd = false

  drug!: Drug
  drugList: Drug[] = []
  filteredDrugs!: Drug[]

  constructor(
    private formBuilder: FormBuilder,
    private preService: PrescriptionService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location,
    private drugService: DrugsService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      patientName: ['', Validators.required],
      patientAge: ['', Validators.required],
      medication: ['', Validators.required],
      amount: ['', Validators.required],
      route: ['', Validators.required],
      frequency: ['', Validators.required],
      prn: [''],
      howMuch: ['', Validators.required],
      refills: ['', Validators.required]
    })

    this._getDrugs()
  }

  onSubmit() {
    this.isSubmitted = true

    if(this.form.controls['patientName'].invalid || this.form.controls['patientAge'].invalid){
      return
    }

    const prescription: Prescription = {
      patientName: this.form.controls['patientName'].value,
      patientAge: this.form.controls['patientAge'].value,
      medications: this.medications,
      doctor: this.cookieService.get("user_id")
    }

    this.preService.addPrescription(prescription).subscribe(data => {
      console.log(data);
      
    })
    
  }

  onAdd() {
    this.isAdd = true

    if(this._checkValidation()) {
      return
    }

    const newMedication: Medication = {
      medication: this.form.controls['medication'].value,
      amount: this.form.controls['amount'].value,
      route: this.form.controls['route'].value,
      frequency: this.form.controls['frequency'].value,
      prn: this.form.controls['prn'].value,
      howMuch: this.form.controls['howMuch'].value,
      refills: this.form.controls['refills'].value
    }
    
    this.medications.push(newMedication)

    this._clearFields()

    this.isAdd = false

  }

  clear() {

  }

  goBack() {

  }

  _getDrugs() {
    this.drugService.getDrugs().subscribe(data => {
      this.drugList = data
    })
  }

  _checkValidation() {
    return this.form.controls['medication'].invalid ||
          this.form.controls['amount'].invalid ||
          this.form.controls['route'].invalid ||
          this.form.controls['frequency'].invalid ||
          this.form.controls['howMuch'].invalid ||
          this.form.controls['refills'].invalid
  }

  _clearFields() {
    this.form.controls['medication'].setValue('')
    this.form.controls['amount'].setValue('')
    this.form.controls['route'].setValue('')
    this.form.controls['frequency'].setValue('') 
    this.form.controls['prn'].setValue('') 
    this.form.controls['howMuch'].setValue('') 
    this.form.controls['refills'].setValue('')

    this.form = this.formBuilder.group({
      patientName: ['', Validators.required],
      patientAge: ['', Validators.required],
      medication: ['', Validators.required],
      amount: ['', Validators.required],
      route: ['', Validators.required],
      frequency: ['', Validators.required],
      prn: [''],
      howMuch: ['', Validators.required],
      refills: ['', Validators.required]
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterDrugs(event: any) {
    let filtered : Drug[] = [];
        let query = event.query;

        for(let i = 0; i < this.drugList.length; i++) {
            let drug = this.drugList[i]
            if (drug?.brand_name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(drug);
            }
        }

        this.filteredDrugs = filtered;
   
  }
}
