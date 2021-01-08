import { Injectable } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';

import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  authenticatedUserProfilePicture: string;
  male_avatar_photo_url: string = environment.male_avatar_photo_url;

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {}

  uploadPostImageToFireBaseDb(image: any): Promise<any> {
    const filePath = `posts/images/${image.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    return new Promise((resolve, reject) => {
      this.storage
        .upload(filePath, image)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              if (url) {
                console.log(url);
                resolve(url);
              } else reject('echec on uploading image to firebase');
            });
          })
        )
        .subscribe();
    });
  }

  getAuthenticatedUserProfilePicture(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authService
        .getAuthenticatedUser()
        .then((user: User) => {
          if (user) {
            user.profilePictureUrl
              ? (this.authenticatedUserProfilePicture = user.profilePictureUrl)
              : (this.authenticatedUserProfilePicture = this.male_avatar_photo_url);
            resolve(this.authenticatedUserProfilePicture);
          } else {
            reject();
          }
        })
        .catch((err) => console.log(err));
    });
  }
}
