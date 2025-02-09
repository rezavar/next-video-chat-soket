import { createServer } from "node:http";
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = !dev ? 'www' : 'localhost';
const port = 3000;

const app = next({ dev, hostname, port , turbo:true,  turbopack: true});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);

    const io = new Server(httpServer, {
        // path: '/socket.io',
    });

    io.on('connection', (socket) => {
        console.log('یک کاربر متصل شد');

        socket.on('send-message', (message) => {
            console.log(`پیام از کاربر ${socket.id}: ${message}`);
            io.emit('receive-message', message);
        });

        socket.on('disconnect', () => {
            console.log('یک کاربر قطع اتصال کرد');
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
