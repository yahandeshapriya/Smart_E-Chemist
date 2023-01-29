import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService, Doctor } from '@frontend/doctors';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'doctor-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent implements OnInit {

  doctor! : Doctor
  unAuthorized = false

  constructor(
    private route: ActivatedRoute,
    private docService: DoctorsService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getDoctor()
  }

  getDoctor() {
    const id = this.cookieService.get("user_id")

    if(!id) {
      this.unAuthorized = true
      return
    }

    this.docService.getDoctor(id).subscribe(data => {
        this.doctor = data 
    })
    
  }

  navigateToLogin() {
    window.location.href = 'http://localhost:4200/login'
  }

}

