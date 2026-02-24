import Database, { Database as DatabaseType } from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../../database.sqlite");


//presisa dizer o tipo o DatabaseType para o db, porque o better-sqlite3 não tem tipagem nativa, então é necessário criar uma tipagem personalizada para o banco de dados, e essa tipagem personalizada é o DatabaseType, que é importado do better-sqlite3, e depois é usado para tipar o db, para que o TypeScript saiba que o db é do tipo DatabaseType, e assim possa fornecer autocompletar e validação de tipos para as operações do banco de dados.
const db: DatabaseType = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    ID TEXT PRIMARY KEY,
    NOME TEXT NOT NULL,
    DESCRICAO TEXT,
    QUANTIDADE INTEGER NOT NULL DEFAULT 0,
    PRECO REAL NOT NULL,
    CRIADO_EM TEXT NOT NULL,
    ATUALIZADO_EM TEXT NOT NULL
  )
`);

export default db;