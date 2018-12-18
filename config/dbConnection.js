/* importar o mongodb */

var mongo = require("mongodb").MongoClient;
var assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "got";

var connMongoDB = function(dados, req, res) {
mongo.connect(url, { useNewUrlParser: true }, function(err, client) {
assert.equal(null, err);
console.log("Connected successfully to server");
const db = client.db(dbName);
query(db, dados, req, res);
client.close();
});
};
function query(db, dados, req, res) {
var collection = db.collection(dados.collection);
switch (dados.operacao) {
case "inserir":
collection.insertOne(dados.usuario, dados.callback);
break;
case "inserirAcao":
collection.insertOne(dados.usuariob, dados.callback);
break;
case "inserirEspecial":
collection.insertOne(dados.usuariob, dados.callback);
break;
case "update":
collection.update({usuarioa : dados.usuariob}, {$inc: {"moeda": dados.moedas}}, dados.callback);
break;
case "pesquisaEspecialtwo":

var date = new Date();
var momento_atual = date.getTime();
collection.find({ usuario : dados.usuario, hora: {$gt:momento_atual} }).toArray(function(err, result){

	//console.log(result);
	 if(result[0] != undefined){ 	

			//console.log(result[0]);
		res.render('pergaminhos', { result: result });

	}


});
break;
case "pesquisa":
collection.find(dados.usuario).toArray(function(err, result){

	//console.log(result + "ta aqui");
	 if(result[0] != undefined){

		req.session.autorizado = true;
		req.session.usuario = result[0].usuario;
		req.session.casa = result[0].casa;

	}
	if (req.session.autorizado){
		res.redirect("jogo");		
	}else {
		res.render("index", {validacao : {}});
	}

});
break;
case "pesquisaEspecial":
collection.find(dados.usuarioa).toArray(function(err, result){

	//console.log(result);
	 if(result[0] != undefined){ 			

	 		//console.log(result[0]);
			res.render('jogo', {img_casa : req.session.casa, result : result[0], msg : dados.validaPreenche});

	}


});
break;
default:
break;
}
}
module.exports = function() {
return connMongoDB;
};

