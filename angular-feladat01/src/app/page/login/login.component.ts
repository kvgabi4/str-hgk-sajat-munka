import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  serverError = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin(ngForm: NgForm): void {
    this.auth.login(ngForm.value).toPromise().then(
      userResponse => {
        console.log('this.auth.currentUserValue ', this.auth.currentUserValue);
        if (this.auth.currentUserValue) {
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log('err.error ', err.error);
        this.serverError = err.error;
        const to = setTimeout(() => {
          clearTimeout(to);
          this.serverError = '';
        }, 3000);
      }
    );
    console.log(ngForm.value);
  }

}
