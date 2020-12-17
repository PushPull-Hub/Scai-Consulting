import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { FriendshipsSuggestionComponent } from './friendships-suggestion/friendships-suggestion.component';
import { UsernavComponent } from './usernav/usernav.component';
import { ActiveFriendsComponent } from './active-friends/active-friends.component';
import { PostsComponent } from './posts/posts.component';

import { HomePageComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './usernav/settings/settings.component';

@NgModule({
  declarations: [
    HomePageComponent,
    FriendshipsSuggestionComponent,
    UsernavComponent,
    ActiveFriendsComponent,
    PostsComponent,
    SettingsComponent,
  ],
  imports: [CommonModule, HomepageRoutingModule, SharedModule],
  exports: [],
})
export class HomepageModule {}
