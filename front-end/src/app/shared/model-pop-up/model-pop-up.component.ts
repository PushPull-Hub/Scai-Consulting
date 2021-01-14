import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-model-pop-up',
  templateUrl: './model-pop-up.component.html',
  styleUrls: ['./model-pop-up.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ModelPopUpComponent {
  post = {
    commentable: false,
    comments: [
      { id: 33, createdTime: '123456789', comment: '1st ', userId: 14 },
      { id: 35, createdTime: '123456789', comment: '3rd', userId: 14 },
      { id: 34, createdTime: '123456789', comment: '2nd', userId: 14 },
      {
        id: 31,
        createdTime: '123456789',
        comment: 'London is cool',
        userId: 14,
      },
      {
        id: 32,
        createdTime: '123456789',
        comment: 'I hope I can go soon ',
        userId: 14,
      },
    ],
    created_time: '1610011324580',
    description: 'London ',
    id: 33,
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/scai-chat-images.appspot.com/o/posts%2Fimages%2Funsplash-photo%20(2).jpg_1610011342025?alt=media&token=dedae14e-b6e0-4ca8-b8ed-99b3661da850',
    likersIds: [],
    location: null,
    objectId: null,
    pubblico: true,
    shareable: false,
    userId: 12,
  };

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }
}
