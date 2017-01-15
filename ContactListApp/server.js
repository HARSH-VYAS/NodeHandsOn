var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contactList',['contactList']);
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req,resp){
	console.log("I received a get request");

	db.contactList.find(function(err,docs){
		console.log('We got the data');
		resp.json(docs);
	})
			
});

app.post('/contactList', function(req,resp){
	console.log(req.body);
	db.contactList.insert(req.body, function(err,doc){
		resp.json(doc);
	});
});

app.delete('/contactList/:id', function(req,resp){
	var id = req.params.id;
	console.log(id);
	db.contactList.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
		resp.json(doc);
	});
});

app.get('/contactList/:id',function(req,resp){
	var id = req.params.id;
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		resp.json(doc);
	});
});

app.put('/contactList/:id',function(req,resp){
	var id = req.params.id;
	db.contactList.findAndModify({query:{_id: mongojs.ObjectId(id)},
		update: {$set:{name:req.body.name , email:req.body.email, number:req.body.number}},
		new:true}, function(err,doc){
			resp.json(doc);
		});
});

app.listen(8880);
console.log("Server is running on port 8880");

