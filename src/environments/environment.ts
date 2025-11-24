// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const environment = {
  production: false,
  firebaseConfig: {
  apiKey: "AIzaSyAY2LzY_nxqMXzUjJPKgmiucZY2uAMhI2I",
  authDomain: "projetobookly-1f8ad.firebaseapp.com",
  projectId: "projetobookly-1f8ad",
  storageBucket: "projetobookly-1f8ad.firebasestorage.app",
  messagingSenderId: "104789560838",
  appId: "1:104789560838:web:952a9d3d9979ba6c31fd87",
  measurementId: "G-K8CLXF0Q9W"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
