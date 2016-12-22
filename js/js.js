var y = 12; /* altura inicial y0=10%, debe leerse al iniciar si queremos que
tenga alturas diferentes dependiendo del dispositivo*/
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventoss
	//mostrar menú móvil
	document.getElementById("nave").style.display = "block";
    document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
	}
	//comienzo del juego pulsando play
	document.getElementById("start").onclick = function(){
		document.getElementById("start").style.display = "none";
		document.getElementById("pausa").style.display = "block";
		//encender/apagar el motor al hacer click en la pantalla
		document.onclick = function () {
 	  		if (a==g){
  					motorOn();
 		 	} else {
  				motorOff();
 	 	 	}
 		}
		//encender/apagar al apretar/soltar una tecla
		document.onkeydown = function(){
			motorOn();
		}
		document.onkeyup = function(){
			motorOff();	
		}	
	//Empezar a mover nave
		start();
	}
	//Pausar el juego con el boton de pausa
	document.getElementById("pausa").onclick = function(){
		document.getElementById("start").style.display = "block";
		document.getElementById("pausa").style.display = "none";
		stop();
		timerFuel = null;
		document.onclick = function(){
			motorOff();
		}
		document.onkeydown = function(){
			motorOff();
		}
		
	}
}

//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v;
	y +=v*dt;
	document.getElementById("altura").innerHTML=-y+70;
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%";
		document.getElementById("naveon").style.top = y+"%";
		document.getElementById("navelose").style.top = y+"%";
	} else {
		if (v>=5){
		document.getElementById("navelose").style.display = "block";
		document.getElementById("finalfatal").style.display = "block";
		}
		document.getElementById("altura").innerHTML=0;
		stop();
		document.getElementById("restart").style.display = "block";
		document.getElementById("finalfeliz").style.display = "block";
		document.getElementById("pausa").style.display = "none";
	}

}
function motorOn(){
	if (y<70){
	a=-g;
	document.getElementById("naveon").style.display = "block";
	document.getElementById("nave").style.display = "none";
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarAltura(); }, 10);
	}
}
function motorOff(){
	a=g;
	document.getElementById("naveon").style.display = "none";
	document.getElementById("nave").style.display = "block";
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarAltura(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	if (fuel>0){
	fuel-=0.1;
	document.getElementById("fuel").innerHTML=fuel;
	} else {
		fuel = 0;
		timerFuel=null; 
		document.getElementById("fuel").innerHTML=fuel;
		motorOff();
	}
}