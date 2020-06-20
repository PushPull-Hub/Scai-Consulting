import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  Combination = false;
  incorrectPassword = false;
  Storage;

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.Storage = localStorage.getItem('Storage');
  }

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    if (!this.Storage) {
      this.Combination = true;
      this.incorrectPassword = false;
      console.log('!! this.Storage ');
    } else {
      const Users = this.Storage[0][0];
      // const selectedUser = Users.forEach(
      //   (user) => user.email === email && user.password === password
      // );
      // const selectedUser = Users['email'] == email  ? Users['id'] : 1;
      console.log(this.Storage);
      console.log(Users);
      // console.log(selectedUser);
    }
    //   this.Storage.forEach((user) => {
    //     if (user.email === email) {
    //       if (user.password !== password) {
    //         this.incorrectPassword = true;
    //         console.log('incorrect password');
    //       } else if (user.password === password) {
    //         console.log(` Registred the user : ${user.username}`);
    //         this.router.navigate(['/home']);
    //       }
    //     } else {
    //       this.Combination = true;
    //       this.incorrectPassword = false;
    //     }
    //     return;
    //   });
    // }
  }
}
