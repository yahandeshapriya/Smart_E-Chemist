import { Component, OnInit } from '@angular/core';
import { Specialities } from '@frontend/doctors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorsService, Doctor } from '@frontend/doctors';
import { Router } from '@angular/router';

@Component({
  selector: 'home-doctors-form',
  templateUrl: './doctors-form.component.html',
})

export class DoctorsFormComponent implements OnInit {

  form!: FormGroup
  isSubmitted = false
  isPasswordUnMatch = false
  imgFile = null
  imageName = ''
  emptyImage = false

  speciality!: string
  filterdSpecialities: any[] = []
  specialities = this.sp.specialities

  constructor(
    private formBuilder: FormBuilder,
    private sp: Specialities,
    private docService: DoctorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['', Validators.required],
      nic: ['', Validators.required],
      address: ['', Validators.required],
      slmcRegNo: ['', Validators.required],
      speciality: ['', Validators.required],
      hospital: ['', Validators.required],
      slmcDocument: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9])*$")]],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    })
  }

  //Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]

  onSubmit() {
    this.isSubmitted = true

    if(!this.imgFile) {
      this.emptyImage = true
      console.log(123); 
    }

    if(this.form.invalid){
      return
    }

    if(this.form.controls['password'].value !== this.form.controls['rePassword'].value) {
      this.isPasswordUnMatch = true
      return
    }

    const formData = new FormData()
    formData.append('firstName', this.form.controls['firstName'].value)
    formData.append('lastName', this.form.controls['lastName'].value)
    formData.append('email', this.form.controls['email'].value)
    formData.append('mobile', this.form.controls['mobile'].value)
    formData.append('nic', this.form.controls['nic'].value)
    formData.append('address', this.form.controls['address'].value)
    formData.append('slmcRegNo', this.form.controls['slmcRegNo'].value)
    formData.append('speciality', this.form.controls['speciality'].value)
    formData.append('hospital', this.form.controls['hospital'].value)
    formData.append('slmcDocument', this.imgFile, this.imgFile.name)
    formData.append('username', this.form.controls['username'].value)
    formData.append('passwordHash', this.form.controls['password'].value)

    // const doctor: Doctor = {
    //   firstName: this.form.controls['firstName'].value,
    //   lastName: this.form.controls['lastName'].value,
    //   email: this.form.controls['email'].value,
    //   mobile: this.form.controls['mobile'].value,
    //   nic: this.form.controls['nic'].value,
    //   address: this.form.controls['address'].value,
    //   slmcRegNo: this.form.controls['slmcRegNo'].value,
    //   speciality: this.form.controls['speciality'].value,
    //   hospital: this.form.controls['hospital'].value,
    //   username: this.form.controls['username'].value,
    //   passwordHash: this.form.controls['password'].value
    // }

    this._register(formData)
    
    

  }

  _register(doctor: FormData) {
    // this.docService.createDoctor(doctor).subscribe()
    this.docService.createDoctor(doctor).subscribe({
      next: (data) => {
        this.router.navigate(['register/verify'])
      },
      error: (error) => {
        
      }
    })
  }

  filterSpecialities(event: any) {
    let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.specialities.length; i++) {
            let item = this.specialities[i];
            if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item.name);
            }
        }

        this.filterdSpecialities = filtered;
  }

  get formControls() {
    return this.form.controls
  }

  onImageChange(e) {
    this.imgFile = e.target.files[0]
    this.imageName = this.imgFile.name
  }
}
