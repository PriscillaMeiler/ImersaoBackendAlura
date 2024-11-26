import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"))

routes(app)

app.listen(3000, () => {
  console.log("Servidor Escutando...");
});


// app.get('/posts/:id', (req, res) => {
//   const index = getPostByID(req.params.id)
//   res.status(200).json(posts[index]);
// });

// // Functions
// function getPostByID(id) {
//   return posts.findIndex((post) => {
//     return post.id === Number(id)
//   })
// }
