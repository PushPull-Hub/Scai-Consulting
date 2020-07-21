import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/app/models/User.model';
import { Post } from 'src/app/models/Post.model';
import { Images } from 'src/app/models/Images.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  date: NgbDateStruct;
  options = [
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'other', value: 'Other' },
  ];
  selectedOption: string;
  now = new Date();

  constructor(private user: UserServices, private router: Router) {}
  ngOnInit() {}

  signUp(f: NgForm) {
    const email = f.value.email;
    const firstName = f.value.firstname;
    const password = f.value.password;
    const secondName = f.value.secondname;
    // const userName = f.value.username;

    let user: User = new User();
    let images: Images = new Images();
    let posts: Post = new Post();

    user.username = `${firstName} ${secondName}`;
    user.email = email;
    user.password = password;
    user.firstname = firstName;
    user.secondname = secondName;
    user.id = uuidv4();
    user.isActive = false;
    (user.about = ''),
      (user.gender = this.selectedOption),
      (user.birthday = this.date),
      (user.hometown = ''),
      (user.adress = ''),
      (user.location = ''),
      (user.work_in = ''),
      (user.relationship_status = '');
    user.friends = [];

    posts.userId = user.id;
    posts.postId = uuidv4();
    posts.likes = 0;
    posts.description = '';
    posts.comments = [''];
    posts.image = [];
    posts.created_time = this.now.toDateString();
    posts.text = `The ${posts.created_time}, ${user.username} signed up to SCAI  `;

    images.id = user.id;
    images.Images = [];
    this.user.createUSer(user, posts, images);
    this.router.navigate(['/sign-in']);
  }
}
