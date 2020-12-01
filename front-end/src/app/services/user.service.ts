import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Profile } from '../models/Profile.model';
import { User } from '../models/User.model';
import { MiniProfile } from '../models/MiniProfile.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  usersList = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  createAccount(profile: Profile) {
    return this.http.post<User>(environment.rootUrl + `/api/sign-up`, profile);
  }

  getProfile(email: string, password: string): Observable<Profile> {
    const profile = new Profile();
    profile.email = email;
    profile.password = password;

    return this.http
      .post<Profile>(environment.rootUrl + `/api/profiles/profile`, profile)
      .pipe(
        map((responseData) => {
          if (responseData.user) {
            return responseData;
          }
          return null;
        })
      );
  }

  getUsers() {
    return this.http
      .get<User[]>(environment.rootUrl + `/api/users`)
      .subscribe((responseData) => this.usersList.next(responseData));
  }

  getUserById(id: string) {
    return this.http.get<User>(environment.rootUrl + `/api/users/` + id);
  }

  updateUser(user: User) {
    return null;
  }

  updateProfile(profile: Profile) {
    return null;
  }

  getMiniProfile(profileId: number): Observable<MiniProfile> {
    return this.http.post<MiniProfile>(
      environment.rootUrl + '/api/user/microprofile',
      profileId
    );
  }
}
