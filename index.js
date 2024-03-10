const {
  getAllData,
  addPost,
  updateLikes,
  deletePost,
} = require("./operaciones");

const express = require("express");

const app = express();
const cors = require("cors");

app.listen(3000, console.log("Servidor iniciado"));
app.use(express.json());
app.use(cors());

app.get("/posts", async (req, res) => {
  try {
    const datos = await getAllData();
    return res.json(datos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await addPost(titulo, url, descripcion);
    res.send("Datos agregados exitosamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await updateLikes(id);
    res.send("Numero de likes actualizado");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    res.send("Dato eliminado correctamente");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});
