// creaciones de variables globales.
const sectionSeleccionarAtaque = document.getElementById('seleccionar-Ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const botonVolver = document.getElementById('boton-volver');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const vidasJugador = document.getElementById('vidas-jugador');
const vidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');
const reglas = {
    FUEGO: ["TIERRA", "VIENTO", "ELECTRICO", "ESTELAR", "HIELO"],
    AGUA: ["FUEGO", "ESTELAR", "ELECTRICO"],
    TIERRA: ["AGUA", "METAL", "ELECTRICO"],
    VIENTO: ["TIERRA", "ESTELAR", "HIELO", "FANTASMA"],
    METAL: ["AGUA", "FUEGO", "ELECTRICO", "VIENTO"],
    ELECTRICO: ["VIENTO", "ESTELAR", "HIELO"],
    ESTELAR: ["TIERRA", "FANTASMA", "METAL"],
    HIELO: ["AGUA", "TIERRA", "ESTELAR"],
    FANTASMA: ["FUEGO", "AGUA", "TIERRA", "ELECTRICO", "HIELO", "METAL"]
};
const SERVER_URL = "http://192.168.1.41:8080";
let jugadorId = null;
let enemigoId = null;
let ataquesProcesadosJugador = 0;
let ataquesProcesadosEnemigo = 0; 
let pollingAtaquesInterval = null;
let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let turnoActual = 0;
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
let mascotaJugadorObjeto;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './img/background-battle.gif';
let alturaMapa;
let anchoMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 800;
if (anchoMapa > anchoMaximoDelMapa) {
    anchoMapa = anchoMaximoDelMapa - 20;
}
alturaMapa = anchoMapa * 500 / 800;
mapa.width = anchoMapa;
mapa.height = alturaMapa;
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 80;
        this.alto = 80;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
}
let kyodonquaza = new Mokepon('Kyodonquaza', 'img/kyodonquaza.png', 5, 'img/kyodonquazaCara.png');
let paldiatina = new Mokepon('Paldiatina', 'img/paldiatina.png', 5, 'img/paldiatinaCara.png');
let raichu = new Mokepon('Raichu', 'img/raichu.png', 3, 'img/raichuCara.png');
let venustoizard = new Mokepon('Venustoizard', 'img/venustoizard.png', 4, 'img/venustoizardCara.png');
let zapmolcuno = new Mokepon('Zapmolcuno', 'img/zapmolcuno.png', 3, 'img/zapmolcunoCara.png');
let zekyushiram = new Mokepon('Zekyushiram', 'img/zekyushiram.png', 5, 'img/zekyushiramCara.png');
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
    sectionVerMapa.style.display = 'none';
    mokepones.forEach((mokepon) => {
        opcionesDeMokepones = `
            <input type="radio" name="mascota" id="${mokepon.nombre}"/>
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>"${mokepon.nombre}"</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
            </label>
        `;
        contenedorTarjetas.innerHTML += opcionesDeMokepones;
    });
    inputKyodonquaza = document.getElementById('Kyodonquaza');
    inputPaldiatina = document.getElementById('Paldiatina');
    inputRraichu = document.getElementById('Raichu');
    inputVenustoizard = document.getElementById('Venustoizard');
    inputZapmolcuno = document.getElementById('Zapmolcuno');
    inputZekyushiram = document.getElementById('Zekyushiram');
    sectionReiniciar.style.display = 'none';
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonReiniciar.addEventListener('click', reiniciarJuego);
    botonVolver.addEventListener('click', volverASeleccionarMascota);
    unirseAlJuego();
}
function unirseAlJuego() {
    fetch(`${SERVER_URL}/unirse`)
        .then(res => res.text())
        .then(id => {
            jugadorId = id;
        });
}
function actualizarEnemigos() {
    fetch(`${SERVER_URL}/enemigos/${jugadorId}`)
        .then(res => res.json())
        .then(({
            enemigos: dataEnemigos
        }) => {
            enemigos = dataEnemigos.map(e => {
                return {
                    id: e.id,
                    mokepon: e.mokepon,
                    x: e.x,
                    y: e.y,
                    ataques: e.ataques || []
                };
            });
        });
}

