

import { initializeApp } from "firebase/app";
import { initializeAuth, 
    // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from 'firebase/firestore'


let appId = "";
if (Platform.OS === "web") {
  appId = process.env.EXPO_FIREBASE_WEB_APP_ID ?? "";
} else if (Platform.OS === "android") {
  appId = process.env.EXPO_FIREBASE_ANDROID_APP_ID ?? "";
} else {
  throw new Error(
    `Unsupported platform: ${Platform.OS}. Please ensure your platform is supported.`
  );
}



const firebaseConfig = {
  apiKey: "AIzaSyCtiWlRRmXH65zc_h9JrV7cIv-nVHg3lWw",
  authDomain: "todolist-project-7979d.firebaseapp.com",
  databaseURL: "https://todolist-project-7979d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-project-7979d",
  storageBucket: "todolist-project-7979d.firebasestorage.app",
  messagingSenderId: "839491810794",
  appId: "1:839491810794:web:64d2cf5b6bf4295aa76e93",
  measurementId: "G-T72FE2SQ0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db=getFirestore(app);

export { auth, app, db };


