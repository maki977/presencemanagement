import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceListComponent } from './attendance-list.component';
import { CallDetailsComponent } from './components/call-details/call-details.component';
import { CallComponent } from './components/call/call.component';

const routes: Routes = [
  { path: '', component: AttendanceListComponent, pathMatch: 'full' },
  { path: 'call', component: CallComponent, pathMatch: 'full' },
  { path: ':id', component: CallDetailsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceListRoutingModule {}
