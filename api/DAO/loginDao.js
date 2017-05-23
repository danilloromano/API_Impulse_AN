function loginDao(connection) {
    this._connection = connection;
}

loginDao.prototype.searchUser = function(userName,password,callback) {
    this._connection.query("select name, password from users where name = ? and passwor = ?", userName,password,callback);
}
