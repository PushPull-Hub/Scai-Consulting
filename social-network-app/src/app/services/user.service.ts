import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  usersList: User[] = JSON.parse(localStorage.getItem('Users')) || [];
  Posts = JSON.parse(localStorage.getItem('Posts')) || [];
  Images = JSON.parse(localStorage.getItem('Images')) || [];
  selectedUserId: string;
  LoggedUserId = '';

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

  logUser = (id, username) => {
    this.updateUser(id, 'isActive', true);
    this.authService.logIn();
  };

  updateUser = (id, key, newValue) => {
    const user = this.usersList.find((user) => user.id === id);
    user[`${key}`] = newValue;
    const indexOfUser = this.usersList.map((x) => x.id).indexOf(id);
    this.usersList.splice(indexOfUser, 1, user);
    localStorage.setItem('Users', JSON.stringify(this.usersList));
  };

  signIn(email, password): boolean {
    if (this.usersList) {
      const testedUser = this.usersList.find(
        (user) => user.email == email && user.password == password
      );
      if (testedUser) {
        this.logUser(testedUser.id, testedUser.username);
        return true;
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
