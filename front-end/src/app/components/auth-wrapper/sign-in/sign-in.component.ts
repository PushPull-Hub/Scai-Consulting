import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  combination = false;
  signingIn: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    this.signingIn = this.authService
      .logIn(email, password)
      .subscribe((responseData) => {
        if (
          responseData.headers.get('Authentication') &&
          responseData.body.id
        ) {
          localStorage.setItem(
            'token',
            responseData.headers.get('Authentication')
          );
          localStorage.setItem('loggedUserId', responseData.body.id.toString());
          this.authService.loggedUser.next(responseData.body);
          this.combination = false;
          this.router.navigate(['/home']);
        } else {
          this.combination = true;
          console.log(responseData);
        }
      });
  }

  ngOnDestroy(): void {
    this.signingIn.unsubscribe();
  }
}
