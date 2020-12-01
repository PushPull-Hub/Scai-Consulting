import { Component, Input, OnInit } from '@angular/core';
import { MiniProfile } from 'src/app/models/MiniProfile.model';
import { PostComment } from 'src/app/models/PostComment.model';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss'],
})
export class CommentContainerComponent implements OnInit {
  @Input() comment: PostComment;
  commenter: MiniProfile = null;
  isLoading: boolean = true;

  constructor(private userService: UserServices) {}

  ngOnInit(): void {
    this._getCommenterProfile(this.comment.userId).then(
      (profile: MiniProfile) => {
        this.commenter = profile;
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
