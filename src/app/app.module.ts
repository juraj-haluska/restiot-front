import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AclComponent } from './components/acl/acl.component';

import { ToolbarModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

import { ConnectorService } from './services/connector.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AclComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ToolbarModule,
    TabMenuModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    DataTableModule,
    SharedModule,
    ConfirmDialogModule,
    GrowlModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ConnectorService, ApiService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
