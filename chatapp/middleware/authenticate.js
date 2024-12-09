const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del encabezado

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, 'secreto'); // Verifica el token con tu clave secreta
        req.user = decoded; // Almacena los datos decodificados en req.user
        next(); // Continúa con la siguiente función
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authenticate;
