import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';

import {HttpClientModule} from '@angular/common/http';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MapComponent,
    OrderByPipe
  ],
  declarations: [MapComponent, OrderByPipe]
})
export class SharedModule { }
