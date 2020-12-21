import { Component, Input, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { Post } from 'src/app/models/Post.model';
import { User } from 'src/app/models/User.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss'],
})
export class FriendProfileComponent implements OnInit {
  @Input() user: User;
  userPosts: Post[];
  male_avatar_photo_url: string;

  constructor() {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }
}
