function loginDao(connection) {
    this._connection = connection;
};

loginDao.prototype.searchUser = function(params,callback) {
    this._connection.query("select email, password from adminUsers where email = ? and password = ?;", params,callback);
    console.log(this._connection.query);
}

module.exports = function(){
    return loginDao;
};
