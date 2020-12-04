import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeWrapperRoutingModule } from './home-wrapper-routing.module';

import { HomepageModule } from './home-page/homepage.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeWrapperComponent } from './home-wrapper.component';
import { FriendsComponent } from './friends/friends.component';
import { MyFriendsComponent } from './friends/my-friends/my-friends.component';
import { SuggestionsComponent } from './friends/suggestions/suggestions.component';
import { PendingRequestsComponent } from './friends/pending-requests/pending-requests.component';
import { BlockedComponent } from './friends/blocked/blocked.component';

@NgModule({
  declarations: [HomeWrapperComponent, FriendsComponent, MyFriendsComponent, SuggestionsComponent, PendingRequestsComponent, BlockedComponent],
  imports: [
    CommonModule,
    HomeWrapperRoutingModule,
    SharedModule,
    HomepageModule,
  ],
  exports: [],
})
export class HomeWrapperModule {}
