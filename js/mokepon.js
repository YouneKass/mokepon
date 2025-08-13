// creaciones de variables globales.
const sectionSeleccionarAtaque = document.getElementById('seleccionar-Ataque');

const sectionReiniciar = document.getElementById('reiniciar');

const botonMascotaJugador = document.getElementById('boton-mascota');

const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');



const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const vidasJugador = document.getElementById('vidas-jugador');
const vidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

const reglas = {
    FUEGO:     ["TIERRA", "VIENTO", "ELECTRICO", "ESTELAR"],
    AGUA:      ["FUEGO", "ESTELAR", "ELECTRICO"],
    TIERRA:    ["AGUA", "METAL", "ELECTRICO"],
    VIENTO:    ["TIERRA", "ESTELAR", "HIELO", "FANTASMA"],
    METAL:     ["AGUA", "FUEGO", "ELECTRICO", "VIENTO"],
    ELECTRICO: ["VIENTO", "ESTELAR"],
    ESTELAR:   ["AGUA", "TIERRA", "FANTASMA", "METAL"],
    HIELO:     ["AGUA", "TIERRA", "ESTELAR"],
    FANTASMA:  ["FUEGO", "AGUA", "TIERRA", "ELECTRICO", "HIELO", "METAL"]
};

let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionesDeMokepones;
let inputKyodonquaza;
let inputPaldiatina;
let inputRraichu;
let inputVenustoizard;
let inputZapmolcuno;
let inputZekyushiram;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botonFantasma;
let botonMetal;
let botonEstelar;
let botonHielo;
let botonViento;
let botonElectrico;
let botones = [];
let vidasJugadorActual = 0;
let vidasEnemigoActual = 0;
let indexAtaqueJugador;
let indexAtaqueEnemigo;

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
let raichu = new Mokepon('Raichu', 'img/raichu.png', 3); 
let venustoizard = new Mokepon('Venustoizard', 'img/venustoizard.png', 4); 
let zapmolcuno = new Mokepon('Zapmolcuno', 'img/zapmolcuno.png', 3); 
let zekyushiram = new Mokepon('Zekyushiram', 'img/zekyushiram.png', 5); 

kyodonquaza.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌪️', id: 'boton-viento' },
    { nombre: '🌱', id: 'boton-tierra' }
);

paldiatina.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🩻', id: 'boton-fantasma' },
    { nombre: '🪨', id: 'boton-metal' },
    { nombre: '⭐', id: 'boton-estelar' }
);

raichu.ataques.push(
    { nombre: '🪨', id: 'boton-metal' },
    { nombre: '⚡', id: 'boton-electrico' },
    { nombre: '⭐', id: 'boton-estelar' }
);

venustoizard.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' }
);

zapmolcuno.ataques.push(
    { nombre: '❄️', id: 'boton-hielo' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-electrico' },
    { nombre: '🌪️', id: 'boton-viento' }
);

zekyushiram.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⚡', id: 'boton-electrico' },
    { nombre: '❄️', id: 'boton-hielo' },
    { nombre: '⭐', id: 'boton-estelar' }
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
        mascotaJugador = nombreMascota;
        const mascota = mokepones.find(mokepon => mokepon.nombre === nombreMascota);

        spanMascotaJugador.innerHTML = `<img src="${mascota.foto}" alt="${mascota.nombre}" class="imagen-mascota">${mascota.nombre}`;  

        vidasJugadorActual = mascota.vida;
        vidasJugador.textContent = vidasJugadorActual;
    }else {
        alert("Selecciona una mascota primero.");
        sectionSeleccionarMascota.style.display = 'flex';
        sectionSeleccionarAtaque.style.display = 'none';
        return;
    }  
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador){
    let ataques; 
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }     
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque)=>{
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon;
    })
    
    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonTierra = document.getElementById('boton-tierra');
    botonFantasma = document.getElementById('boton-fantasma');
    botonMetal = document.getElementById('boton-metal');
    botonEstelar = document.getElementById('boton-estelar');
    botonHielo = document.getElementById('boton-hielo');
    botonViento = document.getElementById('boton-viento');
    botonElectrico = document.getElementById('boton-electrico');
    botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            let ataqueSeleccionado;
            if (e.target.textContent === '🔥') {
                ataqueSeleccionado = 'FUEGO';
            } else if (e.target.textContent === '💧') {
                ataqueSeleccionado = 'AGUA';
            } else if (e.target.textContent === '🌱') {
                ataqueSeleccionado = 'TIERRA';
            } else if (e.target.textContent === '🩻') {
                ataqueSeleccionado = 'FANTASMA';
            } else if (e.target.textContent === '🪨') {
                ataqueSeleccionado = 'METAL';
            } else if (e.target.textContent === '⭐') {
                ataqueSeleccionado = 'ESTELAR';
            } else if (e.target.textContent === '⚡') {
                ataqueSeleccionado = 'ELECTRICO';
            } else if (e.target.textContent === '❄️') {
                ataqueSeleccionado = 'HIELO';
            } else {
                ataqueSeleccionado = 'VIENTO';
            }

            ataqueJugador.push(ataqueSeleccionado);
            console.log(ataqueJugador);

            indexAtaqueJugador = ataqueSeleccionado;
            ataqueAleatorioEnemigo();
        })
    })
}

