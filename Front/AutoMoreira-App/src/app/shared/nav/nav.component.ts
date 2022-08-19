import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //navbar collapsed
  isCollapsed = true;

  constructor(public userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }
  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }

}
