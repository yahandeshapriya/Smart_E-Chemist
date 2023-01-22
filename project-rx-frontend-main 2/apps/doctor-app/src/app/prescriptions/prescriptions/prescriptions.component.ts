import { Component, OnInit } from '@angular/core';
import { Prescription, PrescriptionService, Medication } from '@frontend/prescription';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'doctor-prescriptions',
  templateUrl: './prescriptions.component.html',
})
export class PrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = []

  constructor(
    private preService: PrescriptionService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this._getMyPrescriptions()
  }

  _getMyPrescriptions() {
    this.preService.getMyList(this.cookieService.get("user_id")).subscribe(data => {
      this.prescriptions = data
      
    })
  }
}
