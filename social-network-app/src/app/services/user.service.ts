import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  selectedUserId;
  Storage;
  LoggedUserId = '';
  Users;
  Posts;
  Images;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  getUsers = () => JSON.parse(localStorage.getItem('Users'));
  getPosts = () => JSON.parse(localStorage.getItem('Posts'));
  getImages = () => JSON.parse(localStorage.getItem('Images'));

  createUSer = (user, posts, images) => {
    this.Users = this.getUsers() || [];
    this.Posts = this.getPosts() || [];
    this.Images = this.getImages() || [];
    this.Users.push(user);
    this.Posts.push(posts);
    this.Images.push(images);
    localStorage.setItem('Users', JSON.stringify(this.Users));
    localStorage.setItem('Posts', JSON.stringify(this.Posts));
    localStorage.setItem('Images', JSON.stringify(this.Images));
  };

  logUser = (id, username) => {
    this.updateUser(id, 'isActive', true);
    this.authService.logIn();
  };

  updateUser = (id, key, newValue) => {
    const user = this.Users.find((user) => user.id === id);
    user[`${key}`] = newValue;
    const indexOfUser = this.Users.map((x) => x.id).indexOf(id);
    this.Users.splice(indexOfUser, 1, user);
    localStorage.setItem('Users', JSON.stringify(this.Users));
  };

  getUser = (id: string) => (this.selectedUserId = id);
}
