import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/User.model';
import { Post } from '../models/Post.model';
import { Images } from '../models/Images.model';
import { Account } from '../models/Account.model';

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

  constructor(private http: HttpClient) {}

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
  getUsersIds = () => this.usersList.map((user) => user.id);

  getUserById = (id: string): User =>
    JSON.parse(localStorage.getItem('Users')).find((user) => user.id === id);

  // Copy of User Object without Sensible Infos (email, password..) .
  getUserVersion2 = (id: string): User => {
    const user: User = this.getUserById(id);
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
    return userVersion2;
  };

  getaUserProperty = (id: string, property: string) => {
    const user = this.getUserById(id);
    return user[`${property}`];
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

  // calls to the Backend

  createAccount(account: Account) {
    this.http
      .post(environment.rootUrl + `/api/users`, account)
      .subscribe((responseData) => console.log(responseData));
  }

  getUser(email: string, password: string) {
    return this.http
      .get(environment.rootUrl + `/api/users/${email}/${password}`)
      .subscribe((responseData) => console.log(responseData));
  }

  getProfiles() {
    return this.http
      .get(environment.rootUrl + `/api/profiles`)
      .subscribe((responseData) => console.log(responseData));
  }

  getProfile(id: string) {
    return this.http
      .get(environment.rootUrl + `/api/profiles/` + id)
      .subscribe((responseData) => console.log(responseData));
  }
}
