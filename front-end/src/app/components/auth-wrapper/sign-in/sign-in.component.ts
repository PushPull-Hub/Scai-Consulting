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

  ngOnInit() {
    this.authService.test().subscribe((res) => console.log(res));
  }

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
          this.authService._authenticatedUser.next(responseData.body);
          this.authService.token = responseData.headers.get('Authentication');
          this.combination = false;
          this.router.navigate(['/home']);
        } else {
          this.combination = true;
          console.log(responseData);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.signingIn) this.signingIn.unsubscribe();
  }
}
