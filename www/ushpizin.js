var connected = false;
var btAddress = "20:15:06:01:27:93";
function connect() {
	bluetoothSerial.isConnected(function connected() {
			connected = false;
			$("#connState").text("Disconnected");
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
		$("#connState").text("Disconnected");
		}
	);
}

function getData() {

	var ushpiz = $('input[name="ushpiz"]:checked').val();
	var borderType = $('input[name="borderType"]:checked').val();
	var borderOnTime = $('input[name="borderOnTime"]').val();
	var borderOffTime = $('input[name="borderOffTime"]').val();
	var elType = $('input[name="elType"]:checked').val();
	var elOnTime = $('input[name="elOnTime"]').val();
	var elOffTime = $('input[name="elOffTime"]').val();
	
	var data = "u"+ushpiz+"s"+borderOnTime+"h"+borderOffTime+"b"+borderType+"S"+elOnTime+"H"+elOffTime+"e"+elType+"X";;
	alert(data);
	return data;
}
