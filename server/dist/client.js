"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDocument = exports.createDocument = exports.getDocumentById = exports.createUser = exports.getUserByMail = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'google-docs-db',
    password: 'root',
    port: 5432,
});
const getUserByMail = (email) => {
    return pool.query('SELECT * FROM users WHERE email = $1', [email]);
};
exports.getUserByMail = getUserByMail;
const createUser = ({ name, email, password }) => {
    return pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning id, email, name', [
        name,
        email,
        password,
    ]);
};
exports.createUser = createUser;
const getDocumentById = (name) => {
    return pool.query('SELECT * FROM documents WHERE id = $1', [name]);
};
exports.getDocumentById = getDocumentById;
const createDocument = (name) => {
    return pool.query('INSERT INTO documents (name) VALUES ($1) returning *', [name]);
};
exports.createDocument = createDocument;
const saveDocument = (data, id) => {
    return pool.query('UPDATE documents SET data = ($1) WHERE id = $2 returning *', [data, id]);
};
exports.saveDocument = saveDocument;
//# sourceMappingURL=client.js.map