//Creamos una funcion para poder llamar la mascota enemigo, pero de forma aleatoria y poder mostrarla en el HTML.
function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0, mokepones.length - 1);
    const mascota = mokepones[mascotaAleatorio];

    // Mostrar nombre e imagen
    spanMascotaEnemigo.innerHTML = `<img src="${mascota.foto}" alt="${mascota.nombre}" class="imagen-mascota">${mascota.nombre}`;

    // Guardar vidas y ataques
    vidasEnemigoActual = mascota.vida;
    vidasEnemigo.textContent = vidasEnemigoActual;

    ataquesMokeponEnemigo = mascota.ataques;// lista de ataques de su mascota
    secuenciaAtaque();
}

//Creamos una funcion para hacer el ataque enemigo aleatorio, ademas llamamos la funcion aleatorio.
// llamos la funcion de combate para poder mostrar si ganamos o perdimos en el HTML.
function ataqueAleatorioEnemigo(){
    // Elegir un ataque aleatorio del arreglo de ataques de la mascota enemiga
    let ataqueSeleccionado = ataquesMokeponEnemigo[aleatorio(0, ataquesMokeponEnemigo.length - 1)];

    let tipoAtaque;
    switch (ataqueSeleccionado.nombre) {
        case '🔥': tipoAtaque = 'FUEGO'; break;
        case '💧': tipoAtaque = 'AGUA'; break;
        case '🌱': tipoAtaque = 'TIERRA'; break;
        case '🌪️': tipoAtaque = 'VIENTO'; break;
        case '🪨': tipoAtaque = 'METAL'; break;
        case '⚡': tipoAtaque = 'ELECTRICO'; break;
        case '⭐': tipoAtaque = 'ESTELAR'; break;
        case '❄️': tipoAtaque = 'HIELO'; break;
        case '🩻': tipoAtaque = 'FANTASMA'; break;
    }
    ataqueEnemigo.push(tipoAtaque);
    console.log(ataqueEnemigo);

    // También actualizamos el índice para mostrar el ataque en pantalla
    indexAtaqueEnemigo = tipoAtaque;

    iniciarPelea();
}

function iniciarPelea() {
    if (vidasJugadorActual > 0 && vidasEnemigoActual > 0) {
        if (ataqueJugador.length === ataqueEnemigo.length) {
            combate();
        }
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

//creamos una desicion para poder saber si ganamos, perdimos o empatamos con el enemigo.
function combate() {
    const jugador = ataqueJugador[ataqueJugador.length - 1]; // último ataque
    const enemigo = ataqueEnemigo[ataqueEnemigo.length - 1]; // último ataque

        if (jugador === enemigo) {
            crearMensaje("EMPATE");
        }else if (reglas[jugador] && reglas[jugador].includes(enemigo)) {
            crearMensaje("GANASTE");
            vidasEnemigoActual--;
            vidasEnemigo.textContent = vidasEnemigoActual;
        }else {
            crearMensaje("PERDISTE");
            vidasJugadorActual--;
            vidasJugador.textContent = vidasJugadorActual;
        }
    // Revisar las vidas
    revisarVidas();
}

// Funcion donde mandamos un mensaje al finalizar el juego de si ganamos o perdimos.
function revisarVidas() {
    if(vidasEnemigoActual == 0){
        crearMensajeFinal('¡Felicitaciones Ganaste!');
    } else if (vidasJugadorActual == 0) {
        crearMensajeFinal('Lo siento, perdiste :c');
    }
}

//En esta funcion creamos un mensaje para mostrar que ataque escogimos y el ataque aleatorio del enemigo.
function crearMensaje(resultado) {
    sectionMensajes.innerHTML = resultado;

    let nuevoAtaqueDelJugador = document.createElement('p');
    nuevoAtaqueDelJugador.textContent = indexAtaqueJugador;  // Ataque actual
    ataquesDelJugador.innerHTML = '';  // Limpiar contenido previo
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);   // Agregar solo el ataque actual

    let nuevoAtaqueDelEnemigo = document.createElement('p');
    nuevoAtaqueDelEnemigo.textContent = indexAtaqueEnemigo;
    ataquesDelEnemigo.innerHTML = '';  // Limpiar contenido previo
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

// Funcion donde al momento de que uno de los dos enemigo o tu tenga vida en 0 los botones de ataque se bloqueen
// y creacion de mensaje al momento de finalizar y mostramos el boton de reiniciar
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    sectionReiniciar.style.display = 'block';
}

// Creacion de boton reiniciar el juego.
function reiniciarJuego() {
    location.reload();
}

// funcion donde se crea una variable aleatoria.
function aleatorio(min , max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Ejecuta iniciarJuego() cuando la página termine de cargar por completo.
window.addEventListener('load', iniciarJuego);