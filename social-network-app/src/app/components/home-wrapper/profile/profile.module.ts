import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [TimelineComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
