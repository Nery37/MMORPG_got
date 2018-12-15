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

JogoDAO.prototype.atribuirValores = function(dadosForm, msg, req, res) {

var dados = {
validaPreenche: msg,
operacao: "pesquisaEspecial",
usuarioa: dadosForm,
collection: "jogo",
callback: function(err, result) {
}
};
this._connection(dados, t1, t2);
};

JogoDAO.prototype.recuperaAcao = function(usuarioa) {

var dados = {
usuario: usuarioa,
operacao: "pesquisaEspecialtwo",
collection: "acao",
callback: function(err, result) {
}
};
this._connection(dados, t1, t2);
};

	
JogoDAO.prototype.acao = function(dadosForm, req, res) {



	var tempo = null;

	switch(dadosForm.acao){
		case 1:tempo = 1 * 60 * 60000; break;
		case 2:tempo = 2 * 60 * 60000; break;
		case 3:tempo = 5 * 60 * 60000; break;
		case 4:tempo = 5 * 60 * 60000; break;

	}

		var date = new Date();
	dadosForm.hora = date.getTime() + tempo;
		// gettime retorna instante atual em milisegundos

	var dados = {
operacao: "inserirAcao",
usuariob: dadosForm,
collection: "acao",
callback: function(err, result) {
}
};
this._connection(dados, t1, t2);

}


module.exports = function() {
return JogoDAO;
};