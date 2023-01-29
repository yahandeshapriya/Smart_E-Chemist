import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ContainerComponent } from './shared/container/container.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions/prescriptions.component';
import { AddPrescriptionComponent } from './prescriptions/add-prescription/add-prescription.component';

import { DrugsService } from '@frontend/drugs';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DoctorsService } from '@frontend/doctors';
import { CookieService } from 'ngx-cookie-service';
import { PrescriptionService } from '@frontend/prescription';

//ux modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';

const UX_MODULES = [
  BrowserAnimationsModule,
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  DropdownModule,
  ToastModule,
  ConfirmDialogModule,
  DialogModule,
  AutoCompleteModule
];

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent
      },
      {
        path: 'prescriptions/new',
        component: AddPrescriptionComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContainerComponent,
    ProfileComponent,
    PrescriptionsComponent,
    AddPrescriptionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ...UX_MODULES,
  ],
  providers: [
    DrugsService,
    DoctorsService,
    MessageService,
    ConfirmationService,
    CookieService,
    PrescriptionService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
