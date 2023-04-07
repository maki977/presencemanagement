import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private tokenService: TokenService, private router: Router) {}
  logout(): void {
    this.tokenService.clearToken();
    this.router.navigate(['auth']);
  }
}
