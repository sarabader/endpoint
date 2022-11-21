import { z, TypeOf } from 'zod';


export const bankSchema = z.object({
    body: z.object({
        id: z
        .string ({ required_error: 'ID is required !' })
        .min(3, 'Your id must be more than 3 characters'),
        username: z
        .string({required_error: 'name is required !'})
        .min(6, 'Your name must be more than 6 characters'),
        password: z
        .string({required_error: 'password is required !'})
        .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])"), "Password must contain at least 1 upper case, lower case, numeric, and special character"),
        balance: z
        .number({required_error: 'balance is required'}).gte(0),
    }),
});
export type bankSchemaType = TypeOf<typeof bankSchema>['body'];