//Lets require/import the HTTP module
var http = require('http');
//
//Lets define a port we want to listen to
const PORT=8081; 
const LocalPath=__dirname+'/mockfiles';

//We need a function which handles requests and send response
function handleRequest(request, response){
	
	try{
			var fs = require('fs')
			var path = require('path')
			var myfilepath = path.resolve(LocalPath+request.url+".json")
 			if(myfilepath.indexOf(LocalPath) != 0)
				throw new Error('Someone tried to snoop outside of the file dir!')
			else
				{
				var obj = JSON.parse(fs.readFileSync(myfilepath, 'utf8'))
				response.end(JSON.stringify(obj))
				}
		}
	catch(err)
		{
		//send error message
		console.log('[ERROR]')
		console.log('While trying to read: '+ myfilepath)
		console.log('Getting the following error: ')
		console.log(err)
		response.end('{ "error": \n { "code":"404",\n "message":"File Not Found"} \n}')					}
	}
		//Create a server
		var server = http.createServer(handleRequest);
		//Lets start our server
		 server.listen(PORT, function(){
		//Callback triggered when server is successfully listening. Hurray!
		 console.log("Server listening on: http://localhost:%s", PORT);
		 });
