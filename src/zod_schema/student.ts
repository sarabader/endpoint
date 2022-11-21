import { z, TypeOf } from 'zod';


export const studentSchema = z.object({
    body: z.object({
        id: z
        .string ({ required_error: 'ID is required !' })
        .min(3, 'Your id must be more than 3 characters'),
        name: z
        .string({required_error: 'name is required !'})
        .min(3, 'Your name must be more than 3 characters'),
        major: z
        .enum(['IT', 'IS', 'CS', 'SWE'], 
        { required_error: 'Major is required !' }),
        level: z
        .number({required_error: 'Level is required !'})
        .gte(1)
        .lte(8),
        GPA: z
        .number({required_error: 'GPA is required !'})
        .gte(0)
        .lte(5),
    }),
});
export type studentSchemaType = TypeOf<typeof studentSchema>['body'];