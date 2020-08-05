import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { PostsService } from 'src/app/services/posts.service';
import { FriendsService } from 'src/app/services/friends.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  commentButtonClicked: boolean = false;
  comment: string;

  constructor(
    private postsService: PostsService,
    private friendService: FriendsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  onCommentIconClick() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }

  onCommentButtonClick(postId: string, comment: string) {
    this.post.comments = this.postsService.commentOnaPost(postId, comment);
    this.comment = '';
  }
  // to be modified

  getCommenterName(id: string) {
    return this.friendService.getaFriendProperty(id, 'username');
  }

  onLikeButtonClick(id: string) {
    this.post.likes = this.postsService.likePost(id);
  }

  creatorName(id: string) {
    return this.friendService.getaFriendProperty(id, 'username');
  }
}
