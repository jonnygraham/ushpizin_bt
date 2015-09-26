var connected = false;
var btAddress = "20:15:06:01:27:93";
function connect() {
	$("#connState").text("Connnecting...");
	bluetoothSerial.isConnected(function connected() {
			connected = false;
			$("#connState").text("Disconnected. Click to connect");
		}, function disconnected() {
			bluetoothSerial.connect(btAddress,
				function connectSuccess() {
				  $("#connState").text("Connected");
				  connected = true;
				},
				function connectFailure() {
				  $("#connState").text("Failed to connect");
				});
		}
	);
}

function send() {
	//Check still connected
	bluetoothSerial.isConnected(function success() {
		bluetoothSerial.write(getData());
	}, function failure() {
		connected = false;
		alert("Not connected!");
		$("#connState").text("Click to connect");
		}
	);
}

function getData() {

	var ushpiz = $('input[name="ushpiz"]:checked').val();
	var borderType = $('input[name="borderType"]:checked').val();
	var borderOnTime = $('input[name="borderOnTime"]').val();
	var borderOffTime = $('input[name="borderOffTime"]').val();

	
	var data = "u"+ushpiz+"s"+borderOnTime+"h"+borderOffTime+"b"+borderType+"X";
	return data;
}
