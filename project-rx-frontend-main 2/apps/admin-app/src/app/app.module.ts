import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { ContainerComponent } from './shared/container/container.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DrugsListComponent } from './drugs/drugs-list/drugs-list.component';
import { DrugsFormComponent } from './drugs/drugs-form/drugs-form.component';
import { DocListComponent } from './doctors/doc-list/doc-list.component';
import { SingleDocComponent } from './doctors/single-doc/single-doc.component';

import { DrugsService } from '@frontend/drugs';
import { DoctorsService } from '@frontend/doctors';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SocketService } from '@frontend/socket';

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
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { PrescriptionListComponent } from './prescription/prescription-list/prescription-list.component';

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
  FieldsetModule,
  PanelModule,
  BadgeModule,
  ImageModule,
];

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'drugs',
        component: DrugsListComponent,
      },
      {
        path: 'drugs/form',
        component: DrugsFormComponent,
      },
      {
        path: 'drugs/form/:id',
        component: DrugsFormComponent,
      },
      {
        path: 'doctors',
        component: DocListComponent,
      },
      {
        path: 'doctors/:id',
        component: SingleDocComponent,
      },
      {
        path: 'prescriptions',
        component: PrescriptionListComponent,
      },
    ],
  },
];

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SidebarComponent,
    DrugsListComponent,
    DrugsFormComponent,
    DocListComponent,
    SingleDocComponent,
    PrescriptionListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(config),
    ...UX_MODULES,
  ],
  providers: [
    DrugsService,
    MessageService,
    ConfirmationService,
    DoctorsService,
    SocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
