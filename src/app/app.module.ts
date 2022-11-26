import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MapComponent } from './map/map.component';
import { AddpigmodalComponent } from './addpigmodal/addpigmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    MapComponent,
    AddpigmodalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
