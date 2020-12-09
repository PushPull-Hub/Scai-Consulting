import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FriendShip } from 'src/app/models/FriendShip.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { FriendsService } from 'src/app/services/friends.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  male_avatar_photo_url: string;
  loading: boolean = true;
  requesterProfiles: MiniProfile[];
  doIhaveRequests: boolean = true;

  @Output() friendShipEmitter: EventEmitter<any> = new EventEmitter();
  @Output() rejectEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private friendService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
  }

  loadProfiles(data) {
    setTimeout(() => {
      if (data) {
        this.requesterProfiles = data;
        this.doIhaveRequests = true;
        this.loading = false;
      } else {
        this.loading = false;
        this.doIhaveRequests = false;
      }
    }, 400);
  }

  acceptFriendRequest(requestorId: number) {
    this.friendService
      .acceptFriendRequest(requestorId)
      .subscribe((result: FriendShip) => {
        if (result) {
          this.friendShipEmitter.emit(result);
          setTimeout(() => {
            const p = this.requesterProfiles.filter(
              (profile: MiniProfile) => profile.id !== requestorId
            );
            this.requesterProfiles = p;
          }, 500);
        } else console.log('check conditions ');
      });
  }

  declineFriendRequest(requestorId: number) {
    this.friendService.declineFriendRequest(requestorId).subscribe((result) => {
      if (result) {
        this.rejectEmitter.emit(result);
        setTimeout(() => {
          const p = this.requesterProfiles.filter(
            (profile: MiniProfile) => profile.id !== requestorId
          );
          this.requesterProfiles = p;
        }, 500);
      } else console.log('check the conditions ');
    });
  }
}
