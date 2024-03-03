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

module.exports = { getAllData, addPost };