// funcion donde se escoge la mascota con la cual atacaras para luego mostrarlo en el etiqueta "span", ademas de una alerta donde te muestra que mascota escogiste y por ultimo
// llamamos la funcion de llamar la mascota enemigo.
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    const inputSeleccionado = document.querySelector('input[name="mascota"]:checked');
    if (inputSeleccionado) {
        const nombreMascota = inputSeleccionado.id;
        mascotaJugador = nombreMascota;
        const mascota = mokepones.find(mokepon => mokepon.nombre === nombreMascota);
        spanMascotaJugador.innerHTML = `<img src="${mascota.foto}" alt="${mascota.nombre}" class="imagen-mascota">${mascota.nombre}`;
        vidasJugadorActual = mascota.vida;
        vidasJugador.textContent = vidasJugadorActual;
    } else {
        alert("Selecciona una mascota primero.");
        sectionSeleccionarMascota.style.display = 'flex';
        sectionSeleccionarAtaque.style.display = 'none';
        return;
    }
    seleccionarMokepon(mascotaJugador);
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = 'flex';
    iniciarMapa();
}
function seleccionarMokepon(mascotaJugador) {
    fetch(`${SERVER_URL}/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    });
}
function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });
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
    secuenciaAtaque();
}

function obtenerTipoDeAtaque(text) {
    switch (text) {
        case '🔥': return 'FUEGO';
        case '💧': return 'AGUA';
        case '🌱': return 'TIERRA';
        case '🌪️': return 'VIENTO';
        case '🩻': return 'FANTASMA';
        case '🪨': return 'METAL';
        case '⭐': return 'ESTELAR';
        case '⚡': return 'ELECTRICO';
        case '❄️': return 'HIELO';
        default: return null; 
    }
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const text = e.target.textContent;
            const ataqueSeleccionado = obtenerTipoDeAtaque(text);

            if (!ataqueSeleccionado) {
                console.warn('Ataque no reconocido:', text);
                return;
            }

            ataqueJugador.push(ataqueSeleccionado);
            indexAtaqueJugador = ataqueSeleccionado;

            enviarAtaqueIndividual(ataqueSeleccionado);

            if (!pollingAtaquesInterval) {
                pollingAtaquesInterval = setInterval(obtenerAtaques, 100);
            }

            crearMensaje('ESPERANDO RESPUESTA ENEMIGO'); 
            intentarResolverTurno();
        });
    });
}

function intentarResolverTurno() {

    if (ataqueJugador[turnoActual] && ataqueEnemigo[turnoActual]) {
        indexAtaqueJugador = ataqueJugador[turnoActual];
        indexAtaqueEnemigo = ataqueEnemigo[turnoActual];

        combate(indexAtaqueJugador, indexAtaqueEnemigo);

        turnoActual++; 
    }
}

function enviarAtaques() {
    fetch(`${SERVER_URL}/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    });
    intervalo = setInterval(obtenerAtaques, 50);
}

