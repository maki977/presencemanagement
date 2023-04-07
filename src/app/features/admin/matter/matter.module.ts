import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatterRoutingModule } from './matter-routing.module';
import { MatterComponent } from './matter.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatterFormComponent } from './matter-form/matter-form.component';

@NgModule({
  declarations: [MatterComponent, MatterFormComponent],
  imports: [CommonModule, MatterRoutingModule, SharedModule],
})
export class MatterModule {}
