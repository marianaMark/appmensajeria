const express = require('express'); // Importa express
const http = require('http'); // Necesario para Socket.IO
const path = require('path'); // Para manejar rutas de archivos
const { Server } = require('socket.io'); // Importa socket.io

const authRoutes = require('./routes/authRoutes');

const app = express(); // Inicializa app
const server = http.createServer(app); // Crea el servidor HTTP

app.use(express.json()); // Middleware para JSON


//rutas
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, 'public')));


// Configuración para servir archivos estáticos

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuración de Socket.IO
const io = new Server(server);// Inicializa Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado', socket.id);
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});
app.get('/favicon.ico', (req, res) => res.status(204));



// Inicia el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

