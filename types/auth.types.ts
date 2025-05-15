import { SigninSchemaType, SignupSchemaType } from "@/schema/auth.schema";

export interface User{
    username:string;
    email:string;
    avatar:string;
}
export interface AuthStore{
    user:User|null;
    signin:(data:SigninSchemaType) => Promise<void>;
    signup:(data:SignupSchemaType) => Promise<void>;
    signout:() => Promise<void>;
    isLoading:boolean;
    error:string|null;
}

