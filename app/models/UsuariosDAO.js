function UsuariosDAO(connection, req, res) {
this._connection = connection;
t1 = req;
t2 = res;
}
UsuariosDAO.prototype.inserirUsuario = function(usuario, res) {
var dados = {
operacao: "inserir",
usuario: usuario,
collection: "usuarios",
callback: function(err, result) {
}
};
this._connection(dados);
};

UsuariosDAO.prototype.autenticar = function(dadosForm, req, res) {

var dados = {
operacao: "pesquisa",
usuario: dadosForm,
collection: "usuarios",
callback: function(err, result) {
}
};
this._connection(dados, t1, t2);
};

module.exports = function() {
return UsuariosDAO;
};