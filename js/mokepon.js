// creaciones de variables globales.
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;


// funcion donde se crea interaciones con los botones de seleccion de mascota y ataques.
function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-Ataque');
    sectionSeleccionarAtaque.style.display = 'none';
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';

    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierrra = document.getElementById('boton-tierra');
    botonTierrra.addEventListener('click', ataqueTierra);
    
    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

// funcion donde se crea una variable aleatoria.
function aleatorio(min , max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// funcion donde se escoge la mascota con la cual atacaras para luego mostrarlo en el etiqueta "span", ademas de una alerta donde te muestra que mascota escogiste y por ultimo
// llamamos la funcion de llamar la mascota enemigo.
function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    sectionSeleccionarMascota.style.display = 'none';

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-Ataque');
    sectionSeleccionarAtaque.style.display = 'flex';

    let inputKyodonquaza = document.getElementById('kyodonquaza');
    let inputPaldiatina = document.getElementById('paldiatina');
    let inputRraichu = document.getElementById('raichu');
    let inputVenustoizard = document.getElementById('venustoizard');
    let inputZapmolcuno = document.getElementById('zapmolcuno');
    let inputZekyushiram = document.getElementById('zekyushiram');

    let spanMascotaJugador = document.getElementById('mascota-jugador');

    if (inputKyodonquaza.checked) {
        spanMascotaJugador.innerHTML = `<img src="img/kyodonquaza.png" alt="kyodonquaza" class="imagen-mascota">kyodonquaza`;

    }else if(inputPaldiatina.checked){
        spanMascotaJugador.innerHTML = `<img src="img/paldiatina.png" alt="paldiatina" class="imagen-mascota">paldiatina`;

    }else if (inputRraichu.checked) {
        spanMascotaJugador.innerHTML = `<img src="img/raichu.png" alt="raichu" class="imagen-mascota">raichu`;

    }else if(inputVenustoizard.checked){
        spanMascotaJugador.innerHTML = `<img src="img/venustoizard.png" alt="venustoizard" class="imagen-mascota">venustoizard`;

    }else if(inputZapmolcuno.checked){
        spanMascotaJugador.innerHTML = `<img src="img/zapmolcuno.png" alt="zapmolcuno" class="imagen-mascota">zapmolcuno`;
  
    }else if(inputZekyushiram.checked){
        spanMascotaJugador.innerHTML = `<img src="img/zekyushiram.png" alt="zekyushiram" class="imagen-mascota">zekyushiram`;
       
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

// Funcion donde mandamos un mensaje al finalizar el juego de si ganamos o perdimos.
function revisarVidas() {
    
    if(vidasEnemigo == 0){
        crearMensajeFinal('Felicitaciones Ganaste!');

    }else if (vidasJugador == 0) {
        crearMensajeFinal('Lo siento, perdiste :c');

    }
}

//En esta funcion creamos un mensaje para mostrar que ataque escogimos y el ataque aleatorio del enemigo.
function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('resultado');
    let ataquesDelJugador = document.getElementById('ataques-del-jugador');
    let ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

        
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML= ataqueEnemigo;

   
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

// Funcion donde al momento de que uno de los dos enemigo o tu tenga vida en 0 los botones de ataque se bloqueen
// y creacion de mensaje al momento de finalizar y mostramos el boton de reiniciar
function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('resultado');

    sectionMensajes.innerHTML = resultadoFinal;

    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.disabled = true;
    let botonTierrra = document.getElementById('boton-tierra');
    botonTierrra.disabled = true;

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}

//Creamos una funcion para poder llamar la mascota enemiga pero de forma aleatoria y poder mostrarla en el HTML.
function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1,6);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = `<img src="img/kyodonquaza.png" alt="kyodonquaza" class="imagen-mascota">kyodonquaza`;

    }else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = `<img src="img/paldiatina.png" alt="paldiatina" class="imagen-mascota">paldiatina`;

    }else if(mascotaAleatorio == 3){
        spanMascotaEnemigo.innerHTML = `<img src="img/raichu.png" alt="raichu" class="imagen-mascota">raichu`;

    }else if (mascotaAleatorio == 4) {
        spanMascotaEnemigo.innerHTML = `<img src="img/venustoizard.png" alt="venustoizard" class="imagen-mascota">venustoizard`;

    }else if (mascotaAleatorio == 5) {
        spanMascotaEnemigo.innerHTML = `<img src="img/zapmolcuno.png" alt="zapmolcuno" class="imagen-mascota">zapmolcuno`;

    }else if (mascotaAleatorio == 6) {
        spanMascotaEnemigo.innerHTML = `<img src="img/zekyushiram.png" alt="zekyushiram" class="imagen-mascota">zekyushiram`;
    }
}

// Creacion de boton reiniciar el juego.
function reiniciarJuego() {
    location.reload();
}


// Ejecuta iniciarJuego() cuando la página termine de cargar por completo.
window.addEventListener('load', iniciarJuego);