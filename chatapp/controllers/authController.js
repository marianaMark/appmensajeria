const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = (req, res) => {
    const { nombre, email, contraseña, telefono } = req.body; // Recibe el teléfono

    const hash = bcrypt.hashSync(contraseña, 10);

    const sql = `
        INSERT INTO usuarios (nombre, email, contraseña, telefono, fecha_registro)
        VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(sql, [nombre, email, hash, telefono], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Usuario registrado' });
    });
};


// Login
const login = (req, res) => {
    const { email, contraseña } = req.body;

    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const user = results[0];
        const isMatch = bcrypt.compareSync(contraseña, user.contraseña);

        if (!isMatch) return res.status(401).json({ message: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    });
};

//usu-contacto
const getUsers = (req, res) => {
    const userId = req.user.id; // Este ID viene del middleware de autenticación
    const sql = `SELECT id, nombre, email, telefono FROM usuarios WHERE id != ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { register, login, getUsers };
