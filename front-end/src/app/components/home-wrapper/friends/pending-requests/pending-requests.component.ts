import { Component, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
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

  constructor() {}

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
}
