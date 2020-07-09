import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';

import { TimelineComponent } from './timeline.component';
import { IntroComponent } from './intro/intro.component';
import { TimelineCreatePostComponent } from './timeline-create-post/timeline-create-post.component';
import { PhotosComponent } from './photos/photos.component';
import { TimelinePostsComponent } from './timeline-posts/timeline-posts.component';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TimelineComponent,
    IntroComponent,
    TimelineCreatePostComponent,
    PhotosComponent,
    TimelinePostsComponent,
  ],
  imports: [
    CommonModule,
    NgModule,
    FormsModule,
    TimelineRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [TimelineComponent],
})
export class TimelineModule {}
