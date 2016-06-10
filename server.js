var http = require("http");
var url =  require("url");

function iniciar(route, handle) {
    function onRequest(request, response){
        var postedData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Petición para " + pathname + " recibida.");
        
        request.setEncoding("utf8");
        
        request.addListener("data", function(postedChunk){
            postedData += postedChunk;
            console.log("Recibido trozo POST '" + postedChunk + "'");
        });
        
        request.addListener("end", function(){
           route(handle, pathname, response, postedData); 
        });
    }
    
    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciado.");
}    

exports.iniciar = iniciar;