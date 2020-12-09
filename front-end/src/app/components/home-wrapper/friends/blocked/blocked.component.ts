import { Component, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { FriendsService } from 'src/app/services/friends.service';
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

  constructor(private friendService: FriendsService) {}

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

  unblockFriend(blockedUserId: number) {
    this.friendService
      .unblockFriend(blockedUserId)
      .subscribe((result: boolean) => {
        if (result) {
          setTimeout(() => {
            const p = this.BlockedByMeListProfiles.filter(
              (profile: MiniProfile) => profile.id !== blockedUserId
            );
            this.BlockedByMeListProfiles = p;
          }, 500);
        } else console.log('check conditions ');
      });
  }
}
