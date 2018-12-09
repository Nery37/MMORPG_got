function UsuariosDAO(connection) {
this._connection = connection;
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
this._connection(dados, req, res);
};

module.exports = function() {
return UsuariosDAO;
};