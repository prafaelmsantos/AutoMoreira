import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/identity/UserLogin';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;

  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.userService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/home');
      },
      (error: any) => {
        if (error.status == 401)
          this.toaster.error('UserName ou password inválido!');
        else console.error(error);
      }
    );
  }
}
