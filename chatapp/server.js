const express = require('express'); // Importa express
const http = require('http'); // Necesario para Socket.IO
const path = require('path'); // Para manejar rutas de archivos
const { Server } = require('socket.io'); // Importa socket.io
const authRoutes = require('./routes/authRoutes');
const app = express(); // Inicializa app

const server = http.createServer(app); // Crea el servidor HTTP
const io = new Server(server, {
    cors: {
        origin: '*', // Permite todas las conexiones (solo para desarrollo)
    },
});
app.use('/api/auth', authRoutes);
app.use(express.json());

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg); // Envía el mensaje a todos los clientes
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});



// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

