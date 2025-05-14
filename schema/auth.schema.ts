import { z } from "zod"
export class AuthSchema{
    static signup=z.object({
        username:z.string().min(3,{ message:'Username must be at least 3 characters' }),
        email:z.string().email({ message:'Email is not valid' }),
        password:z.string().min(8,{ message:'Password must be at least 8 characters' }),
        confirmPassword:z.string(), 
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    static signin=z.object({
        email:z.string().email({ message:'Email is not valid' }),
        password:z.string().min(8,{ message:'Password must be at least 8 characters' }),
    })
}

export type SignupSchemaType = z.infer<typeof AuthSchema.signup>;
export type SigninSchemaType = z.infer<typeof AuthSchema.signin>;
