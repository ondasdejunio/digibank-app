import express from 'express'
import cors from 'cors'
import db from './database/db.js'
import router from './routes/routes.js'
import models from './models/AppModel.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/productos', router)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log('Error de conexion:', error)
}

try {
    await db.sync({ force: false })
    console.log('Base de datos sincronizada con éxito');
} catch (error) {
    console.log('Error al sincronizar la base de datos:', error);
}


/*
app.get('/', (req, res) => {
    res.send('Hola mundo')
})
*/

app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/')
})