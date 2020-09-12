import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { VerifyEmailComponent } from './reset-password/verify-email/verify-email.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './about/project/project.component';
import { WhoComponent } from './about/who/who.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'who', component: WhoComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
