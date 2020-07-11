import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { VerifyEmailComponent } from './reset-password/verify-email/verify-email.component';
import { AboutComponent } from './about/about.component';
import { UnAuthGuard } from 'src/app/auth/un-auth.guard';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [UnAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [UnAuthGuard] },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [UnAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
