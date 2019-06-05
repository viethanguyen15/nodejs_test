var socket = io("https://havietsocket.herokuapp.com");

socket.on("server-gui-ds", function(data){
	$("#ds").html("");
	data.map(function(hocvien, index){
		$("#ds").append(`
				<div class="hocvien">
					<div class="hang1">stt: `+ index +` || <span>name: ` + hocvien.name + `</span></div>
					<div class="hang2">email: `+ hocvien.email +` - phone: ` + hocvien.phone + `</div>
				</div>
			`);
	});
});

$(document).ready(function(){
	$("#btnRegister").click(function(){
		socket.emit("hocvien-gui-thongtin",
				{name: $("#txtHoTen").val(),
			 	 email: $("#txtEmail").val(),
			 	 phone: $("#txtSdt").val(),
				}
			);
	});
});