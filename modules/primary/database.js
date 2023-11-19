const cfg = require("../../config.json");
const db_cfg = cfg.database;
const mysql = require('mysql2/promise');

const config = {
  host: db_cfg.host,
  user: db_cfg.usr,
  password: db_cfg.pass,
  database: db_cfg.db,
};

async function connect() {
  const connection = await mysql.createConnection(config);
  //console.log('Conexão bem-sucedida ao banco de dados MySQL');
  return connection;
}

async function executeQuery(connection, query, parameters) {
  try {
    const [results] = await connection.execute(query, parameters);
    return results;
  } catch (erro) {
    throw erro;
  }
}

async function closeConnection(connection) {
  try {
    await connection.end();
    //console.log('Conexão fechada com sucesso');
  } catch (erro) {
    throw erro;
  }
}

module.exports = {
  connect,
  executeQuery,
  closeConnection,
};
