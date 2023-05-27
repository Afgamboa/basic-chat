import express from 'express';
import path ,{ dirname} from 'path';
import { fileURLToPath } from 'url';
import { Server } from "socket.io";

//start server
const app = express();
const port = process.env.PORT || 3002;

const server = app.listen(port, async () => {
    console.log("chat app running on port", port);
});

// accede al directorio del proyecto y le añade la carpeta public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// web sockets
const io = new Server(server)

// el primer evento de escucha de io es cuando se conecta un nuevo cliente

io.on('connection', (socket) => {

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message:serve', data)
    })

    socket.on('chat:typing', (data) => {
        // si queremos emitir un evento desde el servidor que lo vean todos menos el cliente que lo envia se usa el metodo broadcast
        socket.broadcast.emit('chat:typing:serve', data)
    })
})



