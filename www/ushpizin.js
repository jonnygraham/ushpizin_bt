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
	var controls = $("#controls");
	
	var ushpiz = controls.ushpiz.value;
	var borderType = controls.borderType.value;
	var borderOnTime = controls.borderOnTime.value;
	var borderOffTime = controls.borderOffTime.value;
	var elType = controls.elType.value;
	var elOnTime = controls.elOnTime.value;
	var elOffTime = controls.elOffTime.value;
	
	var data = "u"+ushpiz+"s"+borderOnTime+"h"+borderOffTime+"b"+borderType+"e"+elType+"S"+elOnTime+"H"+elOffTime+"X";;
	alert(data);
	return data;
}
