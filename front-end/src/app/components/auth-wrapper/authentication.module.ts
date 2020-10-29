import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthWrapperComponent } from './auth-wrapper.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { VerifyEmailComponent } from './reset-password/verify-email/verify-email.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectComponent } from './about/project/project.component';
import { WhoComponent } from './about/who/who.component';

@NgModule({
  declarations: [
    AuthWrapperComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    AboutComponent,
    ProjectComponent,
    WhoComponent,
  ],
  imports: [AuthenticationRoutingModule, CommonModule, SharedModule],
})
export class AuthentictionModule {}
