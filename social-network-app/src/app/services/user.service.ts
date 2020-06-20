import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { User } from '../models/User.model';
import { Posts } from '../models/Posts.model';
// import { Storage } from '../models/Storage.model';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  selectedUserId = '';
  Storage = [[], [], []];

  constructor() {}

  getUSers = () => JSON.parse(localStorage.getItem('Storage')) || [];

  createUSer = (user, posts, images) => {
    this.Storage[0].push(user);
    this.Storage[1].push(posts);
    this.Storage[2].push(images);
    localStorage.setItem('Storage', JSON.stringify(this.Storage));
    console.log(this.Storage);
  };

  // SignUser = (email,password) => {

  // }

  // // let Users = [{ user }];
  // let Posts = [{ posts }];
  // let Images = [{ images }];
  // let test: any = { first: 'Hello whats up mate ', second: 'whatsup' };
  // let test2: any = { first: 'Hello  ', second: 'whatsupinollooo' };

  // let storage: Storage = new Storage();
  // storage = new Storage();

  // storage.users = user;
  // storage.posts = posts;
  // storage.friends = friends;
  // console.log(storage);

  // let Storage = [
  //   (posts = [{ posts }]),
  //   (user = [{ user }]),
  //   (friends = [{ friends }]),
  // ];

  // localStorage.setItem('users', JSON.stringify(Storage));
  // console.log(user);

  // let users = this.getUSers();
  // storage.friends = friends;
  // storage.posts = posts;
  // const arr = [];
  // arr.push(storage);
  // console.log(arr);
  // storage.users = user
  // storage.console.log(user, friends, posts);
  // const usersarr = Object.entries(users);
  // console.log(usersarr);
  // const a = Object.entries(user);
  // const b = Object.entries(posts);
  // users.push(a, b);
  // users.push(posts);
  // users.push(friends);
  // localStorage.setItem('user', JSON.stringify(arr));
  // this.usersList = this.usersList.concat(user, posts, friends);
  // this.usersList = this.usersList.concat(posts);
  // this.usersList = this.usersList.concat(friends);
  // console.log(this.usersList);

  // updateUser = (user, pro, newValue) => {
  //   let users = this.getUSers();
  //   user[`${pro}`] = newValue;
  //   users.push(user);

  // }; id, key, newValue

  updateUser = () => {
    let users = this.getUSers();
    const selectedUser = users.find((user) => user.id == this.selectedUserId);

    // const  selectedUserArray = Object.entries(selectedUser)
    // const index = selectedUser.IndexOf(selectedUser.id) ;
    // console.log(index);
    // console.log(this.selectedUserId);
    // console.log(selectedUser.id);
  };

  getUser = (id: string) => (this.selectedUserId = id);
}
