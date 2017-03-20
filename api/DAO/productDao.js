
function productDao(connection) {
    this._connection = connection;
}

productDao.prototype.list = function(product,callback) {
    this._connection.query("select p.*, c.nome as categoria_nome from produtos as p join categorias as c on p.categoria_id = c.id;"
, product, callback);
}

module.exports = function(){
    return productDao;
};
