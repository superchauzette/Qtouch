/*
* Librairie du composant Qtouch : AT42QT1070
*
*/

var exec = require('child_process').exec;
var CMD = "i2cget -y 1 0x1b 0x03 b";  //commande pour lire le bus I2C avec le soft i2cget à l'adresse 0x1b au registre 0x03

//lit la valeur du bus I2C à intervalle regulier (50ms)
function read(callback) {
   setInterval(function() {
		exec(CMD, function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + eri2cgetror);
			}		
			callback(stdout.trim()) 	
		});
	}, 50 );
}

// fct declanché lors d'un changement de valeur sur le bus I2C
function onChange(callback){
	var oldVal = "";
	read(function(newVal){
		if(newVal.trim() != oldVal.trim()){
			callback(newVal.trim(),oldVal.trim());
		}
		oldVal=newVal.trim();
	});
}

function onPressLong(timer, callback){
	setInterval(function() {
		exec(CMD, function (error, stdout1, stderr) {
		    if(stdout1.trim() != "0x00"){
    			setTimeout(function(){
    				exec(CMD, function (error, stdout2, stderr){
     					if( stdout1.trim() == stdout2.trim() ){
     						callback(stdout1.trim());
     					}
    				});				
    			}, timer);
		    }
		});
	},timer+50);
}

// fct declanché lors du relachement de l'appui du bouton numBtn
function onPressDown(numBtn, callback){
	onChange(function(newVal, oldVal){
		if (BoutonAllumer(oldVal,numBtn)){
		    callback();
		}
	});
}

// fct declanché lors de l'appui du bouton numBtn
function onPressUp(numBtn, callback){
	onChange(function(newVal, oldVal){
		if (BoutonAllumer(newVal,numBtn)){
		    callback();
		}
	});
}

// MASQUE BINAIRE pour tester par rapport au data I2C lue si le bouton entrer en paramatre est enclenché ou non
function BoutonAllumer(mot,numBtn){
	return ((mot>>numBtn) & '0x01')
}

//les exports
exports.onChange = onChange;
exports.read = read;
exports.BoutonAllumer = BoutonAllumer;
exports.onPressLong = onPressLong;
exports.onPressDown = onPressDown;
exports.onPressUp = onPressUp;
