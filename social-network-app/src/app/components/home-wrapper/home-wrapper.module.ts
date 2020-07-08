import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeWrapperRoutingModule } from './home-wrapper-routing.module';

import { HomepageModule } from './home-page/homepage.module';
import { ProfileModule } from './profile/profile.module';
import { HomePageComponent } from './home-page/home.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [HomePageComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeWrapperRoutingModule,
    HomepageModule,
    ProfileModule,
  ],
  exports: [HomepageModule, ProfileModule],
})
export class HomeWrapperModule {}
