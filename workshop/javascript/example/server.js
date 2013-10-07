var express = require('express');

var todoServer = express();
todoServer.use(express.static(__dirname + '/'));
todoServer.use(express.bodyParser());

var todos = [];

todoServer.get('/todo', function(req, res) {
	res.json(todos);
});

todoServer.post('/todo', function(req, res) {
	todos.push(req.body);
	res.end();
});

todoServer.put('/todo', function(req, res) {
	for (todo in todos) {
		if (todos[todo].title == req.body.title) {
			todos[todo] = req.body;
		};
	};
	res.end();
});

todoServer.listen(8080);
console.log("Server is running ... localhost:8080");