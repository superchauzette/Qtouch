var qtouch = require("qtouch");
var piblaster = require("pi-blaster.js");
var converter = require("color-convert");


// qtouch.read(function(data){
// 	if(data=="0x00"){
// 		 	rgb(0, 0, 0);
// 	}
// 	else if(data=="0x01"){
// 	 	rgb(50, 50, 50);
// 	}
// 	else{
// 		console.log(data);
// 	}
// });

qtouch.onPressLong(function(data){
	console.log(data);
});


function balayageColor(curseur){
	hsl(1, 1, curseur/100);
}

function rgb(r, g, b){
	piblaster.setPwm(22, r/255);
	piblaster.setPwm(23, g/255);
	piblaster.setPwm(24, b/255);
}

function hsl(h, s, l){
	var rgb = converter.hsl2rgb(h,s,l); 
	rgb(rgb[0], rgb[1], rgb[2]);
}

