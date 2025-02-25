/******************************************************************************
 * VARIABLES GLOBALES
 ******************************************************************************/
let jugador = "";
let tiempoInicio;
let tiempoFinal;
let errores = 0;
let casoActual;

/******************************************************************************
 * FASE 1: TRIÁNGULOS DEL CUELLO
 ******************************************************************************/
const casosTriangulos = [
    { nombre: "Triángulo Carotídeo",     imagen: "imagenes/triangulo_carotideo.jpg",    caso: "Paciente con dificultad para tragar y voz ronca tras cirugía de tiroides." },
    { nombre: "Triángulo Submandibular", imagen: "imagenes/triangulo_submandibular.jpg", caso: "Paciente con inflamación y dolor debajo de la mandíbula." },
    { nombre: "Triángulo Submentoniano", imagen: "imagenes/triangulo_submentoniano.jpg", caso: "Infección dental extendida al piso de la boca." },
    { nombre: "Triángulo Muscular",      imagen: "imagenes/triangulo_muscular.jpg",      caso: "Paciente con bocio visible." },
    { nombre: "Triángulo Occipital",     imagen: "imagenes/triangulo_occipital.jpg",     caso: "Lesión del nervio accesorio con dificultad para levantar el hombro." },
    { nombre: "Triángulo Supraclavicular", imagen: "imagenes/triangulo_supraclavicular.jpg", caso: "Ganglio inflamado con sospecha de metástasis." }
];

/******************************************************************************
 * FASE 2: NERVIOS DEL CUELLO
 ******************************************************************************/
const casosNervios = [
    { nombre: "Nervio Frénico",          imagen: "imagenes/nervio_frenico.jpg",     caso: "Paciente con parálisis diafragmática y dificultad para respirar." },
    { nombre: "Nervio Vago (X)",         imagen: "imagenes/nervio_vago.jpg",        caso: "Dificultad para hablar y tragar tras una cirugía en el cuello." },
    { nombre: "Nervio Accesorio (XI)",   imagen: "imagenes/nervio_accesorio.jpg",   caso: "Debilidad en trapecio y esternocleidomastoideo." },
    { nombre: "Cadena Simpática Cervical", imagen: "imagenes/cadena_simpatica.jpg", caso: "Síndrome de Horner: ptosis, miosis y anhidrosis." },
    { nombre: "Nervio Hipogloso (XII)",  imagen: "imagenes/nervio_hipogloso.jpg",   caso: "Paciente con desviación de la lengua hacia un lado." }
];

/******************************************************************************
 * FASE 3: INVESTIGACIÓN (PISTAS ALEATORIAS)
 ******************************************************************************/
const pistasCuello = [
    "Analiza el triángulo posterior del cuello y su contenido neurovascular.",
    "Investiga la irrigación e inervación de la glándula tiroides.",
    "Identifica las capas fasciales del cuello y su relevancia en infecciones profundas.",
    "Revisa la anatomía del espacio parafaríngeo y sus complicaciones clínicas.",
    "Explora el triángulo suboccipital y su importancia en la rotación cefálica.",
    "Describe el recorrido de la arteria vertebral en la región cervical.",
    "Relaciona el nervio hipogloso con la musculatura lingual y su función.",
    "Estudia los límites y contenido del triángulo submandibular.",
    "Examina las implicaciones clínicas de la cadena simpática cervical (síndrome de Horner).",
    "Describe el plexo cervical y sus ramas cutáneas.",
    "Investiga la vena yugular interna y su importancia en procedimientos invasivos.",
    "Analiza la anatomía quirúrgica del nervio frénico en el cuello.",
    "Investiga los ganglios linfáticos cervicales y su relación con metástasis.",
    "Detalla el nervio accesorio (XI) y su recorrido para inervar ECM y trapecio.",
    "Describe el triángulo carotídeo y las estructuras que pasan por él.",
    "Investiga la anatomía del seno carotídeo y su función barorreceptora.",
    "Estudia el triángulo muscular y su relación con patologías tiroideas.",
    "Explica las diferencias anatómicas entre arteria carótida interna y externa.",
    "Analiza las variantes anatómicas más frecuentes en los vasos del cuello.",
    "Examina el papel de la fascia cervical en la propagación de abscesos profundos."
];

