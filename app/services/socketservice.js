'use strict';

var socketRef;

function setSocket(socketio){
    socketio.on('connection', function (socket) {
        socketRef = socket;
        emit("socket_status", {msg:"success"});
    });
}

function emit(eventName, data, callback) {
    socketRef.emit(eventName, data, function () {
        var args = arguments;
    });
}

function getSocket(){
    return socket;
}

exports.setSocket = setSocket;
exports.getSocket = getSocket;
exports.emit = emit;