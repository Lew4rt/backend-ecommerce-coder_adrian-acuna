import logger from "../../logs/logger";

const socket = io();

let user;
const chatBox = document.getElementById('chatBox')
Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa tu usuario para identificarte en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    logger.info(user)
    socket.emit('login', user)
})

chatBox.addEventListener('keyup', evento => {
    if (evento.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatBox.value })
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    })
    log.innerHTML = messages;
})

socket.on('register', data => {
    logger.info(data)
    Swal.fire({
        title: 'Se registro un nuevo usuario',
        text: `El nombre del usuario es ${data}`,
        icon: 'success',
        toast: true
    })
})