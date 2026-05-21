
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(express.json());

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



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


