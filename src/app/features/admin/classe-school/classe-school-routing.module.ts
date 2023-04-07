import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseSchoolComponent } from './classe-school/classe-school.component';


const routes: Routes = [
  { path: '', component: ClasseSchoolComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseSchoolRoutingModule { }
