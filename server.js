var express = require("express");// include pakage express
var app = express();
var server = require("http").Server(app);
var io =require("socket.io")(server);
var mysql = require('mysql');
var mqtt  = require('mqtt');
var options = {
  username: 'hamqtt',
  password: 'haha'
}

var client = mqtt.connect('mqtt://localhost:1883/', options);
var toppic1 = 'hatt';
function publish(topic,msg,options){
	
	if (client.connected == true){
		console.log("publishing",msg);
		client.publish(topic,msg,options);
	}
}
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

server.listen(5000, function(){
	console.log('http://localhost:5000/');	
});

io.on("connection", function(socket){
	console.log("co client ket noi");
	console.log("User: " + socket.id + " connection!");
socket.on("disconnect", function(){
    console.log("User: " + socket.id + " disconnected!");
  });
socket.on("control-led", function(data){
	//console.log(data);
	publish(toppic1, data.toString(), options);
	console.log("i see");
  });   
});
app.get("/", function(req, res){
    res.render("index");
});

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "sensor3user",
  password : "123456",
  database : "sensor3"
});

connection.connect(function(error) {
	if (error) {
		console.log('error connecting:');
		return;	
	}
	else{
		console.log('connected mysql');
	}
});

app.get("/hadata1", function(req, res){
	connection.query("SELECT * FROM sensor_thi WHERE sensor_id = (SELECT max(sensor_id) FROM sensor_thi)", function(error, result){
	if(error) throw error;
	connection.query("SELECT max(Temp) as Temperature from sensor_thi", function(error, maxtemp){
		if(error) throw error;
		connection.query("SELECT max(Hum) as Humidity from sensor_thi", function(error, maxhum){
			if(error) throw error;
			connection.query("SELECT max(Light) as Light from sensor_thi", function(error, maxlight){
				if(error) throw error;
					connection.query("SELECT min(Temp) as Temperature from sensor_thi", function(error, mintemp){
						if(error) throw error;
						connection.query("SELECT min(Hum) as Humidity from sensor_thi", function(error, minhum){
							if(error) throw error;
							connection.query("SELECT min(Light) as Light from sensor_thi", function(error, minlight){
								if(error) throw error;
				
								var array = {
									result: result[0],
									maxtemp: maxtemp[0], maxhum: maxhum[0], maxlight: maxlight[0],
									mintemp: mintemp[0], minhum: minhum[0], minlight: minlight[0]
								};
								res.json(array);
			
							});
						});
					});
				});
			});
		});	
	})
});