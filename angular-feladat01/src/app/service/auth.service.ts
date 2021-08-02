import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${this.config.apiUrl}login`;
  logoutUrl = `${this.config.apiUrl}logout`;
  storageName = 'currentUser';
  currentUserSubject: BehaviorSubject< User | null > = new BehaviorSubject<User | null>(null);
  lastToken: string = '';

constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
) {}

get currentUserValue(): User|null {
  return this.currentUserSubject.value;
}

logout() {
	localStorage.removeItem(this.storageName);
	this.currentUserSubject.next(null);
	this.router.navigate(['login']);
}


}
