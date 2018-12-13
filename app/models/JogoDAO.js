function JogoDAO(connection, req, res) {
this._connection = connection;
t1 = req;
t2 = res;
}

JogoDAO.prototype.gerarparametros = function(usuario){

var info = {usuarioa: usuario,
moeda: 15,
suditos: 10,
temor: Math.floor(Math.random() * 1000),   // << serve pra gerar valores de 0 a 1000 de forma randomica.
sabedoria: Math.floor(Math.random() * 1000),
comercio: Math.floor(Math.random() * 1000),
magia: Math.floor(Math.random() * 1000)}

	var dados = {
operacao: "inserirEspecial",
usuariob: info,
collection: "jogo",
callback: function(err, result) {
}
};
this._connection(dados, t1, t2);
};

JogoDAO.prototype.atribuirValores = function(dadosForm, req, res) {

var dados = {
operacao: "pesquisaEspecial",
usuarioa: dadosForm,
collection: "jogo",
callback: function(err, result) {
}
};
this._connection(dados, t1, t2);
};

module.exports = function() {
return JogoDAO;
};