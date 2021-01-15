import { Component, Input, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { environment } from 'src/environments/environment';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { Router } from '@angular/router';
import { UserServices } from 'src/app/services/user.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-friendships-suggestion',
  templateUrl: './friendships-suggestion.component.html',
  styleUrls: ['./friendships-suggestion.component.scss'],
})
export class FriendshipsSuggestionComponent implements OnInit {
  @Input() suggestionIconClicked: boolean;
  friendsSuggestion: MiniProfile[];
  profiles: MiniProfile[];
  loading: boolean;
  male_avatar_photo_url: string;
  errorOnLoadingProfiles: boolean;
  noProfilesToLoad: boolean;

  constructor(
    private userService: UserServices,
    private friendsService: FriendsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.errorOnLoadingProfiles = false;
    this.profiles = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.suggestionIconClicked.currentValue &&
      this.profiles.length <= 0
    ) {
      this.loadProfiles();
    }
  }

  loadProfiles() {
    this.loading = true;
    const loaded = (duration) => {
      setTimeout(() => {
        this.loading = false;
      }, duration);
    };
    this.friendsService
      .getTenSuggestions()
      .toPromise()
      .then((res) => {
        if (res && res.length > 0) {
          this.friendsSuggestion = res;
          this.userService.cache = [...this.friendsSuggestion];
          this.profiles = this.friendsSuggestion.slice(0, 5);
          loaded(900);
        } else {
          this.loading = false;
          this.errorOnLoadingProfiles = false;
          this.profiles = [];
        }
      })
      .catch((err) => {
        this.loading = false;
        this.errorOnLoadingProfiles = true;
        console.log(err);
      });
  }

  sendFriendRequest(requested_user_Id: number) {
    this.friendsService
      .sendFriendRequest(requested_user_Id)
      .toPromise()
      .then((res) => {
        if (res && res.id) {
          if (this.profiles.length > 0) {
            this.profiles = this.profiles.filter(
              (profile) => profile.id !== requested_user_Id
            );
          } else if (this.profiles.length == 0) {
            this.loadProfiles();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  redirectToProfile(profileId) {
    let url = `/user/profile/${profileId}`;
    this.router.navigate([url]);
  }
}
