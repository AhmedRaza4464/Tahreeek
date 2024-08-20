import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NzTagModule,
    NzTableModule,
    NzSelectModule,
    NzEmptyModule,
  ],

  exports: [
    NzTagModule,
    NzEmptyModule,
    NzTableModule,
    NzSelectModule,
  ]



})
export class SharedModule { }
