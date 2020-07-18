import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { PostsService } from 'src/app/services/posts.service';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  commentButtonClicked: boolean = false;
  comments: string[];

  constructor(
    private postsService: PostsService,
    private friendService: FriendsService
  ) {}

  ngOnInit(): void {}

  onCommentButtonClick() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }
  onLikeButtonClick(id: string) {
    this.postsService.likePost(id);
  }

  creatorName(id: string) {
    const name = this.friendService.getaFriendProperty(id, 'username');
    return name;
  }
}
