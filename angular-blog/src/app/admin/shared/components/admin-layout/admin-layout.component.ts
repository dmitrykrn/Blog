import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthNodeService } from '../../services/auth.service.node';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

users: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private nodeService: AuthNodeService
    ) { }

  ngOnInit(): void {
  }

  public logout(event: Event): void {
    event.preventDefault();
    if (confirm('Logout?')) {
      this.authService.logout();
      this.router.navigate(['/admin', 'login']);
    }
  }

  public get showMenu(): boolean {
    return this.authService.isAuthenticated;
  }

  public getUsers(): any {
    return this.nodeService.getUsers().subscribe ((users: any[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
