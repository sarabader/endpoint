import { z, TypeOf } from 'zod';

export const movieSchema = z.object({
  body: z.object({
    
    id: z.string({ required_error: 'ID is required !' })
    .min(4, 'You name must be more than 3 char'),

    name: z
      .string({ required_error: 'name is required !' })
      .min(4, 'You name must be more than 3 char'),

    genre: z
    .enum(['Drama', 'Action','Comedy'], { required_error: 'genre is required !' }),
  
    rating: z
      .number({ required_error: 'Rating is required !' })
      .gte(1)
      .lte(5),
      

    duration: z.number({ required_error: 'price is required !' })
    .min(60, 'You name must be more than 60 Min ')
    .gte(60)
    .lte(500),

   
}),
});

export type movieSchemaType = TypeOf<typeof movieSchema>['body'];