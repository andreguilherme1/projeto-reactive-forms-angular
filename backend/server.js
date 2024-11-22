const express = require('express');
const fs = require('fs-extra');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Caminho para o arquivo db.json
const DB_PATH = './db.json';

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json()); // Para interpretar JSON no body

// Função para ler o db.json
const readDatabase = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo db.json:', err);
        throw err;
    }
};

// Função para escrever no db.json
const writeDatabase = async (data) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Erro ao escrever no arquivo db.json:', err);
        throw err;
    }
};

// CRUD Endpoints

// 1. Get all users
app.get('/users', async (req, res) => {
    try {
        const db = await readDatabase();
        res.json(db.users);
    } catch (err) {
        res.status(500).send({ message: "Erro ao obter usuários", error: err.message });
    }
});

// 2. Get a user by index
app.get('/users/:index', async (req, res) => {
    const { index } = req.params;
    try {
        const db = await readDatabase();
        const user = db.users[index];
        if (user) {
            res.json(user);
        } else {
            res.status(404).send({ message: "Usuário não encontrado" });
        }
    } catch (err) {
        res.status(500).send({ message: "Erro ao obter usuário", error: err.message });
    }
});

// 3. Create a new user
app.post('/users', async (req, res) => {
    const newUser = req.body;
    try {
        const db = await readDatabase();
        db.users.push(newUser);
        await writeDatabase(db);
        res.status(201).send({ message: "Usuário criado com sucesso", user: newUser });
    } catch (err) {
        res.status(500).send({ message: "Erro ao criar usuário", error: err.message });
    }
});

// 4. Update a user by index
app.put('/users/:index', async (req, res) => {
    const { index } = req.params;
    const updatedUser = req.body;
    try {
        const db = await readDatabase();
        if (db.users[index]) {
            db.users[index] = updatedUser;
            await writeDatabase(db);
            res.send({ message: "Usuário atualizado com sucesso", user: updatedUser });
        } else {
            res.status(404).send({ message: "Usuário não encontrado" });
        }
    } catch (err) {
        res.status(500).send({ message: "Erro ao atualizar usuário", error: err.message });
    }
});

// 5. Delete a user by index
app.delete('/users/:index', async (req, res) => {
    const { index } = req.params;
    try {
        const db = await readDatabase();
        if (db.users[index]) {
            const deletedUser = db.users.splice(index, 1);
            await writeDatabase(db);
            res.send({ message: "Usuário deletado com sucesso", user: deletedUser });
        } else {
            res.status(404).send({ message: "Usuário não encontrado" });
        }
    } catch (err) {
        res.status(500).send({ message: "Erro ao deletar usuário", error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
