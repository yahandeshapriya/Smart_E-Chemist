import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home-verify-email',
  templateUrl: './verify-email.component.html',
  // styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {

  verifySuccess = false
  id!: string
  token!: string

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkVerifySuccess()
  }

  checkVerifySuccess() {
    this.activateRoute.params.subscribe(params => {
      if(params['id'] && params['token']){
        this.verifySuccess = true
        this.id = params['id']
        this.token = params['token']
      }
    })
  }

  navigateToLogin() {
    this.router.navigate(["/login"])
  }

}
