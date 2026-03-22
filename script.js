// --- CONFIGURACIÓN INICIAL ---
const fechaInicio = new Date(2026, 2, 11); 
const mensajesRosas = [
    "Eres el verso más lindo de mi poema favorito. ✨", 
    "Tu sonrisa ilumina mi mundo más que el sol. ❤️", 
    "Tu amor es mi calma en la tormenta. 🌊", 
    "Eres mi sol, mi luna y mis estrellas. 🌙", 
    "Amo la paz que siento a tu lado. 🏠", 
    "Gracias por cada risa compartida. 💍", 
    "Mi corazón late de alegría por ti. 🌹", 
    "Te quiero hoy y para siempre. 💖"
];
const frasesAbrazo = ["¡Lluvia de amor! 💖", "¡Muchos besos! 💋", "¡No te suelto! 🫂", "¡Te extraño! ✨", "¡Eres mi todo! 🌸"];
const frasesC = ["Eres mi hogar", "Mi eterno amor", "Mi milagro", "Por siempre tú", "Eres mi sueño"];

// --- RELOJ ---
function actualizarReloj() {
    const ahora = new Date(); 
    const diffMilisegundos = ahora - fechaInicio;
    const diasTotales = Math.floor(diffMilisegundos / (1000 * 60 * 60 * 24));
    const horasActuales = ahora.getHours();
    
    document.getElementById('d').innerText = diasTotales.toString().padStart(2, '0');
    document.getElementById('h').innerText = horasActuales.toString().padStart(2, '0');
    document.getElementById('m').innerText = ahora.getMinutes().toString().padStart(2, '0');
    document.getElementById('s').innerText = ahora.getSeconds().toString().padStart(2, '0');
    
    if (horasActuales >= 18 || horasActuales < 6) {
        document.body.classList.add('modo-noche');
        document.body.classList.remove('modo-dia');
    } else {
        document.body.classList.add('modo-dia');
        document.body.classList.remove('modo-noche');
    }
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

// --- GENERACIÓN DE ROSAS ---
const main = document.getElementById('main-container');
function crearRosas() {
    const numRosas = 8;
    const posiciones = [];
    for (let i = 0; i < numRosas; i++) {
        let x, y, traslape, intentos = 0;
        do {
            traslape = false; x = Math.random() * 70 + 15; y = Math.random() * 55 + 15;
            if (x > 35 && x < 65 && y > 35 && y < 65) traslape = true;
            for (let p of posiciones) {
                if (Math.sqrt(Math.pow(x-p.x,2) + Math.pow(y-p.y,2)) < 18) traslape = true;
            }
            intentos++;
        } while (traslape && intentos < 100);
        posiciones.push({x, y});
        const rosa = document.createElement('div');
        rosa.className = 'rosa-mensaje floating';
        rosa.style.left = x + '%'; rosa.style.top = y + '%';
        rosa.innerHTML = `<svg width="55" height="55" viewBox="0 0 100 100" onclick="abrirCarta(${i})"><g fill="#ff1744"><circle cx="50" cy="35" r="22" /><circle cx="72" cy="50" r="22" /><circle cx="50" cy="65" r="22" /><circle cx="28" cy="50" r="22" /><circle cx="50" cy="50" r="12" fill="#b71c1c" /></g><path d="M50 75 L50 95" stroke="#2e7d32" stroke-width="6" /></svg>`;
        main.appendChild(rosa);
    }
}

// --- LÓGICA CARTA/REGALO ---
function abrirCarta(i) {
    const carta = document.getElementById("carta");
    const overlay = document.getElementById("overlay");
    const rand = Math.random();
    const startX = rand < 0.5 ? "-150vw" : "150vw";
    const startY = (Math.random() * 100 - 50) + "vh";
    
    carta.style.setProperty('--start-x', startX);
    carta.style.setProperty('--start-y', startY);
    
    document.getElementById("mensaje-texto").innerText = mensajesRosas[i];
    carta.classList.remove("abierta"); 
    carta.classList.add("vuelo");
    overlay.classList.add("active");
}

function abrirLazo() {
    document.getElementById("carta").classList.add("abierta");
    if(navigator.vibrate) navigator.vibrate([30, 50]);
}

function cerrarCarta() {
    const carta = document.getElementById("carta");
    carta.classList.remove("vuelo", "abierta");
    document.getElementById("overlay").classList.remove("active");
}

// --- ABRAZOS Y CORAZONES ---
let lluviaActiva = false;
let intervaloCorazones;
function toggleAbrazo() {
    const btn = document.getElementById('btn-abrazo');
    const msg = document.getElementById('msg-abrazo');
    lluviaActiva = !lluviaActiva;
    if (lluviaActiva) {
        btn.classList.add('activo');
        msg.classList.add('visible');
        msg.innerText = frasesAbrazo[Math.floor(Math.random() * frasesAbrazo.length)];
        intervaloCorazones = setInterval(crearCorazonVuelo, 200);
        if(navigator.vibrate) navigator.vibrate([50, 30, 50]);
    } else {
        btn.classList.remove('activo');
        msg.classList.remove('visible');
        clearInterval(intervaloCorazones);
    }
}

function crearCorazonVuelo() {
    const c = document.createElement('div');
    c.className = 'corazon-vuelo';
    const tipos = ['❤️','💖','💗','💘','🌸','💌'];
    c.innerHTML = tipos[Math.floor(Math.random() * tipos.length)];
    c.style.right = (Math.random() * 40 + 30) + 'px';
    c.style.bottom = '40px';
    c.style.setProperty('--rnd', Math.random());
    c.style.setProperty('--rot', (Math.random() * 360) + 'deg');
    c.style.fontSize = (Math.random() * 15 + 20) + 'px';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2000);
}

