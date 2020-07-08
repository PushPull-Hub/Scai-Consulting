import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { FriendshipsSuggestionComponent } from './friendships-suggestion/friendships-suggestion.component';
import { UsernavComponent } from './usernav/usernav.component';
import { ActiveFriendsComponent } from './active-friends/active-friends.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { TimelineModule } from '../profile/timeline/timeline.module';
import { ProfileModule } from '../profile/profile.module';
import { HomePageComponent } from './home.component';

@NgModule({
  declarations: [
    HomePageComponent,
    FriendshipsSuggestionComponent,
    UsernavComponent,
    ActiveFriendsComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
  ],
  imports: [CommonModule, HomepageRoutingModule, TimelineModule, ProfileModule],
  exports: [],
})
export class HomepageModule {}
