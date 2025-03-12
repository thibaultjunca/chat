var sock = io.connect("/ip");

sock.on('getMessages', addMessage);
let msg = document.querySelector('#message');

if (localStorage.getItem('msg')) {
    let msgs = localStorage.getItem('msg');
    let msgSplit = msgs.split(",");
    for (const msg of msgSplit) {
        addMessage(msg);
    }
}

msg.addEventListener('change', event => {
    sock.emit('sendMessage', msg.value);
    let prevMsg = localStorage.getItem('msg');
    localStorage.setItem('msg', prevMsg + "," + msg.value)
    addMessage(msg.value)
})

function addMessage(data){
    let randRGB = 'rgb(' + Math.random() * 200 + ', ' + Math.random() * 200 + ', ' + Math.random() * 200 + ')';
    let message = document.createElement('p');
    message.innerHTML = data;
    message.style.backgroundColor = randRGB;
    document.querySelector('#messageList').appendChild(message);
}