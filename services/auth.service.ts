import { auth, db } from "@/config/firebase";
import { SigninSchemaType, SignupSchemaType } from "@/schema/auth.schema";
import { User } from "@/types/auth.types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export class AuthService {
  static async signup(data: SignupSchemaType) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
     return await this.save(data);
    } catch (error) {
      throw error;
    }
  }

  static async save(user: SignupSchemaType) {
    try {
      const avatar = `https://api.dicebear.com/9.x/pixel-art/png?seed= ${user.username}`;

      const saveUser: User = {
        username: user.username,
        email: user.email,
        avatar,
      };

      await setDoc(doc(db, "users", user.email), saveUser);

      return saveUser;
    } catch (error) {
      throw error;
    }
  }
  static async signin(data: SigninSchemaType){
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.email!);
      const userDocSnap = await getDoc(userDocRef);

      let profile: User | undefined;

      if (userDocSnap.exists()) {
        profile = userDocSnap.data() as User;
      }

      return {
        ...profile,
      };
    } catch (error) {
      throw error;
    }
  }
}