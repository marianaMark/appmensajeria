const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = (req, res) => {
    console.log('Datos recibidos en register:', req.body); // Depuración

    const { nombre, email, contraseña, telefono } = req.body; // Recibe el teléfono
    
    if (!nombre || !email || !contraseña || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hash = bcrypt.hashSync(contraseña, 10);

    const sql = `
        INSERT INTO usuario (nombre, email, contraseña, telefono, fecha_registro)
        VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(sql, [nombre, email, hash, telefono], (err) => {
        if (err) 
            {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ error: 'Error al registrar el usuario' });
            }
        res.status(201).json({ message: 'Usuario registrado' });
    });
};


// Login
const login = (req, res) => {
    console.log('Datos recibidos en login:', req.body); // Depuración

    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).json({ error: 'El correo y la contraseña son obligatorios' });
    }

    const sql = `SELECT * FROM usuario WHERE email = ?`;
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:',err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
         if (results.length === 0) {
            console.log('Usuario no encontrado:', email);
            return res.status(404).json({ error: 'Usuario no encontrado' });
             }

        const user = results[0];
        console.log('Usuario encontrado:', user);

        const isMatch = bcrypt.compareSync(contraseña, user.contraseña);

        if (!isMatch) { 
            console.log('Contraseña incorrecta para:', email);
            return res.status(401).json({ error: 'Credenciales incorrectas' });

         }
            const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });
            console.log('Login exitoso para usuario:', email);

        res.json({ message: 'Inicio de sesión exitoso', token });
    });
};

//usu-contacto
const getUsers = (req, res) => {
    const userId = req.user.id; // Este ID viene del middleware de autenticación
    const sql = `SELECT id, nombre, email, telefono FROM usuario WHERE id != ?`;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
             return res.status(500).json({ error: err.message });
     }
             res.json(results);
    });
};

module.exports = { register, login, getUsers };
