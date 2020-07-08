import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';

import { TimelineComponent } from './timeline.component';
import { IntroComponent } from './intro/intro.component';
import { TimelineCreatePostComponent } from './timeline-create-post/timeline-create-post.component';
import { PhotosComponent } from './photos/photos.component';
import { TimelinePostsComponent } from './timeline-posts/timeline-posts.component';
import { NgbdTypeaheadHttp } from './timeline-create-post/location-finder/location-finder.component';

@NgModule({
  declarations: [
    TimelineComponent,
    IntroComponent,
    TimelineCreatePostComponent,
    PhotosComponent,
    TimelinePostsComponent,
    NgbdTypeaheadHttp,
  ],
  imports: [CommonModule, TimelineRoutingModule],
  exports: [],
})
export class TimelineModule {}
