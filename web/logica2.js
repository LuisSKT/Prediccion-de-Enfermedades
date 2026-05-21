async function evaluar(tipoAlgoritmo) {
    const glucosa = document.getElementById('glucosa').value;
    const edad = document.getElementById('edad').value;
    const presion = document.getElementById('presion').value;

    if(!glucosa || !edad || !presion) {
        alert("Por favor, llena todos los campos médicos.");
        return;
    }

    const datos = { glucosa, edad, presion };
    
    const ruta = tipoAlgoritmo === 'arbol' ? '/api/arbol' : '/api/xgboost';

    try {
        const respuesta = await fetch(`http://localhost:3000${ruta}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const data = await respuesta.json();
        
        let htmlResultado = `
            <h3>Resultado de Evaluación</h3>
            <p><strong>Algoritmo Usado:</strong> ${data.algoritmo}</p>
            <p><strong>Diagnóstico:</strong> <span style="color:red; font-weight:bold;">${data.diagnostico}</span></p>
        `;

        if(data.probabilidad) {
            htmlResultado += `<p><strong>Probabilidad Crítica:</strong> ${data.probabilidad}</p>`;
        }

        document.getElementById('resultado').innerHTML = htmlResultado;
        
    } catch (error) {
        console.error("Error conectando al servidor", error);
        alert("Error de conexión. Asegúrate de que node server.js esté corriendo.");
    }
}