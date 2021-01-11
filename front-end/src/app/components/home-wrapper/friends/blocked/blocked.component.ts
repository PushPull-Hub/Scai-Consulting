import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Gender } from 'src/app/models/Gender.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { FriendsService } from 'src/app/services/friends.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss'],
})
export class BlockedComponent implements OnInit {
  @Output() friendShipEmitter: EventEmitter<any> = new EventEmitter();
  BlockedByMeListProfiles: MiniProfile[];

  male_avatar_photo_url: string;
  female_avatar_photo_url: string;
  Female;

  loading: boolean = true;
  doIhaveBlockedUsersByMe: boolean = true;

  constructor(private friendService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.female_avatar_photo_url = environment.female_avatr_photo_url;
    this.Female = Gender[1];
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
          this.friendShipEmitter.emit(result);
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
