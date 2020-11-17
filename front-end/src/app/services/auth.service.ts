import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserServices } from './user.service';

import { User } from '../models/User.model';
import { Profile } from '../models/Profile.model';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private loggedUserSubject : BehaviorSubject<User> ;
  public loggedUser : Observable<User>;
  isLoggedIn: boolean = false;

  constructor( private http: HttpClient , private router: Router, private userService: UserServices) {
    this.loggedUser = this.loggedUserSubject.asObservable();
  }

  logIn (email: string, password: string): boolean {

    const profile = new Profile();
    profile.email = email ;
    profile.password = password ;

    this.http.post<Profile>(
        environment.rootUrl + `/api/profiles/profile`, profile 
      ).subscribe( responseData => {
        this.loggedUserSubject.next(responseData.user);
        localStorage.setItem('loggedUserId', this.loggedUser.subscribe(user=> user.id).toString() );
        // set user to active 
      })
      // return false;
      return true;
    }
  };

  isAuthenticated ( ) : void  {
    this.isLoggedIn = localStorage.getItem('loggedUserId') ? true : false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 100);
    });
  }

  logOut () {
    this.loggedUserSubject.next(null);
    this.isLoggedIn = false;
    // update user to desactived 
    localStorage.removeItem("loggedUserId")
    this.router.navigate(['/app/sign-in']);
  }



}
