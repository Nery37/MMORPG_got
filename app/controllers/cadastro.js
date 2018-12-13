module.exports.cadastro = function (application, req, res){

	res.render('cadastro', {validacao : {}, dadosForm: {}});
}

module.exports.cadastrar = function (application, req, res){

	var dadosForm = req.body;

	req.assert('nome', 'Nome Não pode ser vazio').notEmpty();
	req.assert('usuario', 'Usuario Não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha Não pode ser vazio').notEmpty();
	req.assert('casa', 'Casa Não pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao : erros, dadosForm : dadosForm});
		return;
	}
	var connection = application.config.dbConnection;
	

	var UsuariosDAO = new application.app.models.UsuariosDAO(connection, req, res);
	var JogoDAO = new application.app.models.JogoDAO(connection, req, res);

	UsuariosDAO.inserirUsuario(dadosForm);
		JogoDAO.gerarparametros(dadosForm.usuario);
		

	res.send("Podemos cadastrar");
}