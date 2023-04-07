import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [BarChartComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
