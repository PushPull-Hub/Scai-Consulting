import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeWrapperRoutingModule } from './home-wrapper-routing.module';
import { HomeWrapperComponent } from './home-wrapper.component';

import { HomepageModule } from './home-page/homepage.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [HomepageModule, ProfileModule],
  imports: [CommonModule, HomeWrapperRoutingModule],
})
export class HomeWrapperModule {}
