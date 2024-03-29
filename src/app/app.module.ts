import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MapComponent } from './map/map.component';
import { AddpigmodalComponent } from './addpigmodal/addpigmodal.component';
import { InfomodalComponent } from './infomodal/infomodal.component';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { TogglestatusmodalComponent } from './togglestatusmodal/togglestatusmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    MapComponent,
    AddpigmodalComponent,
    InfomodalComponent,
    DeletemodalComponent,
    TogglestatusmodalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
