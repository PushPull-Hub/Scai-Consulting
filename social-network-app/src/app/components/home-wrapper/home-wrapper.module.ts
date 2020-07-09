import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeWrapperRoutingModule } from './home-wrapper-routing.module';

import { HomepageModule } from './home-page/homepage.module';
// import { ProfileModule } from './profile/profile.module';
// import { HomePageComponent } from './home-page/home.component';
// import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeWrapperComponent } from './home-wrapper.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeWrapperComponent],
  imports: [
    CommonModule,
    HomeWrapperRoutingModule,
    SharedModule,
    HomepageModule,
  ],
  exports: [],
})
export class HomeWrapperModule {}
