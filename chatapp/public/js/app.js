const socket = io();

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesList = document.getElementById('messages');
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/login'; // Redirige si no está autenticado
}

// Obtener contactos
const loadContacts = async () => {
    const response = await fetch('/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
    });
    const contacts = await response.json();
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    contacts.forEach((contact) => {
        const li = document.createElement('li');
        li.textContent = contact.nombre;
        li.addEventListener('click', () => {
            startChat(contact.id, contact.nombre);
        });
        contactsList.appendChild(li);
    });
};

const startChat = (userId, userName) => {
    // Aquí puedes implementar la lógica para cargar mensajes del chat privado
    console.log(`Iniciando chat con ${userName} (ID: ${userId})`);
};

loadContacts();
// Enviar mensaje
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.emit('chatMessage', message);
    messageInput.value = '';
});

// Recibir mensajes
socket.on('message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    messagesList.appendChild(li);
});

const sendMessage = (req, res) => {
    const { contenido, receptorId } = req.body;
    const emisorId = req.user.id;

    const sql = `INSERT INTO mensajes (contenido, id_emisor, id_receptor, fecha_envio) VALUES (?, ?, ?, NOW())`;
    db.query(sql, [contenido, emisorId, receptorId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Mensaje enviado' });
    });
};

const getMessages = (req, res) => {
    const { receptorId } = req.params;
    const emisorId = req.user.id;

    const sql = `
        SELECT * FROM mensajes
        WHERE (id_emisor = ? AND id_receptor = ?)
        OR (id_emisor = ? AND id_receptor = ?)
        ORDER BY fecha_envio
    `;
    db.query(sql, [emisorId, receptorId, receptorId, emisorId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { sendMessage, getMessages };

