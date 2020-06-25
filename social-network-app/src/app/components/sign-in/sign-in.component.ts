import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  Combination = false;
  Users;
  Posts;
  Images;

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.Users = this.user.Users.slice();
    this.Posts = this.user.Posts.slice();
    this.Images = this.user.Images.slice();
    this.user.onAddUser.subscribe((users) => (this.Users = users));
    this.user.onAddPost.subscribe((posts) => (this.Posts = posts));
    this.user.onAddImage.subscribe((images) => (this.Images = images));
  }

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    if (!this.Users) {
      this.Combination = true;
    } else {
      const Users = this.Users;
      const testedUser = Users.find(
        (user) => user.email == email && user.password == password
      );
      const LogUserCheck = testedUser
        ? this.user.logUser(testedUser.id, testedUser.username)
        : (this.Combination = true);
      this.router.navigate(['/home']);
    }
  }
}
