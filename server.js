let express = require ('express');
let ip = require('ip');
let socket = require('socket.io');
let app = express();
let server = app.listen(4000);
app.use(express.static("public"));
let open = require('open');

let io = socket(
    server, 
    { 
        cors: { 
        origin: "http://" + ip.address() + ":4000", 
        methods: ["GET", "POST"], 
        transports: ['websocket', 'polling'], 
        credentials: true }, 
        allowEIO3: true 
    }
);

io.of("/ip").on("connection", getMessage);

open( 'http://' + ip.address() + ":4000", function (err) {
    if ( err ) throw err;    
});

function getMessage(socket){
    socket.on('sendMessage', function (data) {
        socket.broadcast.emit('getMessages', data);
    });
}