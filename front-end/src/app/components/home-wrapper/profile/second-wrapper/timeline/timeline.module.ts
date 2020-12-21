import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';

import { TimelineCreatePostComponent } from './timeline-create-post/timeline-create-post.component';
import { PhotosComponent } from './photos/photos.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [TimelineCreatePostComponent, PhotosComponent],
  imports: [CommonModule, TimelineRoutingModule, SharedModule],
  exports: [TimelineCreatePostComponent, PhotosComponent],
})
export class TimelineModule {}
