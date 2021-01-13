import { Component, Input, OnInit } from '@angular/core';
import { Gender } from 'src/app/models/Gender.model';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { PostComment } from 'src/app/models/PostComment.model';
import { UserServices } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss'],
})
export class CommentContainerComponent implements OnInit {
  @Input() comment: PostComment;
  commenter: MiniProfile = null;
  commenterProfilePictureUrl: string;

  isLoading: boolean;

  constructor(private userService: UserServices) {}

  ngOnInit(): void {
    this.loadCommenterProfile();
  }

  private loadCommenterProfile() {
    this.isLoading = true;
    this._getCommenterProfile(this.comment.userId).then(
      (profile: MiniProfile) => {
        this.commenter = profile;
        this.commenterProfilePictureUrl = profile.profilePictureUrl
          ? profile.profilePictureUrl
          : profile.gender == Gender.male
          ? environment.male_avatar_photo_url
          : environment.female_avatr_photo_url;
        this.isLoading = false;
      }
    );
  }

  private _getCommenterProfile(commenterId: number): Promise<MiniProfile> {
    return new Promise((resolve, reject) => {
      this.userService
        .getMiniProfile(commenterId)
        .subscribe((profile) => resolve(profile));
    }).then((profile: MiniProfile) => {
      return profile;
    });
  }
}
