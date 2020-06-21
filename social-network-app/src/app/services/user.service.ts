import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserServices implements OnInit {
  selectedUserId;
  Storage;
  LoggedUserId = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  getUsers = () => JSON.parse(localStorage.getItem('Storage'))[0];

  createUSer = (user, posts, images) => {
    this.Storage = JSON.parse(localStorage.getItem('Storage')) || [[], [], []];
    this.Storage[0].push(user);
    this.Storage[1].push(posts);
    this.Storage[2].push(images);
    localStorage.setItem('Storage', JSON.stringify(this.Storage));
  };

  logUser = (id) => {
    this.updateUser(id, 'isActive', true);
    this.router.navigate(['/home']);
  };

  updateUser = (id, key, newValue) => {
    const user = this.Storage[0].find((user) => user.id === id);
    user[`${key}`] = newValue;
    const indexOfUser = this.Storage[0].map((x) => x.id).indexOf(id);
    this.Storage[0].splice(indexOfUser, 1, user);
    localStorage.setItem('Storage', JSON.stringify(this.Storage));
  };

  getUser = (id: string) => (this.selectedUserId = id);
}
