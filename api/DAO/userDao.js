function userDao(connection) {
    this._connection = connection;
};

userDao.prototype.saveUser = function(novoUser,callback) {
    this._connection.query('INSERT INTO adminusers SET ?',novoUser, callback);
};

userDao.prototype.list = function(user,callback) {
    this._connection.query("select * from adminusers;", user, callback);
};

userDao.prototype.changeUser = function(user,id,callback){
  this._connection.query("UPDATE adminusers set ? WHERE id = ? ",[user,id],callback);
};

userDao.prototype.deleteUser = function(id,callback) {
    this._connection.query('delete from adminusers where id = ?',[id], callback);
};

module.exports = function(){
    return userDao;
};
