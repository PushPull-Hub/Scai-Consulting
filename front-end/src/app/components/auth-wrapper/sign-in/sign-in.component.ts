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
  combination: boolean;
  loading: boolean;
  signingIn: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.combination = false;
  }

  signIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.loading = true;
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
          setTimeout(() => {
            this.combination = false;
            // this.loading = false;
            this.router.navigate(['/home']);
          }, 900);
        } else {
          this.combination = true;
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.signingIn) this.signingIn.unsubscribe();
  }
}
