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
  ],
})
export class SharedModule {}
