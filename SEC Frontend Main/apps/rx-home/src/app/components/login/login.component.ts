import { Component, OnInit } from '@angular/core';
import { DoctorsService, Doctor } from '@frontend/doctors';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username!: string
  password!: string
  doctor!: Doctor

  isSubmitted = false
  usernameIncorrect = false
  passwordIncorrect = false

  constructor(
    private docService: DoctorsService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // this.docService.login(this.username, this.password).subscribe()
    this.isSubmitted = true

    this.docService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.doctor = data
        console.log(this.doctor);
        this.cookieService.set("user_id", this.doctor._id)
        window.location.href = `http://localhost:4100/`
        
      },
      error: (error) => {
        if(error.status === 401){
          this.usernameIncorrect = true
          return
        } else if(error.status === 403){
          this.passwordIncorrect = true
        }
      }
    })
  }
}