function enviarAtaqueIndividual(ataque) {
    fetch(`${SERVER_URL}/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        // mandamos un objeto { ataque: 'FUEGO' }
        body: JSON.stringify({
            ataque: ataque
        })
    });
}

function obtenerAtaques() {
    fetch(`${SERVER_URL}/mokepon/${enemigoId}/ataques`)
        .then(res => res.ok && res.json())
        .then(({ ataques } = {}) => {
            if (!ataques) return;

            // si hay ataques nuevos del enemigo
            while (ataqueEnemigo.length < ataques.length) {
                ataqueEnemigo.push(ataques[ataqueEnemigo.length]); 
            }

            // intentar resolver turno
            intentarResolverTurno();
        });
}

//Creamos una funcion para poder llamar la mascota enemigo, pero de forma aleatoria y poder mostrarla en el HTML.
function seleccionarMascotaEnemigo(enemigo) {
    const mascota = enemigo;
    // Mostrar nombre e imagen
    spanMascotaEnemigo.innerHTML = `<img src="${mascota.foto}" alt="${mascota.nombre}" class="imagen-mascota">${mascota.nombre}`;
    // Guardar vidas y ataques
    vidasEnemigoActual = mascota.vida;
    vidasEnemigo.textContent = vidasEnemigoActual;
    if (!mascota.ataques || mascota.ataques.length === 0) {
        const referencia = mokepones.find(m => m.nombre === mascota.nombre);
        mascota.ataques = referencia.ataques.slice();
    }
    ataquesMokeponEnemigo = mascota.ataques.slice();
}

//Creamos una funcion para hacer el ataque enemigo aleatorio, ademas llamamos la funcion aleatorio.
// llamos la funcion de combate para poder mostrar si ganamos o perdimos en el HTML.
// function ataqueAleatorioEnemigo() {
//     // Validar primero que el enemigo tenga ataques
//     if (!ataquesMokeponEnemigo || ataquesMokeponEnemigo.length === 0) {
//         console.error("El enemigo no tiene ataques asignados");
//         return;
//     }
//     // Elegir un ataque aleatorio del arreglo de ataques de la mascota enemiga
//     let ataqueSeleccionado = ataquesMokeponEnemigo[aleatorio(0, ataquesMokeponEnemigo.length - 1)];
//     if (!ataqueSeleccionado) {
//         console.error("No se pudo seleccionar un ataque del enemigo");
//         return;
//     }
//     let tipoAtaque;
//     switch (ataqueSeleccionado.nombre) {
//         case '🔥':
//             tipoAtaque = 'FUEGO';
//             break;
//         case '💧':
//             tipoAtaque = 'AGUA';
//             break;
//         case '🌱':
//             tipoAtaque = 'TIERRA';
//             break;
//         case '🌪️':
//             tipoAtaque = 'VIENTO';
//             break;
//         case '🪨':
//             tipoAtaque = 'METAL';
//             break;
//         case '⚡':
//             tipoAtaque = 'ELECTRICO';
//             break;
//         case '⭐':
//             tipoAtaque = 'ESTELAR';
//             break;
//         case '❄️':
//             tipoAtaque = 'HIELO';
//             break;
//         case '🩻':
//             tipoAtaque = 'FANTASMA';
//             break;
//     }
//     ataqueEnemigo.push(tipoAtaque);
//     console.log(ataqueEnemigo);
//     // También actualizamos el índice para mostrar el ataque en pantalla
//     indexAtaqueEnemigo = tipoAtaque;
//     // iniciarPelea();
// }

// function iniciarPelea() {
//     if (vidasJugadorActual > 0 && vidasEnemigoActual > 0) {
//         if (ataqueJugador.length === ataqueEnemigo.length) {
//             combate();
//         }
//     }
// }

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}
//creamos una desicion para poder saber si ganamos, perdimos o empatamos con el enemigo.
function combate(ataqueJugadorActual, ataqueEnemigoActual) {
    const jugador = ataqueJugadorActual;
    const enemigo = ataqueEnemigoActual;

    if (!jugador || !enemigo) {
        return;
    }

    if (jugador === enemigo) {
        crearMensaje("EMPATE");
    } else if (reglas[jugador] && reglas[jugador].includes(enemigo)) {
        crearMensaje("GANASTE");
        vidasEnemigoActual--;                        
        document.getElementById("vidas-enemigo").textContent = vidasEnemigoActual;  
    } else {
        crearMensaje("PERDISTE");
        vidasJugadorActual--;                        
        document.getElementById("vidas-jugador").textContent = vidasJugadorActual;  
    }

    revisarVidas();
}

// Funcion donde mandamos un mensaje al finalizar el juego de si ganamos o perdimos.
function revisarVidas() {
    if (vidasEnemigoActual <= 0) {
        crearMensajeFinal('¡Felicitaciones Ganaste!');
    } else if (vidasJugadorActual <= 0) {
        crearMensajeFinal('Lo siento, perdiste :c');
    }
}
//En esta funcion creamos un mensaje para mostrar que ataque escogimos y el ataque aleatorio del enemigo.
function crearMensaje(resultado) {
    sectionMensajes.innerHTML = resultado;
    let nuevoAtaqueDelJugador = document.createElement('p');
    nuevoAtaqueDelJugador.textContent = indexAtaqueJugador || '—';
    ataquesDelJugador.innerHTML = ''; 
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador); 

    let nuevoAtaqueDelEnemigo = document.createElement('p');
    nuevoAtaqueDelEnemigo.textContent = indexAtaqueEnemigo || '—';
    ataquesDelEnemigo.innerHTML = ''; 
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
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function volverASeleccionarMascota() {
    // Oculta la sección de ataques
    sectionSeleccionarAtaque.style.display = 'none';
    contenedorAtaques.innerHTML = '';
    ataquesDelJugador.innerHTML = '';
    ataquesDelEnemigo.innerHTML = '';
    sectionMensajes.innerHTML = 'Mucha Suerte!!';
    // Muestra la sección de selección de mascota
    sectionSeleccionarMascota.style.display = 'flex';
}
function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    );
    mascotaJugadorObjeto.pintarMokepon();
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
    mokeponesEnemigos.forEach(function(mokepon) {
        mokepon.pintarMokepon();
        revisarColision(mokepon);
    });
}
function enviarPosicion(x, y) {
    fetch(`${SERVER_URL}/mokepon/${jugadorId}/posicion`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function(res) {
            if (res.ok) {
                res.json()
                    .then(function({
                        enemigos
                    }) {
                        console.log(enemigos);
                        mokeponesEnemigos = enemigos.map(function(enemigo) {
                            let mokeponEnemigo = null;
                            const mokeponNombre = enemigo.mokepon.nombre || "";
                            if (mokeponNombre === "Kyodonquaza") {
                                mokeponEnemigo = new Mokepon('Kyodonquaza', 'img/kyodonquaza.png', 5, 'img/kyodonquazaCara.png', enemigo.id);
                                mokeponEnemigo.ataques = kyodonquaza.ataques.slice();
                            } else if (mokeponNombre === "Paldiatina") {
                                mokeponEnemigo = new Mokepon('Paldiatina', 'img/paldiatina.png', 5, 'img/paldiatinaCara.png', enemigo.id);
                                mokeponEnemigo.ataques = paldiatina.ataques.slice();
                            } else if (mokeponNombre === "Raichu") {
                                mokeponEnemigo = new Mokepon('Raichu', 'img/raichu.png', 3, 'img/raichuCara.png', enemigo.id);
                                mokeponEnemigo.ataques = raichu.ataques.slice();
                            } else if (mokeponNombre === "Venustoizard") {
                                mokeponEnemigo = new Mokepon('Venustoizard', 'img/venustoizard.png', 4, 'img/venustoizardCara.png', enemigo.id);
                                mokeponEnemigo.ataques = venustoizard.ataques.slice();
                            } else if (mokeponNombre === "Zapmolcuno") {
                                mokeponEnemigo = new Mokepon('Zapmolcuno', 'img/zapmolcuno.png', 3, 'img/zapmolcunoCara.png', enemigo.id);
                                mokeponEnemigo.ataques = zapmolcuno.ataques.slice();
                            } else if (mokeponNombre === "Zekyushiram") {
                                mokeponEnemigo = new Mokepon('Zekyushiram', 'img/zekyushiram.png', 5, 'img/zekyushiramCara.png', enemigo.id);
                                mokeponEnemigo.ataques = zekyushiram.ataques.slice();
                            }
                            mokeponEnemigo.x = enemigo.x;
                            mokeponEnemigo.y = enemigo.y;
                            return mokeponEnemigo;
                        });
                    });
            }
        });
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}
function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetiMascota(mascotaJugador);
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}
function obtenerObjetiMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;
    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;
    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    console.log('Se detecto una colision');
    enemigoId = enemigo.id;
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(enemigo);
}
// Ejecuta iniciarJuego() cuando la página termine de cargar por completo.
window.addEventListener('load', iniciarJuego);