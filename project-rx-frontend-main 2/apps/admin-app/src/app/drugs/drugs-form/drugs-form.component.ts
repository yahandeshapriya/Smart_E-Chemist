import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { DrugsService, Drug } from '@frontend/drugs'
import { MessageService } from 'primeng/api'
import { timer, firstValueFrom } from 'rxjs'

@Component({
  selector: 'admin-drugs-form',
  templateUrl: './drugs-form.component.html',
  // styleUrls: ['./drugs-form.component.css'],
})

export class DrugsFormComponent implements OnInit {
  
  form!: FormGroup

  dosageForms: DosageForm[]
  dosageForm: DosageForm

  isSubmitted = false
  editMode = false
  currentDrugId!: string

  constructor(
    private formBuilder: FormBuilder,
    private drugsService: DrugsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {
    this.dosageForms = [
      {form: 'tablet'},
      {form: 'capsule'},
      {form: 'pills'},
      {form: 'lozenges'},
      {form: 'powder(oral)'},
      {form: 'syrup'},
      {form: 'oral_drops'},
      {form: 'mouthwashes'},
      {form: 'creams'},
      {form: 'gels'},
      {form: 'sprays'},
      {form: 'suppository'},
      {form: 'injection'},
      {form: 'inhaler'}
    ]
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      generic_name: ['', Validators.required],
      brand_name: ['', Validators.required],
      dosage_form: ['', Validators.required],
      manufacturer: ['']
    })

    this._checkEditMode()
  }

  onSubmit() {
    this.isSubmitted = true

    if(this.form.invalid){
      return
    }

    const drug: Drug = {
      _id: this.currentDrugId,
      generic_name: this.form.controls.generic_name.value,
      brand_name: this.form.controls.brand_name.value,
      dosage_form: this.form.controls.dosage_form.value,
      manufacturer: this.form.controls.manufacturer.value ? this.form.controls.manufacturer.value : 'N/A'
    }

    if(this.editMode){
      this._updateDrug(drug)
    }
    else{
      this._createDrug(drug)
    }
  }

  private _createDrug(drug: Drug) {

    this.drugsService.createDrug(drug).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: "Success",
          detail: 'Drug is created'
        })
        firstValueFrom(timer(2000)).then((done) => {
          this.location.back()
        })
      },
      error: (error) => {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'Drug is not created'})
      }
    })

  }

  private _updateDrug(drug: Drug) {
    this.drugsService.updateDrug(drug).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: "Success",
          detail: 'Drug is updated'
        })
        firstValueFrom(timer(2000)).then((done) => {
          this.location.back()
        })
      },
      error: (error) => {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'Drug is not updated'})
      }
    })

  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if(params.id){
        this.editMode = true
        this.currentDrugId = params.id

          this.drugsService.getDrug(params.id).subscribe((drug) => {
          this.form.controls.generic_name.setValue(drug.generic_name)
          this.form.controls.brand_name.setValue(drug.brand_name)
          this._dosageForm(drug.dosage_form)
          this.form.controls.dosage_form.setValue(this.dosageForm.form)
          this.form.controls.manufacturer.setValue(drug.manufacturer)
        })
      }
    })
  }

  private _dosageForm(form: string) {
    this.dosageForms.map((dform) => {
      if(dform.form == form){
        this.dosageForm = dform;
      }
    })
  }

  goBack() {
    this.location.back()
  }

  clear() {
    this.form.controls.generic_name.setValue('');
    this.form.controls.brand_name.setValue('');
    this.form.controls.dosage_form.setValue('');
    this.form.controls.manufacturer.setValue('');
  }
}

interface DosageForm {
  form: string;
}
