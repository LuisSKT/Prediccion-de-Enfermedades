const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'bd_universidad',
    password: '1234',
    port: 5432,
});

app.post('/api/login', async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const query = 'SELECT * FROM usuarios WHERE usuario = $1 AND password = $2';
        const result = await pool.query(query, [usuario, password]);

       if (result.rows.length > 0) {
            res.status(200).json({
                success: true,
                mensaje: "Inicio de sesión exitoso",
                rol: result.rows[0].rol
            });
        } else {
            res.status(401).json({ success: false, mensaje: "Usuario o clave incorrectos" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, mensaje: "Error interno del servidor" });
    }
});


// --- ALGORITMO 1: ÁRBOL DE DECISIÓN (ALGORITMO INICIAL) ---
app.post('/api/arbol', (req, res) => {

    const glucosa = parseInt(req.body.glucosa);
    const edad = parseInt(req.body.edad);
    let resultado = "";

    if (glucosa > 125) {
        if (edad > 45) {
            resultado = "Alto Riesgo (Diabetes Crónica)";
        } else {
            resultado = "Riesgo Moderado (Prediabetes)";
        }
    } else {
        resultado = "Riesgo Bajo (Paciente Sano)";
    }

    res.json({ algoritmo: "Árbol de Decisión", diagnostico: resultado });
});


// --- ALGORITMO 2: SIMULACIÓN XGBOOST (ALGORITMO VERSIÓN MEJORADA) ---
app.post('/api/xgboost', (req, res) => {

    const { glucosa, edad, presion } = req.body;
    let score = 0;

    // Sub-árbol 1: Factor metabólico principal
    if (glucosa > 100) score += 0.4;
    if (glucosa > 125) score += 0.3;
    
    // Sub-árbol 2: Factor etario de degeneración celular
    if (edad > 45) score += 0.15;
    
    // Sub-árbol 3: Factor de riesgo cardiovascular complementario
    if (presion > 130) score += 0.15;

    let resultado = score >= 0.7 ? "Alto Riesgo Crítico" : (score >= 0.4 ? "Riesgo Moderado" : "Bajo Riesgo");

    res.json({ 
        algoritmo: "XGBoost Ensamble", 
        diagnostico: resultado, 
        probabilidad: Math.round(score * 100) + "%" 
    });
});


const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});