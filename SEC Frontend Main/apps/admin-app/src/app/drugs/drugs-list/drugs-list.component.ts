import { Component, OnInit } from '@angular/core';
import { DrugsService, Drug } from '@frontend/drugs'
import { SocketService } from '@frontend/socket';
import { Header, MessageService } from 'primeng/api'
import { ConfirmationService, ConfirmEventType} from 'primeng/api'
import { Router } from '@angular/router'

@Component({
  selector: 'admin-drugs-list',
  templateUrl: './drugs-list.component.html',
  // styleUrls: ['./drugs-list.component.css'],
})
export class DrugsListComponent implements OnInit {
  drugList: Drug[] = []

  constructor(
    private drugsService: DrugsService,
    private socketService: SocketService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getDrugs()
  }

  _getDrugs() {
    this.drugsService.getDrugs().subscribe((drugs) => {
      this.drugList = drugs
    })
  }

  updateDrug(drug_id: string){
    this.router.navigateByUrl(`drugs/form/${drug_id}`)
  }

  deleteDrug(drug_id: string){

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.drugsService.deleteDrug(drug_id).subscribe((response) => {
          this._getDrugs();
          this.messageService.add({severity:'success', summary:'Success', detail:'Drug is deleted'});
        }, (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Drug is not deleted'});
        })
      },
      reject: (type) => {}
    });
    
  }


  //socket
  onInputChange(event) {
    this.socketService.sendQuery(event.target.value)

    this.socketService.getData().subscribe(data => {
      this.drugList = data
    })

    // console.log(data)
  }

}
