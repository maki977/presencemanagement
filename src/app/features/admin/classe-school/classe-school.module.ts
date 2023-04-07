import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasseSchoolRoutingModule } from './classe-school-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormaddeditComponent } from './formaddedit/formaddedit.component';
import { ClasseSchoolComponent } from './classe-school/classe-school.component';



@NgModule({
  declarations: [
    FormaddeditComponent,
    ClasseSchoolComponent
  ],
  imports: [
    CommonModule,
    ClasseSchoolRoutingModule,
    SharedModule,

  ]
})
export class ClasseSchoolModule { }
