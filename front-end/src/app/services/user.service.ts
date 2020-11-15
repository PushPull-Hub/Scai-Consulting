import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Account } from '../models/Account.model';
import { Profile } from '../models/Profile.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  usersList: User[] = JSON.parse(localStorage.getItem('Users')) || [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  createAccount(account: Account) {
    this.http
      .post<Account>(environment.rootUrl + `/api/profiles`, account)
      .subscribe((responseData) => console.log(responseData));
  }

  getProfile(email: string, password: string) {
    return this.http.get<Account>(
      environment.rootUrl + `/api/profiles/${email}/${password}`
    );
  }

  getUsers() {
    return this.http
      .get<User[]>(environment.rootUrl + `/api/users`)
      .subscribe((responseData) => console.log(responseData));
  }

  getUserById(id: string) {
    return this.http
      .get<User>(environment.rootUrl + `/api/users/` + id)
      .subscribe((responseData) => console.log(responseData));
  }

  updateUser(user: User) {
    return null;
  }

  updateProfile(profile: Profile) {
    return null;
  }
}
