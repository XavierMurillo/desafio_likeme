const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "pgadmin",
  database: "likeme",
  allowExitOnIdle: true,
});

const getAllData = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log("Datos obtenidos de DB");
  return rows;
};

const addPost = async (titulo, img, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)";
  const values = [titulo, img, descripcion];
  const result = await pool.query(consulta, values);
  console.log("Dato agregado");
};

const updateLikes = async (id) => {
  const consulta =
    "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id =$1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún post con ese id" };
  }
  console.log("Likes actualizados", consulta);
};

const deletePost = async (id) => {
  const consulta = "DELETE FROM posts where id = $1 ";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún post con ese id" };
  }
  console.log("Dato eliminado");
};

module.exports = { getAllData, addPost, updateLikes, deletePost };
