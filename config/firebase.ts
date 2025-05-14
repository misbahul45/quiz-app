

import { initializeApp } from "firebase/app";
import { initializeAuth, 
    // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";


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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: appId,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, app };


