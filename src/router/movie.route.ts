import express from 'express';
import validate from '../middleware/validate';
import {movieSchema,movieSchemaType,} from '../zod_schema/movie';

const router = express.Router();

 let movie: movieSchemaType[] = [];

router.get('/', (req, res, next) => {
  return res.json(movie);
});

router.post('/', validate(movieSchema), (req, res, next) => {
  const newmovie= req.body as movieSchemaType;

  movie.push(newmovie);
  return res.status(201).json({ message: 'Movie Added !' });
});



router.put(`/:id`, validate(movieSchema), (req, res) => {
    const { id } = req.params;
    const updateObj = req.body as movieSchemaType;
    movie.map((upd) => {
      if (upd.id === id || upd.name === id) {
        upd.id = updateObj.id;
        upd.name = updateObj.name;
        upd.genre = updateObj.genre;
        upd.rating = updateObj.rating;
        upd.duration = updateObj.duration;
      }
    });
  
    return res.json({
      message: "Movie updated !",
    });
  });
  
  router.delete(`/:id`,validate(movieSchema), (req, res) => {
    const deletedride = req.body as movieSchemaType;
    const { id } = req.params;
    const deletedmovieList = movie.filter((Dmovie:any) => {
      return Dmovie.id !== id;
    });
    movie = deletedmovieList;
    res.json({
      message: "Movie Delete",
    });


    

    router.get('/:name', (req, res) => {
      let { name }  = req.params;
      let searchArr = movie.filter((item)=>{
        return item.name.toLowerCase().includes(name);
      })
      return res.json(searchArr);
    });
  
    router.get('/:genre', (req, res) => {
      let { genre }  = req.params;
      let searchArr = movie.filter((item)=>{
        return item.genre.toLowerCase().includes(genre);
      })
      return res.json(searchArr);
    });
  });

export default router;