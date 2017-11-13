var express = require('express');
var map = require('./data/map');
var solr = require('solr-client')

var client = solr.createClient({
    host: '127.0.0.1',
    port: '8983',
    core: 'wsj',
    protocol: 'http'
});

var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Welcome'
  });
});

app.get('/search', function(req, res) {
	if (req.param("q")) {
		if(req.param("p") === "true") {
			s = {"pageRankFile": "desc"};	
		} 
		else {  s = {};}
	var query2 = client.createQuery()
                                   .q(req.param("q"))
                                   .start(0)
                                   .rows(10)
				   .sort(s);
	client.search(query2,function(err,obj){
	   if(err){
		console.log(err);
	   }else{
		res.setHeader('Content-Type', 'application/json');
		obj.response.docs.forEach(function(element, idx, arr){arr[idx].url = map[element.id]});
	        res.send(JSON.stringify( obj ));
	   }
	});	
	}
});

app.listen(3000);
