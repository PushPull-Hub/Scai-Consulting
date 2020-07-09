import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { SecondWrapperComponent } from './second-wrapper/second-wrapper.component';
import { FirstWrapperComponent } from './first-wrapper/first-wrapper.component';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimelineModule } from './second-wrapper/timeline/timeline.module';

@NgModule({
  declarations: [
    SecondWrapperComponent,
    FirstWrapperComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, TimelineModule],
  exports: [],
})
export class ProfileModule {}
