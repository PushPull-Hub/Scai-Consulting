import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { v4 as uuidv4 } from 'uuid';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  usersList: User[];

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.usersList = this.user.usersList;
  }

  signUp(f: NgForm) {
    const email = f.value.email;
    const firstName = f.value.firstname;
    const password = f.value.password;
    const secondName = f.value.secondname;
    const userName = f.value.username;

    // let posts: Post = new Post();

    let user: User = new User();
    user.posts = new Post();
    user.username = userName;
    user.email = email;
    user.password = password;
    user.firstname = firstName;
    user.secondname = secondName;
    user.id = uuidv4();
    user.posts.userId = user.id;
    user.posts.likes = '';
    user.posts.description = '';
    user.posts.comments = [''];
    user.posts.image = [];
    console.log(user.posts);

    this.user.saveUSer(user);
  }
}
