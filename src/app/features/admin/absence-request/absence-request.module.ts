import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsenceRequestRoutingModule } from './absence-request-routing.module';
import { AbsenceRequestComponent } from './absence-request/absence-request.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbsenceRequestDetailsComponent } from './components/absence-request-details/absence-request-details.component';
import { AbsenceRequestFormComponent } from './components/absence-request-form/absence-request-form.component';

@NgModule({
  declarations: [AbsenceRequestComponent, AbsenceRequestDetailsComponent, AbsenceRequestFormComponent],
  imports: [CommonModule, AbsenceRequestRoutingModule, SharedModule],
})
export class AbsenceRequestModule {}
