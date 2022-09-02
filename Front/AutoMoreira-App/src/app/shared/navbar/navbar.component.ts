import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //navbar collapsed
  isCollapsed = true;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }

}
