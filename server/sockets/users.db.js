var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/edumate', ['users']);
 
var users = {
 
    getAllUsers: function(callback) {
        db.users.find(callback);
    },
    saveUser: function(user, callback) {
        db.users.insert(user, callback);
    },
    updateUser: function(user, callback) {
        db.user.update({
            id: user.id
        }, user, {}, callback);
    },
    deleteUser: function(id, callback) {
        db.users.remove({
            id: id
        }, '', callback);
    }
}
 
module.exports = users;