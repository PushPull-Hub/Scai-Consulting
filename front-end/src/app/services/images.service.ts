import { Injectable } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private storage: AngularFireStorage) {}

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
}
