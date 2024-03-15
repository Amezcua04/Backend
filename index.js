import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import router from './routers';

// Conexión a la base de datos
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://localhost:27017/BMW";
mongoose.connect(
    dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(mongoose => console.log("CONECTADO A LA BD EN EL PUERTO 27017")).catch((err) => console.error(err));

const app = express();
app.use(cors());
// Dirección del directorio publico para el acceso a los archivos estáticos (css y js)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api/', router);

// Configuración del puerto en el que se ejecutará la aplicación
app.set('port', process.env.PORT ||  3000);
app.listen(app.get('port'), () => {
    console.log("EL SERVIDOR SE EJECUTO CORRECTAMENTE EN EL PUERTO 3000");
});