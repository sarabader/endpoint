import { NextFunction, Request, Response } from "express";
import { movieSchemaType } from "../zod_schema/movie";
// import { mov } from '@prisma/client';
import { prisma } from "../config/db";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';



let movie: movieSchemaType[] = [];

export const getMovieHandeler=async(req:Request, res:Response, next:NextFunction) => {
   
  try {
    const moves = await prisma.movie.findMany();
    return res.status(200).json(moves);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error !' });
  }
  }

  export const postMovieHandeler=async(req:Request, res:Response, next:NextFunction) => {
    try {
      const newMovie = req.body as movieSchemaType;
  
      await prisma.movie.create({data: newMovie});

      return res.status(201).json({ message: 'New contact added !' });
    } catch (error) {
      const prismaError = error as PrismaClientKnownRequestError;
      if (prismaError.code == 'P2002') {
        return res.status(400).json({
          message: 'You phone number have been used before',
        });
      }
      return res.status(500).json({
        message: 'Server Error !',
      });
    }
  };
  
  //       const newmovie= req.body as movieSchemaType;
  //       movie.push(newmovie);
  //       return res.status(201).json({ message: 'Movie Added !' });
  // }

  export const UpdateMovieHandeler=async(req:Request, res:Response, next:NextFunction) => {
    try{
      const { id } = req.params;
    const updateObj = req.body as movieSchemaType;

    await prisma.movie.map((upd: { id: string; name: string; genre: string; rating: number; duration: number; }) => {
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
  }
  catch(error){
    return res.status(500).json({
      message: 'Server Error !', 
  });
}
  };

  export const DeletMovieHandeler=async(req:Request, res:Response, next:NextFunction) => {
   try{
        const deletedride = req.body as movieSchemaType;
        const { id } = req.params;
        const deletedmovieList = movie.filter((Dmovie:any) => {
          return Dmovie.id !== id;
        });
        movie = deletedmovieList;
        res.json({
          message: "Movie Delete",
        });
      }catch(error){
        return res.status(500).json({
          message: "Server Error ",
        })
      }
  }

  export const getBYnameMovieHandeler=(req:Request, res:Response, next:NextFunction) => {

let { name }  = req.params;
      let searchArr = movie.filter((item)=>{
        return item.name.toLowerCase().includes(name);
      })
      return res.json(searchArr);
    }

    export const getBYgenreMovieHandeler=(req:Request, res:Response, next:NextFunction) => {
            let { genre }  = req.params;
            let searchArr = movie.filter((item)=>{
              return item.genre.toLowerCase().includes(genre);
            })
            return res.json(searchArr);
          }

  
