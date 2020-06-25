import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  selectedUserId;
  Storage;
  LoggedUserId = '';
  Users = JSON.parse(localStorage.getItem('Users')) || [];
  Posts = JSON.parse(localStorage.getItem('Posts')) || [];
  Images = JSON.parse(localStorage.getItem('Images')) || [];
  onAddUser = new Subject<User[]>();
  onAddPost = new Subject<User[]>();
  onAddImage = new Subject<User[]>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  getUsers = () => JSON.parse(localStorage.getItem('Users'));
  storeUsers = () => localStorage.setItem('Users', JSON.stringify(this.Users));
  getPosts = () => JSON.parse(localStorage.getItem('Posts'));
  storePosts = () => localStorage.setItem('Posts', JSON.stringify(this.Posts));
  getImages = () => JSON.parse(localStorage.getItem('Images'));
  storeImages = () =>
    localStorage.setItem('Images', JSON.stringify(this.Images));

  createUSer = (user, posts, images) => {
    this.Users.push(user);
    this.Posts.push(posts);
    this.Images.push(images);
    this.onAddUser.next(this.Users.slice());
    this.onAddPost.next(this.Posts.slice());
    this.onAddImage.next(this.Images.slice());
    this.storeUsers();
    this.storePosts();
    this.storeImages();
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
