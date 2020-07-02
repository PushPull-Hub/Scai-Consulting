import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/reset-password/verify-email/verify-email.component';
import { AboutComponent } from './components/about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './components/posts/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { TimelineComponent } from './components/profile/timeline/timeline.component';
import { PhotosComponent } from './components/profile/timeline/photos/photos.component';
import { IntroComponent } from './components/profile/timeline/intro/intro.component';
import { TimelinePostsComponent } from './components/profile/timeline/timeline-posts/timeline-posts.component';
import { TimelineCreatePostComponent } from './components/profile/timeline/timeline-create-post/timeline-create-post.component';
import { NgbdTypeaheadHttp } from './components/profile/timeline/timeline-create-post/location-finder/location-finder.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    AboutComponent,
    PostsComponent,
    CreatePostComponent,
    PostComponent,
    ProfileComponent,
    NavbarComponent,
    TimelineComponent,
    PhotosComponent,
    IntroComponent,
    TimelinePostsComponent,
    TimelineCreatePostComponent,
    NgbdTypeaheadHttp,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
