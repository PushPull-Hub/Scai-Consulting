import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { FirstWrapperComponent } from './first-wrapper/first-wrapper.component';
import { SecondWrapperComponent } from './second-wrapper/second-wrapper.component';
import { TimelineComponent } from './second-wrapper/timeline/timeline.component';
import { ProfileComponent } from './profile.component';
import { TimelineModule } from './second-wrapper/timeline/timeline.module';

@NgModule({
  declarations: [
    SecondWrapperComponent,
    FirstWrapperComponent,
    TimelineComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, TimelineModule],
  exports: [],
})
export class ProfileModule {}
