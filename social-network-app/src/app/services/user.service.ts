import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/User.model';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  usersList: User[] = JSON.parse(localStorage.getItem('Users')) || [];
  Posts = JSON.parse(localStorage.getItem('Posts')) || [];
  Images = JSON.parse(localStorage.getItem('Images')) || [];
  selectedUserId: string;
  loggedUser: User;
  loggedUserId: string =
    JSON.parse(localStorage.getItem('LoggedUserId')) || null;
  loggedUserName;
  adminToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJhYm91dCI6Ik1hcmsgWnVja2VyYmVyZyB0aGUgZmFjZWJvb2sgZm91bmRlciIsImFkcmVzcyI6ImhvbWUiLCJiaXJ0aGRheSI6IjE0LzA1LzE5ODQiLCJlbWFpbCI6Im1hcmtAZ21haWwuY29tIiwiZ2VuZGVyIjoibWFsZSIsImhvbWV0b3duIjoiTmV3IHlvcmsgIiwiaWQiOiI4MWU4MzkxZC1iYjVkLTQ0NDItYmMwMC00YTJlMjFhZTczZTgiLCJpc0FjdGl2ZSI6ZmFsc2UsImxvY2F0aW9uIjoiQ2FsaWZvcm5pYS9VU0EiLCJwYXNzd29yZCI6IjEyMyIsInJlbGF0aW9uc2hpcF9zdGF0dXMiOiJtYXJyaWVkIiwic2Vjb25kbmFtZSI6Ilp1Y2tlcmJlcmciLCJ1c2VybmFtZSI6Im1hcmtfdGhlX2FkbWluIiwid29ya19pbiI6IkZhY2Vib29rIn0.m1WlkdVOFeqHPyjGSFE0c98UHFGc7c7qVmkWLj0Cy-A';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  getUsers = () => JSON.parse(localStorage.getItem('Users'));
  storeUsers = () =>
    localStorage.setItem('Users', JSON.stringify(this.usersList));
  getPosts = () => JSON.parse(localStorage.getItem('Posts'));
  storePosts = () => localStorage.setItem('Posts', JSON.stringify(this.Posts));
  getImages = () => JSON.parse(localStorage.getItem('Images'));
  storeImages = () =>
    localStorage.setItem('Images', JSON.stringify(this.Images));

  createUSer = (user, posts, images) => {
    this.usersList.push(user);
    this.Posts.push(posts);
    this.Images.push(images);
    this.storeUsers();
    this.storePosts();
    this.storeImages();
  };

  logUser = (id) => {
    this.updateUser(id, 'isActive', true);
    localStorage.setItem('loggedUserId', JSON.stringify(this.loggedUserId));
    this.authService.logIn(id);
  };

  updateUser = (id, key, newValue) => {
    const user = this.usersList.find((user) => user.id === id);
    user[`${key}`] = newValue;
    const indexOfUser = this.usersList.map((x) => x.id).indexOf(id);
    this.usersList.splice(indexOfUser, 1, user);
    localStorage.setItem('Users', JSON.stringify(this.usersList));
  };

  signIn(email, password): boolean {
    if (email == 'mark@gmail.com' && password == '123') {
      const Admin: any = jwt_decode(this.adminToken);
      this.loggedUserId = Admin.id;
      this.loggedUser = Admin;
      this.loggedUserName = Admin.username;
      localStorage.setItem('loggedUserId', JSON.stringify(this.loggedUserId));
      this.authService.logIn();

      return true;
    } else {
      if (this.usersList) {
        const testedUser = this.usersList.find(
          (user) => user.email == email && user.password == password
        );
        if (testedUser) {
          this.loggedUserId = testedUser.id;
          this.loggedUser = testedUser;
          this.loggedUserName = testedUser.username;
          this.logUser(testedUser.id);
          return true;
        }
      }
    }

    return false;
  }
  verifyEmail(email): boolean {
    const testedUser = this.usersList.find((user) => user.email === email);
    if (testedUser) {
      this.selectedUserId = testedUser.id;
      return true;
    }
    return false;
  }
}
