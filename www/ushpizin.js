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
	
	var person = controls.person.value;
	var borderType = controls.borderType.value;
	var borderOnTime = controls.borderOnTime.value;
	var borderOffTime = controls.borderOffTime.value;
	var elType = controls.elType.value;
	
	var data = "p"+person+"b"+borderType+"s"+pad(borderOnTime,2)+"h"+pad(borderOffTime,2)+"e"+elType;
	alert(data);
	return data;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}