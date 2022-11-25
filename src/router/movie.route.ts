import express from 'express';
import { DeletMovieHandeler, getBYnameMovieHandeler, getMovieHandeler, postMovieHandeler, UpdateMovieHandeler } from '../controller/movie.controller';
import validate from '../middleware/validate';
import {movieSchema} from '../zod_schema/movie';

const router = express.Router();


 router.get('/',getMovieHandeler)

  router.post('/', validate(movieSchema),postMovieHandeler);

  router.put(`/:id`, validate(movieSchema), UpdateMovieHandeler)
    
  
  router.delete(`/:id`,validate(movieSchema),DeletMovieHandeler)


  router.get('/:name',getBYnameMovieHandeler )
  
  router.get('/:genre')
  

export default router;