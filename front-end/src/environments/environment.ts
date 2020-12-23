// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //rootUrl: ' https://glacial-badlands-58060.herokuapp.com',
  rootUrl: 'http://localhost:8080',
  male_avatar_photo_url: './assets/images/male-user.jpg',
  female_avatr_photo_url: './assets/images/female-user.jpg',
  firebaseConfig: {
    apiKey: 'AIzaSyBmg9hoogcHN4ZER6CsSzlKkKL2FPJVRgU',
    authDomain: 'scai-chat-images.firebaseapp.com',
    databaseURL: 'https://scai-chat-images-default-rtdb.firebaseio.com',
    projectId: 'scai-chat-images',
    storageBucket: 'scai-chat-images.appspot.com',
    messagingSenderId: '810681715218',
    appId: '1:810681715218:web:f896fa1e0e9a2f1b1be6cb',
    measurementId: 'G-H7RM3V2E3B',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
