import express from "express";
import multer from "multer";
import cors from "cors";
import { listAllPosts, uploadNewPost, uploadNewImage, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

const upload = multer({dest:'./uploads'});

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions))
  app.get('/posts', listAllPosts);
  app.post('/posts', uploadNewPost)
  app.post('/upload', upload.single('image'), uploadNewImage)
  app.put('/upload/:id', updateNewPost)
}

export default routes;