import { Component, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { FriendsService } from 'src/app/services/friends.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.scss'],
})
export class PendingRequestsComponent implements OnInit {
  pendingRequestsProfiles: MiniProfile[];
  doIhavePendingFriendRequests: boolean = true;
  loading: boolean = true;
  male_avatar_photo_url: string;
  requested: boolean = true;

  constructor(private friendService: FriendsService) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
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
        setTimeout(() => {
          const p = this.pendingRequestsProfiles.filter(
            (profile) => profile.id !== requestedUserId
          );
          this.pendingRequestsProfiles = p;
        }, 500);
        this.requested = !result;
      });
  }
}
