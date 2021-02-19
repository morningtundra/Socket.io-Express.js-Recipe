const io = require( "socket.io" )();
const socketapi = { io: io };

io.on( "connection", (socket) => {
    console.log( "A user connected" );
    io.emit('message', 'Hi Browser, this is your Server emitting');
    io.on('disconnect', () => {
        console.log(" A user disconnected");
    })
});

module.exports = socketapi;