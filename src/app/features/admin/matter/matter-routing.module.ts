import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatterComponent } from './matter.component';

const routes: Routes = [
  { path: '', component: MatterComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatterRoutingModule {}
