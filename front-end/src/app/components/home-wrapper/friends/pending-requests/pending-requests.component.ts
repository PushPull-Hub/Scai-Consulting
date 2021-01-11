import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Gender } from 'src/app/models/Gender.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { FriendsService } from 'src/app/services/friends.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.scss'],
})
export class PendingRequestsComponent implements OnInit {
  @Output() friendShipEmitter: EventEmitter<any> = new EventEmitter();

  male_avatar_photo_url: string;
  female_avatar_photo_url: string;
  Female;

  pendingRequestsProfiles: MiniProfile[];

  loading: boolean = true;
  requested: boolean = true;
  doIhavePendingFriendRequests: boolean = true;

  constructor(private friendService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.female_avatar_photo_url = environment.female_avatr_photo_url;
    this.Female = Gender[1];
  }

  loadProfiles(data) {
    setTimeout(() => {
      if (data) {
        this.pendingRequestsProfiles = data;
        this.doIhavePendingFriendRequests = true;
        this.loading = false;
      } else {
        this.doIhavePendingFriendRequests = false;
        this.loading = false;
      }
    }, 400);
  }

  cancelFriendRequest(requestedUserId) {
    this.friendService
      .cancelFriendRequest(requestedUserId)
      .subscribe((result: boolean) => {
        if (result) {
          this.friendShipEmitter.emit(result);
          setTimeout(() => {
            const p = this.pendingRequestsProfiles.filter(
              (profile) => profile.id !== requestedUserId
            );
            this.pendingRequestsProfiles = p;
          }, 500);
        } else console.log('check conditions ');
      });
  }
}
