import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface SubLink {
  icon: string;
  role: string;
  module: string;
  path: string;
  label: string;
}
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {


  links: SubLink[] = [
    {
      role: 'Admin',
      module: 'DASHBOARD',
      path: '/admin/dashboard',
      label: 'Tableau de bord',
      icon: 'home',
    },
    {
      role: 'Admin',
      module: 'MATTER',
      path: '/admin/matter',
      label: 'Module de formation',
      icon: 'library_books',
    },
    {
      role: '',
      module: 'USER',
      path: '/admin/users',
      label: 'Utilisateurs',
      icon: 'person',
    },
    {
      role: '',
      module: 'ABSENCE-REQUEST',
      path: '/admin/absence-request',
      label: "Demande d'absence",
      icon: 'markunread',
    },
    {
      role: 'Admin',
      module: 'HOME',
      path: '/admin/home',
      label: 'validation absence',
      icon: 'home',
    },
    // {
    //   role: 'Logout',
    //   module: 'Auth',
    //   path: '',
    //   label: '  Se deconnecter',
    //   icon: 'lock_open',
    // },
  ];

  constructor(private router:Router, private authservice:AuthService ) { }
  logout(): void {
    this.authservice.logout();
    this.router.navigate(['auth']);
  }

  ngOnInit(): void {

  }
}
