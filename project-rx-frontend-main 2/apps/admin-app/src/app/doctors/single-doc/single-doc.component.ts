import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService, Doctor } from '@frontend/doctors';
import { Location } from '@angular/common';
import { Header, MessageService } from 'primeng/api'
import { ConfirmationService, ConfirmEventType} from 'primeng/api'
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'admin-single-doc',
  templateUrl: './single-doc.component.html',
})
export class SingleDocComponent implements OnInit {
  doctor: Doctor = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private docService: DoctorsService,
    private location: Location,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    
  }

  ngOnInit(): void {
    this._getDoctor()
  }

  _getDoctor() {
    this.activatedRoute.params.subscribe(params => {
      if(params.id){
        this.docService.getDoctor(params.id).subscribe((data) => {
          this.doctor = data
        })
      }
    })
  }

  onDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.docService.deleteDoctor(this.doctor._id).subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: "Success",
              detail: 'User is Deleted'
            })
            firstValueFrom(timer(2000)).then((done) => {
              this.location.back()
            })
          },
          error: (error) => {
            this.messageService.add({
              severity:'error', 
              summary:'Error', 
              detail:'User is not deleted'})
          }
        })
      },
      reject: (type) => {}
    })
  }

  onVerify() {
    const doctor: Doctor = {
      isProfileVerified: true
    }

    this.docService.verifyUser(this.doctor._id, doctor).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: "Success",
          detail: 'User is Verified'
        })
        firstValueFrom(timer(2000)).then((done) => {
          this.location.back()
        })
      },
      error: (error) => {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'User is not Verified'})
      }
    })
  }

  goBack() {
    this.location.back()
  }

}
