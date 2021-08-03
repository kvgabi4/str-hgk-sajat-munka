import { Component, NgIterable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  list$: Observable<User | User[] | NgIterable<User> | null | undefined | any> = (this.userService.get() as unknown as Observable<User[]>);
  cols: any[] = this.config.userColumns;

  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) { }
  ngOnInit(): void {
  }
  update(user: User): void {
    this.userService.update(user).toPromise().then(
      userResponse => console.log(userResponse),
      err => console.error(err)
    );
  }

}
