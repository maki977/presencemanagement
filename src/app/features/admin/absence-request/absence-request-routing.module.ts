import { AbsenceRequestComponent } from './absence-request/absence-request.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceRequestDetailsComponent } from './components/absence-request-details/absence-request-details.component';

const routes: Routes = [
  { path: '', component: AbsenceRequestComponent, pathMatch: 'full' },
  {
    path: ':id',
    component: AbsenceRequestDetailsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbsenceRequestRoutingModule {}
