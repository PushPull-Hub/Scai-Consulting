import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';

import { IntroComponent } from './intro/intro.component';
import { TimelineCreatePostComponent } from './timeline-create-post/timeline-create-post.component';
import { PhotosComponent } from './photos/photos.component';
import { TimelinePostsComponent } from './timeline-posts/timeline-posts.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [
    IntroComponent,
    TimelineCreatePostComponent,
    PhotosComponent,
    TimelinePostsComponent,
  ],
  imports: [CommonModule, TimelineRoutingModule, SharedModule],
  exports: [
    IntroComponent,
    TimelineCreatePostComponent,
    PhotosComponent,
    TimelinePostsComponent,
  ],
})
export class TimelineModule {}
