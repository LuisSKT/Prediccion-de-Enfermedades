document.getElementById('formularioLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('clave').value;
    const mensaje = document.getElementById('mensaje');

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = "dashboard.html";

        } else {
            mensaje.innerText = data.mensaje;
            mensaje.style.display = 'block';
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        mensaje.innerText = "Error al conectar con el servidor.";
        mensaje.style.display = 'block';
    }

    if (data.success) {
        alert(data.mensaje);
        window.location.href = "dashboard.html";
    } else {
        alert("Error en el login");
    }



});