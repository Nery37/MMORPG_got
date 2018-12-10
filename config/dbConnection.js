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
case "pesquisa":
collection.find(dados.usuario).toArray(function(err, result){

	console.log(result);
	 if(result[0] != undefined){

		req.session.autorizado = true;
		console.log('entrou');

	}
	if (req.session.autorizado){
		res.send('Usuario encontrado no banco de dados');		
	}else {
		res.send('Usuario não existe.');
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

