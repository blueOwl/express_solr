var solr = require('solr-client')

var client = solr.createClient({
    host: '127.0.0.1',
    port: '8983',
    core: 'mep',
    protocol: 'http'
});

var query2 = client.createQuery()
				   .q('Star Wars')
				   .start(0)
				   .rows(10)//.sort({"pageRankFile": "desc"});
client.search(query2,function(err,obj){
   if(err){
   	console.log(err);
   }else{
   	console.log("res");
   	console.log(obj);
   	console.log(obj.response.docs);
   }
});
