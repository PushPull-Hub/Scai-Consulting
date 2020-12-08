import { Component, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss'],
})
export class MyFriendsComponent implements OnInit {
  male_avatar_photo_url: string;
  myFriendsProfiles: MiniProfile[];
  loading: boolean = true;
  doIhaveFriends: boolean = true;
  messageIconClicked: boolean;

  constructor() {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.messageIconClicked = false;
  }

  loadProfiles(data) {
    setTimeout(() => {
      if (data) {
        this.myFriendsProfiles = data;
        this.doIhaveFriends = true;
        this.loading = false;
      } else {
        this.loading = false;
        this.doIhaveFriends = false;
      }
    }, 400);
  }

  getConversation() {
    this.messageIconClicked = !this.messageIconClicked;
  }
}
