import { Component, Input, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss'],
})
export class MyFriendsComponent implements OnInit {
  @Input() friendProfile: MiniProfile;
  male_avatar_photo_url: string;
  constructor() {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }
}
