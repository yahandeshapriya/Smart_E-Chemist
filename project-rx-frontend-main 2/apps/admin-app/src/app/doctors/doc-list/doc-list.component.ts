import { Component, OnInit } from '@angular/core';
import { DoctorsService, Doctor } from '@frontend/doctors';
import { Header, MessageService } from 'primeng/api'
import { ConfirmationService, ConfirmEventType} from 'primeng/api'
import { Router } from '@angular/router'

@Component({
  selector: 'admin-doc-list',
  templateUrl: './doc-list.component.html',
})
export class DocListComponent implements OnInit {

  docList: Doctor[] = []
  verifiedDoctors: Doctor[] = []
  new_users: Doctor[] = []

  newUserMode = false

  constructor(
    private docService: DoctorsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getDoctors()
  }

  _getDoctors() {
    this.docService.getDoctors().subscribe(data => {
      this.docList = data
      
      for(let i = 0; i < data.length; i++){
        const item = data[i]
        if(item.isProfileVerified){
          this.verifiedDoctors.push(item)
        }
      }

      for(let i = 0; i < data.length; i++) {
        const item = data[i]
        if(!item.isProfileVerified) {
          this.new_users.push(item)
        }
      }
    })
  }

  switchNewUsersMode() {
    this.newUserMode = true
  }

  goBack() {
    this.newUserMode = false
  }

}
