// creaciones de variables globales.
const sectionSeleccionarAtaque = document.getElementById('seleccionar-Ataque');

const sectionReiniciar = document.getElementById('reiniciar');

const botonMascotaJugador = document.getElementById('boton-mascota');

const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierrra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');



const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidaJugador = document.getElementById('vidas-jugador');
const spanVidaEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas =document.getElementById('contenedorTarjetas');

let mokepones = [];
let ataqueJugador;
let ataqueEnemigo;
let opcionesDeMokepones;
let inputKyodonquaza;
let inputPaldiatina;
let inputRraichu;
let inputVenustoizard;
let inputZapmolcuno;
let inputZekyushiram;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
    }
}

let kyodonquaza = new Mokepon('Kyodonquaza', 'img/kyodonquaza.png', 5);
let paldiatina = new Mokepon('Paldiatina', 'img/paldiatina.png', 5);
let raichu = new Mokepon('Raichu', 'img/raichu.png', 2); 
let venustoizard = new Mokepon('Venustoizard', 'img/venustoizard.png', 4); 
let zapmolcuno = new Mokepon('Zapmolcuno', 'img/zapmolcuno.png', 3); 
let zekyushiram = new Mokepon('Zekyushiram', 'img/zekyushiram.png', 5); 

kyodonquaza.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌪️', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }
);

paldiatina.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🩻', id: 'boton-fuego' },
    { nombre: '🪨', id: 'boton-tierra' },
    { nombre: '⭐', id: 'boton-tierra' },
);

raichu.ataques.push(
    { nombre: '🪨', id: 'boton-agua' },
    { nombre: '⚡', id: 'boton-fuego' }
);

venustoizard.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
);

zapmolcuno.ataques.push(
    { nombre: '❄️', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-tierra' },
    { nombre: '🌪️', id: 'boton-agua' },
);

zekyushiram.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-fuego' },
    { nombre: '❄️', id: 'boton-tierra' },
    { nombre: '⭐', id: 'boton-tierra' },
);

mokepones.push(kyodonquaza, paldiatina, raichu, venustoizard, zapmolcuno, zekyushiram);

// funcion donde se crea interaciones con los botones de seleccion de mascota y ataques.
function iniciarJuego() {   
    sectionSeleccionarAtaque.style.display = 'none';

    mokepones.forEach((mokepon) =>{
        opcionesDeMokepones = `
            <input type="radio" name="mascota" id="${mokepon.nombre}"/>
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>"${mokepon.nombre}"</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            </label>
        `
        contenedorTarjetas.innerHTML += opcionesDeMokepones;

        inputKyodonquaza = document.getElementById('Kyodonquaza');
        inputPaldiatina = document.getElementById('Paldiatina');
        inputRraichu = document.getElementById('Raichu');
        inputVenustoizard = document.getElementById('Venustoizard');
        inputZapmolcuno = document.getElementById('Zapmolcuno');
        inputZekyushiram = document.getElementById('Zekyushiram');
    })

    sectionReiniciar.style.display = 'none';
  
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    botonFuego.addEventListener('click', ataqueFuego);

    botonAgua.addEventListener('click', ataqueAgua);
    
    botonTierrra.addEventListener('click', ataqueTierra);
     
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

// funcion donde se escoge la mascota con la cual atacaras para luego mostrarlo en el etiqueta "span", ademas de una alerta donde te muestra que mascota escogiste y por ultimo
// llamamos la funcion de llamar la mascota enemigo.
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
 
    sectionSeleccionarAtaque.style.display = 'flex';

    const inputSeleccionado = document.querySelector('input[name="mascota"]:checked');
    if (inputSeleccionado) {
        const nombreMascota = inputSeleccionado.id;
        const mascota = mokepones.find(mokepon => mokepon.nombre === nombreMascota);
        spanMascotaJugador.innerHTML = `<img src="${mascota.foto}" alt="${mascota.nombre}" class="imagen-mascota">${mascota.nombre}`;  
    }else {
        alert("Selecciona una mascota primero.");
        sectionSeleccionarMascota.style.display = 'flex';
        sectionSeleccionarAtaque.style.display = 'none';
        return;
    }
    seleccionarMascotaEnemigo();
}

//Creamos una funcion para poder llamar la mascota enemiga pero de forma aleatoria y poder mostrarla en el HTML.
function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1);
    const mascota = mokepones[mascotaAleatorio];

    spanMascotaEnemigo.innerHTML = `<img src="${mascota.foto}" alt="${mascota.nombre}" class="imagen-mascota">${mascota.nombre}`;  
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

// funcion donde se crea una variable aleatoria.
function aleatorio(min , max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
    sectionMensajes.innerHTML = resultadoFinal;

    botonFuego.disabled = true;
    
    botonAgua.disabled = true;
    
    botonTierrra.disabled = true;

    
    sectionReiniciar.style.display = 'block';
}

// Creacion de boton reiniciar el juego.
function reiniciarJuego() {
    location.reload();
}


// Ejecuta iniciarJuego() cuando la página termine de cargar por completo.
window.addEventListener('load', iniciarJuego);