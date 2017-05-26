function loginDao(connection) {
    this._connection = connection;
}

loginDao.prototype.searchUser = function(email,password,callback) {
    this._connection.query("select email, password from adminUsers where email = ? and password = ?;", email,password,callback);
}

loginDao.prototype.list = function(users,callback) {
    this._connection.query("select email, password from adminUsers;", users,callback);
}

module.exports = function(){
    return loginDao;
};
