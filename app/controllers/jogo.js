module.exports.jogo = function (application, req, res){
	if(req.session.autorizado){
		var connection = application.config.dbConnection; 
		var JogoDAO = new application.app.models.JogoDAO(connection, req, res);
		JogoDAO.atribuirValores(req.session.usuario, req, res);
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