import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from 'src/app/core/components/toolbar/toolbar/toolbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from 'src/app/core/components/sidebar/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    DashboardComponent,
    ToolbarComponent,
    AdminLayoutComponent,
    SidebarComponent,


  ],
  imports: [CommonModule, AdminRoutingModule, MaterialModule,MatFormFieldModule, SharedModule],
})
export class AdminModule {}
