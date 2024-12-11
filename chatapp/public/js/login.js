const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');

// Cambiar entre login y registro
registerLink.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

loginLink.addEventListener('click', () => {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

// Registro
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const phone = document.getElementById('phone').value; // Captura el teléfono

    try {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: name,
            email: email,
            contraseña: password,
            telefono: phone, // Envía el teléfono al servidor
        }),
    });

    const result = await response.json();
    
    if (response.ok) {
        alert('Registro exitoso. Ahora inicia sesión.');
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('register-container').style.display = 'none';
    }else {
        alert(result.error || 'Error en el registro');
    }
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('No se pudo registrar. Por favor, intenta nuevamente.');
    }
});



// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                contraseña: password,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('token', result.token); // Guarda el token
            window.location.href = '/'; // Redirige al chat
        } else {
            alert(result.message|| 'Error en el inicio de sesión');
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('No se pudo iniciar sesión. Por favor, intenta nuevamente.');
    }
});



