var usersDB = require('./users.db');
module.exports = function(io) {
 
    var users = io.of('/users');
 
    users.on('connection', function(socket) {
 
        socket.on('getAllUsers', function() {
            dispatchAll(socket);
        });
 
        socket.on('saveUser', function(user) {
            usersDB.saveUser(user, function(err, data) {
                if (err) throw err; // You can emit the error to a socket	
                dispatchAll(socket);
            });
        });
 
        socket.on('updateUser', function(data) {
            usersDB.updateUser(data, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
        
        socket.on('deleteUser', function(data) {
            usersDB.deleteUser(data.id, function(err, data) {
                if (err) throw err; // You can emit the error to a socket 
                dispatchAll(socket);
            });
        });
 
        // On connection send all the users, to save one round trip
        dispatchAll(socket);
    });
 
 
    function dispatchAll(socket) {
        usersDB.getAllUsers(function(err, data) {
            if (err) throw err; // You can emit the error to a socket 
            io.of('/users').emit('allUsers', data);
        });
    }
 
    return users;
}