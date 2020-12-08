import { Component, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss'],
})
export class BlockedComponent implements OnInit {
  male_avatar_photo_url: string;
  loading: boolean = true;
  BlockedByMeListProfiles: MiniProfile[];
  doIhaveBlockedUsersByMe: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }

  loadProfiles(data) {
    setTimeout(() => {
      if (data) {
        this.BlockedByMeListProfiles = data;
        this.doIhaveBlockedUsersByMe = true;
        this.loading = false;
      } else {
        this.loading = false;
        this.doIhaveBlockedUsersByMe = false;
      }
    }, 400);
  }
}
