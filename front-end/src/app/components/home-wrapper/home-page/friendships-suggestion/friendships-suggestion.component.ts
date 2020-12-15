import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserServices } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { MiniProfile } from 'src/app/models/MiniProfile.model';

@Component({
  selector: 'app-friendships-suggestion',
  templateUrl: './friendships-suggestion.component.html',
  styleUrls: ['./friendships-suggestion.component.scss'],
})
export class FriendshipsSuggestionComponent implements OnInit {
  friendsSuggestion: MiniProfile[];
  profiles: MiniProfile[];
  loading: boolean;
  male_avatar_photo_url: string;

  constructor(
    private friendsService: FriendsService,
    private authService: AuthService,
    private userService: UserServices
  ) {}

  ngOnInit(): void {
    this.male_avatar_photo_url = environment.male_avatar_photo_url;
    this.loadProfiles();
  }

  private loadProfiles() {
    this.loading = true;
    this.friendsService
      .getTenSuggestions()
      .toPromise()
      .then((res) => {
        if (res && res.length > 0) {
          this.friendsSuggestion = res;
          this.profiles = res.slice(0, 5);
          this.loading = false;
        }
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }

  sendFriendRequest(requested_user_Id: number) {
    this.friendsService
      .sendFriendRequest(requested_user_Id)
      .toPromise()
      .then((res) => {
        if (res && res.id) {
          this.profiles = this.profiles.filter(
            (suggested) => suggested.id !== requested_user_Id
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // getFriendProperty = (id: string, property: string) =>
  //   this.userService.getaUserProperty(id, property);

  // addFriend(addedId) {
  //   this.friendsService.addFriend(addedId);
  //   setTimeout(() => {
  //     this.friendsSuggestion = this.friendsSuggestion.filter(
  //       (suggested) => suggested !== addedId
  //     );
  //   }, 500);
  // }
}
