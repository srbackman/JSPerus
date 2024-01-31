//BACKEND//
const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const polku = join(__dirname, './public');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);
const favgames = require('./FavoriteGames.json');

app.use(express.static(polku));

io.on('connection', (socket) =>
{
    //Kun palvelin saa viestin jakaa se sen kaikille.
    socket.on('chat message', (msg) =>
    {
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () =>
{
    console.log(`server started on port ${PORT}`);
});

app.get('/api/favgames', (req, res) =>
{
    res.json(favgames);
});
