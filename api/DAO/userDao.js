function userDao(connection) {
    this._connection = connection;
}

userDao.prototype.saveUser = function(novoUser,callback) {
    this._connection.query('INSERT INTO users SET ?',novoUser, callback);
    console.log(this._connection.query);
}

userDao.prototype.saveUserAddress = function(newUserAddress,callback) {
    this._connection.query('INSERT INTO address SET ?', newUserAddress, callback);
}

userDao.prototype.list = function(user,callback) {
    this._connection.query("select a.*,u.*,r.* from users as u join address as a on u.rg = a.user_rg join roles as r on r.id = u.user_role;"
, user, callback);
}

userDao.prototype.changeUser = function(user,rg,callback){
  this._connection.query("UPDATE users set ? WHERE rg = ? ",[user,rg],callback);
}

userDao.prototype.changeAddress = function(user,address,rg,callback){
  this._connection.query("UPDATE address set ? WHERE rg = ? ",[address,rg],callback);
}

// userDao.prototype.alteraProduto = function(user,callback) {
//     this._connection.query("update produtos set nome = user.name",)
// }

userDao.prototype.categoryUser = function(role,callback){
  this._connection.query("select * from roles",role,callback);
}

userDao.prototype.searchForId = function (id,callback) {
    this._connection.query("select * from pagamentos where id = ?",[id],callback);
}

module.exports = function(){
    return userDao;
};
