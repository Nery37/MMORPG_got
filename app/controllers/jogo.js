module.exports.jogo = function (application, req, res){
	if(req.session.autorizado){

		var msg = '';
		if(req.query.msg !=''){
			// se na query (url la, n é exatamente ele, mas vc entendeu kk) do request uma propridade chamada comando invalido com o valor S (aquilo que fiz la em baixo) ele muda o valor da variavel daqui de cima
			msg = req.query.msg;
		}

		console.log(msg);
		var connection = application.config.dbConnection; 
		var JogoDAO = new application.app.models.JogoDAO(connection, req, res);
		JogoDAO.atribuirValores(req.session.usuario, msg, req, res);
}else{
	res.render('index', {validacao : {}});
}

}
module.exports.sair = function (application, req, res){
	req.session.destroy(function(err){
	res.render('index', {validacao : {}});

	});
	//req.session.destroy(função callback) é padrão.

}
module.exports.suditos = function (application, req, res){
	
		if(req.session.autorizado != true){
		res.send('Usuario não foi autenticado');
		}
		res.render('aldeoes', {validacao : {}});
	}
	

module.exports.pergaminhos = function (application, req, res){
		if(req.session.autorizado != true){
		res.send('Usuario não foi autenticado');	
		}

		var usuario = req.session.usuario;

		var connection = application.config.dbConnection;
		var JogoDAO = new application.app.models.JogoDAO(connection, req, res);

		//console.log(usuario);
		JogoDAO.recuperaAcao(usuario);

	}

module.exports.ordernar_acao_sudito = function (application, req, res){
	if(req.session.autorizado != true){
		res.send('Usuario não foi autenticado');
	}


	var dadosForm = req.body;
	console.log(dadosForm);

	req.assert('acao', 'A ação deve ser informada').notEmpty();
	req.assert('quantidade', 'A quantidade deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.redirect('jogo?msg=A');
		// em caso de erro, estou redirecinando para a rota jogo, e atribuindo uma variavel na url com o valor "S" (va para o controller da rota ali em cima q vc vai entender.)
		return;
	}

	dadosForm.usuario = req.session.usuario;

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection, req, res);

	JogoDAO.acao(dadosForm);

	res.redirect('jogo?msg=B');

}


	

