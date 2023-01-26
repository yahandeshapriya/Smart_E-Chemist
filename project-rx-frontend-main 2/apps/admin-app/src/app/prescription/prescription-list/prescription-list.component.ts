import { Component, OnInit } from '@angular/core';
import { Prescription, PrescriptionService, Medication } from '@frontend/prescription';
import { Header, MessageService } from 'primeng/api'
import { ConfirmationService, ConfirmEventType} from 'primeng/api'
import { Router } from '@angular/router'

@Component({
  selector: 'admin-prescription-list',
  templateUrl: './prescription-list.component.html',
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: Prescription[] = []

  constructor(
    private preService: PrescriptionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this._getPrescriptions()
  }

  _getPrescriptions() {
    this.preService.getPrescriptions().subscribe(data => {
      this.prescriptions = data
    })
  }

  deletePrescription(id: string) {

      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.preService.deletePrscription(id).subscribe((response) => {
            this._getPrescriptions();
            this.messageService.add({severity:'success', summary:'Success', detail:'Prescription is deleted'});
          }, (error) => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Prescription is not deleted'});
          })
        },
        reject: (type) => {}
      });
  }
}
