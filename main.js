var qtouch = require("./qtouch");
var Led = require("./commandeLED");

var curseurColor=0;
var curseurLightness=0;
var curseurON=0;
var ON = true;

// sur l'appui sur bouton 0 KEY0
qtouch.onPressUp(0, function(){
    if(ON){ // sur le premier appui
        var boucle = setInterval(function() {  // on boucle pour augmenter la luminosité
            if(curseurON>100){ // Pour arrêter la boucle, le curseur va de 0 à 100, supérieur sinon il ne s'arreter pas à 100
				clearInterval(boucle);
				ON=false;
			}
            Led.setHSV(0, 0, curseurON);  
            curseurON=curseurON+5;
          },5);
    }else{  // sur le second appui
         var boucle = setInterval(function() {
            if(curseurON<0){ // Pour arrêter la boucle, le curseur va de 0 à 100, supérieur sinon il ne s'arreter pas à 100
				clearInterval(boucle);
				ON=true;
			}
            Led.setHSV(0, 0, curseurON);
            curseurON=curseurON-5;
        },5);
    }
});

function BoutonAllumer(mot,decalage){
	if ( (mot>>decalage) & mask) )
		return true;
	else
		return false;
}


//lecture en continu des valeurs sur bus I2C
qtouch.read(function(dataI2C){
    // sur le maintien du bouton 1 balaye les couleurs
    if(qtouch.BoutonAllumer(dataI2C,1)){
        if(curseurColor>360) curseurColor=0; //remettre le curseur à 0
        Led.setHSV(curseurColor, 100, 100); // Le curseur va de 0 à 360
		curseurColor++;
    }
    
     // sur le maintien du bouton 2 balaye la luninosité
    if(qtouch.BoutonAllumer(dataI2C,2)){
        if(curseurLightness>100) curseurLightness=0;   //remettre le curseur à 0
        Led.setHSV(0, 0, curseurLightness); // Le curseur va de 0 à 100
		curseurLightness++;
        
    }
});
