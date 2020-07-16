import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import * as jwt_decode from 'jwt-decode';
import { Post } from '../models/Post.model';
import { Images } from '../models/Images.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  // needed
  usersList: User[] = JSON.parse(localStorage.getItem('Users')) || [];
  Posts = JSON.parse(localStorage.getItem('Posts')) || [];
  Images = JSON.parse(localStorage.getItem('Images')) || [];
  // not needed
  selectedUserId: string;
  adminToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJhYm91dCI6Ik1hcmsgWnVja2VyYmVyZyB0aGUgZmFjZWJvb2sgZm91bmRlciIsImFkcmVzcyI6ImhvbWUiLCJiaXJ0aGRheSI6IjE0LzA1LzE5ODQiLCJlbWFpbCI6Im1hcmtAZ21haWwuY29tIiwiZ2VuZGVyIjoibWFsZSIsImhvbWV0b3duIjoiTmV3IHlvcmsgIiwiaWQiOiI4MWU4MzkxZC1iYjVkLTQ0NDItYmMwMC00YTJlMjFhZTczZTgiLCJpc0FjdGl2ZSI6ZmFsc2UsImxvY2F0aW9uIjoiQ2FsaWZvcm5pYS9VU0EiLCJwYXNzd29yZCI6IjEyMyIsInJlbGF0aW9uc2hpcF9zdGF0dXMiOiJtYXJyaWVkIiwic2Vjb25kbmFtZSI6Ilp1Y2tlcmJlcmciLCJ1c2VybmFtZSI6Im1hcmtfdGhlX2FkbWluIiwid29ya19pbiI6IkZhY2Vib29rIn0.m1WlkdVOFeqHPyjGSFE0c98UHFGc7c7qVmkWLj0Cy-A';

  constructor(private router: Router) {}

  ngOnInit() {}

  // temporary Until generating a Serice for Posts, Friends, Images ...
  getPosts = () => JSON.parse(localStorage.getItem('Posts'));
  storePosts = () => localStorage.setItem('Posts', JSON.stringify(this.Posts));
  getImages = () => JSON.parse(localStorage.getItem('Images'));
  storeImages = () =>
    localStorage.setItem('Images', JSON.stringify(this.Images));

  storeUsers = () =>
    localStorage.setItem('Users', JSON.stringify(this.usersList));

  // CRUD methods

  getUsers = (): User[] => JSON.parse(localStorage.getItem('Users'));

  getUserById = (id: string): User =>
    this.usersList.find((user) => user.id === id);

  // Copy of User Object without Sensible Infos (email, password..) .
  getUserVersion2 = (id: string): User => {
    const user = this.getUserById(id);
    const userVersion2 = new User();
    userVersion2.id = user.id;
    userVersion2.username = user.username;
    userVersion2.firstname = user.firstname;
    userVersion2.secondname = user.secondname;
    userVersion2.gender = user.gender;
    userVersion2.birthday = user.birthday;
    userVersion2.hometown = user.hometown;
    userVersion2.location = user.location;
    userVersion2.friends = user.friends;
    userVersion2.adress = user.adress;
    userVersion2.work_in = user.work_in;
    userVersion2.relationship_status = user.relationship_status;
    console.log(userVersion2);
    return userVersion2;
  };

  getaUserProperty = (id: string, property: string) => {
    const user = this.getUserById(id);
    const prop = user[`${property}`];
    return prop;
  };

  createUSer = (user: User, posts: Post, images: Images) => {
    this.usersList.push(user);
    this.Posts.push(posts);
    this.Images.push(images);
    this.storeUsers();
    this.storePosts();
    this.storeImages();
  };

  updateUser = (id: string, key: string, newValue: any) => {
    const user = this.usersList.find((user) => user.id === id);
    user[`${key}`] = newValue;
    const indexOfUser = this.usersList.map((x) => x.id).indexOf(id);
    this.usersList.splice(indexOfUser, 1, user);
    localStorage.setItem('Users', JSON.stringify(this.usersList));
  };

  deleteUser = (id: string) => {
    const user = this.getUserById(id);
    const indexOfUser = this.usersList.map((x) => x.id).indexOf(id);
    this.usersList.splice(indexOfUser, 1);
    localStorage.setItem('Users', JSON.stringify(this.usersList));
  };

  verifyEmail(email: string): boolean {
    const testedUser = this.usersList.find((user) => user.email === email);
    if (testedUser) {
      this.selectedUserId = testedUser.id;
      return true;
    }
    return false;
  }
}
