function loginDao(connection) {
    this._connection = connection;
}

loginDao.prototype.searchUser = function(user,callback) {
    this._connection.query("select name, password from users where name = ? and passwor = ?", user, callback);
}
