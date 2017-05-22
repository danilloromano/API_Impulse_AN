
function productDao(connection) {
    this._connection = connection;
}

productDao.prototype.list = function(product,callback) {
    this._connection.query("select p.*, c.nome as categoria_nome from produtos as p join categorias as c on p.categoria_id = c.id;"
, product, callback);
}

productDao.prototype.listByData = function(data,callback) {
    this._connection.query("select nome,marca,lucro from produtos where data = ?",[data],callback);
    console.log(this._connection.query);
}

productDao.prototype.listCategory = function(category,callback) {
    this._connection.query("select * from categorias", category, callback);
}

productDao.prototype.saveProduct = function(novoProduto,callback) {
    this._connection.query('INSERT INTO produtos SET ?',novoProduto, callback);
    console.log(this._connection.query);
}

productDao.prototype.updateProduct = function(Produto,id,callback) {
    this._connection.query("UPDATE produtos set ? WHERE id = ? ",[Produto,id], callback);
    console.log(this._connection.query);
}

productDao.prototype.deleteProduct = function(id,callback) {
    this._connection.query('delete from produtos where id = ?',[id], callback);
}

module.exports = function(){
    return productDao;
};
