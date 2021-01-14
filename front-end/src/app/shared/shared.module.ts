import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgbdTypeaheadHttp } from './search-location/search-location.component';
import { FriendsFinder } from './search-friends/search-friends.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PostComponent } from './post/post.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AlertComponent } from './alert/alert.component';
import { CommentContainerComponent } from './post/comment-container/comment-container.component';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { IntroComponent } from '../components/home-wrapper/profile/second-wrapper/timeline/intro/intro.component';
import { TimelinePostsComponent } from '../components/home-wrapper/profile/second-wrapper/timeline/timeline-posts/timeline-posts.component';
import { UserIntroComponent } from './friend-profile/user-intro/user-intro.component';
import { ModelPopUpComponent } from './model-pop-up/model-pop-up.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NgbdTypeaheadHttp,
    FriendsFinder,
    SpinnerComponent,
    PostComponent,
    MessageBoxComponent,
    CreatePostComponent,
    AlertComponent,
    CommentContainerComponent,
    FriendProfileComponent,
    ErrorPageComponent,
    IntroComponent,
    TimelinePostsComponent,
    UserIntroComponent,
    ModelPopUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  exports: [
    NavbarComponent,
    FormsModule,
    NgbModule,
    RouterModule,
    NgbModule,
    NgbdTypeaheadHttp,
    FriendsFinder,
    SpinnerComponent,
    MessageBoxComponent,
    CreatePostComponent,
    PostComponent,
    IntroComponent,
    TimelinePostsComponent,
    ModelPopUpComponent,
  ],
})
export class SharedModule {}
