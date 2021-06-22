import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'google-docs-db',
  password: 'root',
  port: 5432,
});

const getUserByMail = (email: string): Promise<QueryResult> => {
  return pool.query('SELECT * FROM users WHERE email = $1', [email]);
};

const createUser = ({ name, email, password }: any): Promise<QueryResult> => {
  return pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning id, email, name', [
    name,
    email,
    password,
  ]);
};

const getDocumentById = (name: string): Promise<QueryResult> => {
  return pool.query('SELECT * FROM documents WHERE id = $1', [name]);
};

const createDocument = (name: string): Promise<QueryResult> => {
  return pool.query('INSERT INTO documents (name) VALUES ($1) returning *', [name]);
};

const saveDocument = (data: JSON, id: number): Promise<QueryResult> => {
  return pool.query('UPDATE documents SET data = ($1) WHERE id = $2 returning *', [data, id]);
};

export { getUserByMail, createUser, getDocumentById, createDocument, saveDocument };
