import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'matter',
        loadChildren: () =>
          import('./matter/matter.module').then((m) => m.MatterModule),
      },

      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'absence-request',
        loadChildren: () =>
          import('./absence-request/absence-request.module').then(
            (m) => m.AbsenceRequestModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'attendance-list',
        loadChildren: () =>
          import('./attendance-list/attendance-list.module').then(
            (m) => m.AttendanceListModule
          ),
      },
      {
        path: 'classeschool',
        loadChildren: () =>
          import('./classe-school/classe-school.module').then((m) => m.ClasseSchoolModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
