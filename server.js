var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 7000, function(){
	console.log('http://localhost:7000/');	
});

var mang = [];
io.on("connection", function(socket){
	console.log("co client ket noi " + socket.id);
	socket.on("hocvien-gui-thongtin", function(data){
		mang.push(
				new HocVien(data.name, data.email, data.phone)
			);
		io.sockets.emit("server-gui-ds", mang);
	});
});

function HocVien(hoten, email, sdt){
	this.name = hoten;
	this.email = email;
	this.phone = sdt;
}
app.get("/", function(req, res){
	res.render("trangchu");
});