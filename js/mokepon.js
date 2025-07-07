// creaciones de variables globales.
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;


// funcion donde se crea interaciones con los botones de seleccion de mascota y ataques.
function iniciarJuego() {
    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierrra = document.getElementById('boton-tierra');
    botonTierrra.addEventListener('click', ataqueTierra);
}

// funcion donde se crea una variable aleatoria.
function aleatorio(min , max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// funcion donde se escoge la mascota con la cual atacaras para luego mostrarlo en el etiqueta "span", ademas de una alerta donde te muestra que mascota escogiste y por ultimo
// llamamos la funcion de llamar la mascota enemigo.
function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById('Hipodoge');
    let inputCapipepo = document.getElementById('Capipepo');
    let inputRatigueya = document.getElementById('Ratigueya');
    let inputLangistelvis = document.getElementById('Langistelvis');
    let inputTucapalma = document.getElementById('Tucapalma');
    let inputPydos = document.getElementById('Pydos');

    let spanMascotaJugador = document.getElementById('mascota-jugador');

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = 'Hipodoge';
        // alert('Seleccionaste Hipodoge');
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = 'Capipepo';
        // alert('Seleccionaste a Capipepo');
    }else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = 'Ratigueya';
        // alert('Seleccionaste a Ratigueya');
    }else if(inputLangistelvis.checked){
        spanMascotaJugador.innerHTML = 'Langistelvis';
        // alert('Seleccionaste a Langistelvis');
    }else if(inputTucapalma.checked){
        spanMascotaJugador.innerHTML = 'Tucapalma';
        // alert('Seleccionaste a Tucapalma');
    }else if(inputPydos.checked){
        spanMascotaJugador.innerHTML = 'Pydos';
        // alert('Seleccionaste a Pydos');
    }else{
        alert('No seleccionaste nada');
    }

    seleccionarMascotaEnemigo();

}

//funcion donde se crea ataque fuego y ademas invocamos ataque aleatorio enemigo.
function ataqueFuego() {
    ataqueJugador = 'Fuego';
     ataqueAleatorioEnemigo();
}

//funcion donde se crea ataque agua y ademas invocamos ataque aleatorio enemigo.
function ataqueAgua() {
    ataqueJugador = 'Agua';
     ataqueAleatorioEnemigo();
}

//funcion donde se crea ataque tierra y ademas invocamos ataque aleatorio enemigo.
function ataqueTierra() {
    ataqueJugador = 'Tierra';
    ataqueAleatorioEnemigo();
}

//Creamos una funcion para hacer el ataque enemigo aleatorio, ademas llamamos la funcion aleatorio.
// llamos la funcion de combate para poder mostrar si ganamos o perdimos en el HTML.
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,6);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Fuego';
    }else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Agua';
    }else {
        ataqueEnemigo = 'Tierra';
    }

    combate();
}

//creamos una desicion para poder saber si ganamos, perdimos o empatamos con el enemigo.
function combate() {
    let spanVidaJugador = document.getElementById('vidas-jugador');
    let spanVidaEnemigo = document.getElementById('vidas-enemigo');

     if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
    } else if(ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidaEnemigo.innerHTML = vidasEnemigo;
    } else if(ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidaEnemigo.innerHTML = vidasEnemigo;
    } else if(ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua') {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidaEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidaJugador.innerHTML = vidasJugador;
    }
    
    // Revisar las vidas
    revisarVidas();

}

function revisarVidas() {
    if(vidasEnemigo == 0){
        crearMensajeFinal('Felicitaciones Ganaste!');

    }else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :c');

    }
}


function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('mensaje');

    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadoFinal

    sectionMensajes.appendChild(parrafo);
}

//En esta funcion creamos un mensaje para mostrar que ataque escogimos y el ataque aleatorio del enemigo.
function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('mensaje');

    let parrafo = document.createElement('p');
    parrafo.innerHTML = 'Tu mascota Ataco con ' + ataqueJugador + ', la mascota del enemigo ataco con ' + ataqueEnemigo + ' - ' + resultado;

    sectionMensajes.appendChild(parrafo);
}

//Creamos una funcion para poder llamar la mascota enemiga pero de forma aleatoria y poder mostrarla en el HTML.
function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1,6);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipodoge';

    }else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo';

    }else if(mascotaAleatorio == 3){
        spanMascotaEnemigo.innerHTML = 'Ratigueya';

    }else if (mascotaAleatorio == 4) {
        spanMascotaEnemigo.innerHTML = 'Langistelvis';

    }else if (mascotaAleatorio == 5) {
        spanMascotaEnemigo.innerHTML = 'Tucapalma';

    }else if (mascotaAleatorio == 6) {
        spanMascotaEnemigo.innerHTML = 'Pydos';
    }
}


// Ejecuta iniciarJuego() cuando la página termine de cargar por completo.
window.addEventListener('load', iniciarJuego);