/******************************************************************************
 * FASE 4: ESTRUCTURAS EN ECOGRAFÍA (ALEATORIAS)
 ******************************************************************************/
const estructurasEcograficas = [
    "Tiroides",
    "Arteria Carótida",
    "Vena Yugular Interna",
    "Ganglio Linfático Cervical",
    "Glándula Submandibular",
    "Paratiroides",
    "Músculo Esternocleidomastoideo (ECM)",
    "Cadenas Linfáticas Cervicales",
    "Vena Yugular Externa",
    "Vaina Carotídea"
];

/******************************************************************************
 * INICIO DEL JUEGO
 ******************************************************************************/
function iniciarJuego() {
    jugador = document.getElementById("nombreJugador").value.trim();
    if (jugador === "") {
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    // Mostramos la primera fase y el temporizador
    document.getElementById("registro").style.display = "none";
    document.getElementById("faseTriangulos").style.display = "block";
    document.getElementById("temporizador").style.display = "block";

    // Iniciamos el cronómetro
    tiempoInicio = Date.now();
    iniciarTemporizador();

    // Generamos el primer caso (Triángulos)
    generarCasoTriangulos();
}

/******************************************************************************
 * FASE 1: TRIÁNGULOS
 ******************************************************************************/
function generarCasoTriangulos() {
    let indices = [0, 1, 2, 3, 4, 5];
    indices.sort(() => Math.random() - 0.5);
    casoActual = casosTriangulos[indices[0]];

    document.getElementById("casoClinico").textContent = casoActual.caso;
    document.getElementById("opcion1").src = casosTriangulos[indices[0]].imagen;
    document.getElementById("opcion2").src = casosTriangulos[indices[1]].imagen;
    document.getElementById("opcion3").src = casosTriangulos[indices[2]].imagen;
    document.getElementById("opcion4").src = casosTriangulos[indices[3]].imagen;
}

function validarTriangulo(opcionSeleccionada) {
    const seleccion = document.getElementById(`opcion${opcionSeleccionada}`).src;
    const feedback = document.getElementById("feedbackTriangulos");

    if (seleccion.includes(casoActual.imagen)) {
        feedback.innerHTML = "✅ ¡Correcto!";
        feedback.style.color = "green";

        setTimeout(() => {
            // Pasamos a la Fase 2
            document.getElementById("faseTriangulos").style.display = "none";
            document.getElementById("faseNervios").style.display = "block";
            generarCasoNervios();
        }, 1000);
    } else {
        errores++;
        feedback.innerHTML = "❌ Incorrecto. Intenta de nuevo.";
        feedback.style.color = "red";
    }
}

/******************************************************************************
 * FASE 2: NERVIOS
 ******************************************************************************/
function generarCasoNervios() {
    let indices = [0, 1, 2, 3, 4];
    indices.sort(() => Math.random() - 0.5);
    casoActual = casosNervios[indices[0]];

    document.getElementById("casoNervios").textContent = casoActual.caso;
    document.getElementById("nervio1").src = casosNervios[indices[0]].imagen;
    document.getElementById("nervio2").src = casosNervios[indices[1]].imagen;
    document.getElementById("nervio3").src = casosNervios[indices[2]].imagen;
    document.getElementById("nervio4").src = casosNervios[indices[3]].imagen;
}

function validarNervio(opcionSeleccionada) {
    const seleccion = document.getElementById(`nervio${opcionSeleccionada}`).src;
    const feedback = document.getElementById("feedbackNervios");

    if (seleccion.includes(casoActual.imagen)) {
        feedback.innerHTML = "✅ ¡Correcto!";
        feedback.style.color = "green";

        setTimeout(() => {
            // Pasamos a la Fase 3 (Investigación)
            document.getElementById("faseNervios").style.display = "none";
            document.getElementById("faseInvestigacion").style.display = "block";
            generarPista();
        }, 1000);
    } else {
        errores++;
        feedback.innerHTML = "❌ Incorrecto. Intenta de nuevo.";
        feedback.style.color = "red";
    }
}

/******************************************************************************
 * FASE 3: INVESTIGACIÓN + CONTRASEÑA
 ******************************************************************************/
function generarPista() {
    const indiceAleatorio = Math.floor(Math.random() * pistasCuello.length);
    const pistaSeleccionada = pistasCuello[indiceAleatorio];

    document.getElementById("pista").textContent =
        "Tu tarea de investigación: " + pistaSeleccionada;
}

function validarContrasenaInvestigacion() {
    const inputContrasena = document.getElementById("contrasenaDocente").value.trim().toLowerCase();
    const feedback = document.getElementById("feedbackContrasena");

    if (inputContrasena === "aldana" || inputContrasena === "borda") {
        feedback.innerHTML = "✅ Contraseña correcta. Avanzando a la siguiente prueba...";
        feedback.style.color = "green";

        setTimeout(() => {
            // Ocultamos Fase 3 y pasamos a Fase 4
            document.getElementById("faseInvestigacion").style.display = "none";
            document.getElementById("faseEcografia").style.display = "block";
            generarEstructuraEcografica();
        }, 1200);
    } else {
        errores++;
        feedback.innerHTML = "❌ Contraseña incorrecta. Revisa e ingresa nuevamente.";
        feedback.style.color = "red";
    }
}

/******************************************************************************
 * FASE 4: ESTRUCTURA ECOGRÁFICA + CONTRASEÑA
 ******************************************************************************/
function generarEstructuraEcografica() {
    // Seleccionamos una estructura ecográfica aleatoria
    let indices = [...Array(estructurasEcograficas.length).keys()]; // [0,1,...9]
    indices.sort(() => Math.random() - 0.5);
    const randomIndex = indices[0]; // Tomamos el primero tras mezclar

    const estructura = estructurasEcograficas[randomIndex];
    // Mostramos la instrucción
    document.getElementById("instruccionEco").textContent =
        "Identifica en la ecografía real la siguiente estructura: " + estructura;
}

function validarContrasenaEcografia() {
    const inputContrasena = document.getElementById("contrasenaDocenteEco").value.trim().toLowerCase();
    const feedback = document.getElementById("feedbackContrasenaEco");

    if (inputContrasena === "aldana" || inputContrasena === "borda") {
        feedback.innerHTML = "✅ Contraseña correcta. Deteniendo el tiempo...";
        feedback.style.color = "green";

        setTimeout(() => {
            finalizarJuego();
        }, 1200);
    } else {
        errores++;
        feedback.innerHTML = "❌ Contraseña incorrecta. Intenta de nuevo.";
        feedback.style.color = "red";
    }
}

/******************************************************************************
 * TEMPORIZADOR Y FINALIZACIÓN
 ******************************************************************************/
function iniciarTemporizador() {
    setInterval(() => {
        const tiempoEnSegundos = Math.floor((Date.now() - tiempoInicio) / 1000);
        document.getElementById("tiempo").textContent = tiempoEnSegundos;
    }, 1000);
}

function finalizarJuego() {
    tiempoFinal = Math.floor((Date.now() - tiempoInicio) / 1000);

    // Ocultamos la Fase 4
    document.getElementById("faseEcografia").style.display = "none";

    // Mostramos mensaje final con resultados
    document.getElementById("finalMessage").style.display = "block";
    document.getElementById("jugadorFinal").textContent = jugador;
    document.getElementById("tiempoFinal").textContent = tiempoFinal;
    document.getElementById("erroresFinal").textContent = errores;
}


