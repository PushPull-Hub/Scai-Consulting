import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeWrapperRoutingModule } from './home-wrapper-routing.module';

import { HomepageModule } from './home-page/homepage.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeWrapperComponent } from './home-wrapper.component';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [HomeWrapperComponent, FriendsComponent],
  imports: [
    CommonModule,
    HomeWrapperRoutingModule,
    SharedModule,
    HomepageModule,
  ],
  exports: [],
})
export class HomeWrapperModule {}