// --- MOVIMIENTO GIRASOL Y ESTRELLAS ---
const cabeza = document.getElementById('cabeza-girasol'), pi = document.getElementById('p-izq'), pd = document.getElementById('p-der'), cMsg = document.getElementById('constelacion-msg');
let idxC = 0, timerI;

function mover(x, y) {
    if (!main.classList.contains('active')) return;
    cMsg.style.opacity = "0"; clearTimeout(timerI);
    const est = document.createElement('div');
    est.className = 'estrella'; est.innerHTML = '✦';
    est.style.left = x + 'px'; est.style.top = y + 'px';
    if (document.body.classList.contains('modo-noche')) { est.style.textShadow = "0 0 15px #fff"; }
    document.body.appendChild(est);
    setTimeout(() => est.remove(), 800);
    const r = cabeza.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, a = Math.atan2(y - cy, x - cx);
    cabeza.style.transform = `rotate(${a * 180 / Math.PI + 90}deg)`;
    const ox = Math.cos(a) * 3, oy = Math.sin(a) * 3;
    pi.setAttribute('cx', 85 + ox); pd.setAttribute('cx', 115 + ox);
    pi.setAttribute('cy', 90 + oy); pd.setAttribute('cy', 90 + oy);
    timerI = setTimeout(() => { cMsg.innerText = frasesC[idxC]; cMsg.style.opacity = "1"; idxC = (idxC + 1) % frasesC.length; }, 3000);
}

window.addEventListener('mousemove', e => mover(e.clientX, e.clientY));
window.addEventListener('touchmove', e => mover(e.touches[0].clientX, e.touches[0].clientY));

// --- PÉTALOS CAYENDO ---
setInterval(() => {
    if (!main.classList.contains('active')) return;
    const p = document.createElement('div');
    p.className = 'petalo';
    p.style.width = p.style.height = (Math.random() * 10 + 12) + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = '#ff1744';
    const dur = Math.random() * 3 + 2.5;
    p.style.animationDuration = dur + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000);
}, 300);

// --- SECUENCIA DE INTRODUCCIÓN ---
const intro = document.getElementById('intro-portal');
setTimeout(() => intro.classList.add('open'), 1000);
setTimeout(() => intro.classList.add('glow'), 2500);
setTimeout(() => { 
    intro.classList.add('inactive'); 
    main.classList.add('active'); 
    crearRosas(); 
}, 4200);