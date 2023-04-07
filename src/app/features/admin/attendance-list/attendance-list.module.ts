import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceListRoutingModule } from './attendance-list-routing.module';
import { AttendanceListComponent } from './attendance-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CallComponent } from './components/call/call.component';
import { CallDetailsComponent } from './components/call-details/call-details.component';

@NgModule({
  declarations: [AttendanceListComponent, CallComponent, CallDetailsComponent],
  imports: [CommonModule, AttendanceListRoutingModule, SharedModule],
})
export class AttendanceListModule {}
