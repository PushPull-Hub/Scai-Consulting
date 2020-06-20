import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  unfoundedEmail = false;
  usersList: User[];

  constructor(private user: UserServices, private router: Router) {}

  ngOnInit() {
    this.usersList = this.user.usersList;
  }

  verifyEmail = (f: NgForm) => {
    const inputedEmail = f.value.email;

    if (this.usersList.length === 0) {
      console.log('userlist null');
      this.unfoundedEmail = true;
    } else {
      this.usersList.find((user) => {
        if (user.email !== inputedEmail) {
          this.unfoundedEmail = true;
        } else if (user.email === inputedEmail) {
          const id = user.id;
          this.user.getUser(id);
          console.log(user);
          this.router.navigate(['/reset-password']);
        }
      });
    }
  };
}
