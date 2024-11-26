import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
import fs from "fs";

export async function listAllPosts(req, res) {
  const results = await getAllPosts()
  
  res.status(200).json(results);
};

export async function uploadNewPost(req, res) {
  const newPost = req.body

  try {
    const createdPost = await createPost(newPost);
    res.status(200).json(createdPost);
  } catch(err) {
    console.error(err.message);
    res.status(500).json({"Erro" : "Falha na requisição"})
  }
};

export async function uploadNewImage(req, res) {
  const newPost = {
    title: "",
    description: "",
    imgUrl: req.file.originalname,
    imgAlt: "",
  };

  try {
      const createdPost = await createPost(newPost);
      const updatedImage = `uploads/${createdPost.insertedId}.png`
      fs.renameSync(req.file.path, updatedImage)
      res.status(200).json(createdPost);
  } catch(err) {
      console.error(err.message);
      res.status(500).json({"Erro":"Falha na requisição"})
  }
};

export async function updateNewPost(req, res) {
  const postId = req.params.id
  const urlImg = `http://localhost:3000/${postId}.png`
  
  try {
    const imgBuffer = fs.readFileSync(`uploads/${postId}.png`)
    const generatedDescription = await gerarDescricaoComGemini(imgBuffer)
    const post = {
      title: req.body.title,
      description: generatedDescription,
      imgAlt: req.body.imgAlt,
      imgUrl: urlImg
    }

    const updatedPost = await updatePost(postId, post);
    res.status(200).json(updatedPost);
  } catch(err) {
    console.error(err.message);
    res.status(500).json({"Erro" : "Falha na requisição"})
  }
};