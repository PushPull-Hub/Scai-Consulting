import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  unfoundedEmail = false;
  usersList: [
    {
      username: string;
      password: string;
      email: string;
      firstname: string;
      secondname: string;
      id: string;
    }
  ];

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.usersList = this.user.usersList;
  }
  verifyEmail = (f: NgForm) => {
    const inputedEmail = f.value.email;
    if (this.usersList === null) {
      console.log('userlist null');
      this.unfoundedEmail = true;
    } else {
      this.usersList.find((user) => {
        if (user.email !== inputedEmail) {
          this.unfoundedEmail = true;
        } else if (user.email === inputedEmail) {
          this.user.getEmail(inputedEmail);
          this.router.navigate(['/reset-password']);
        }
      });
    }
  };
}
