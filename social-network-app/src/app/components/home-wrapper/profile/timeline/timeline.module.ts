import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { ProfileComponent } from '../profile.component';
import { TimelineComponent } from './timeline.component';
import { PhotosComponent } from './photos/photos.component';
import { IntroComponent } from './intro/intro.component';
import { TimelineCreatePostComponent } from './timeline-create-post/timeline-create-post.component';
import { TimelinePostsComponent } from './timeline-posts/timeline-posts.component';
import { NgbdTypeaheadHttp } from './timeline-create-post/location-finder/location-finder.component';

@NgModule({
  declarations: [
    ProfileComponent,
    TimelineComponent,
    PhotosComponent,
    IntroComponent,
    TimelineComponent,
    TimelineCreatePostComponent,
    TimelinePostsComponent,
    NgbdTypeaheadHttp,
  ],
  imports: [CommonModule, TimelineRoutingModule],
})
export class TimelineModule {}
