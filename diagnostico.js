const datosPaciente = {
    nombre: '',
    edad: '',
    informe:''
   
};

//chequeo del último informe guardado en local storage
function chequeoLocalStore() {
    const ultimoLocalStorage = obtenerLocalstorage();
    console.log(ultimoLocalStorage);
    if (ultimoLocalStorage.nombre === null && ultimoLocalStorage.edad === null) {
        ocultarObjeto('btnUltimoInforme')
    }
    ocultarObjeto('ctnExportar');
    ocultarObjeto('btnExportar');
    ocultarObjeto('ctnInforme');
}
//comienza diagnostico
function empiezaDiagnostico() {
    ocultarObjeto('btnUltimoInforme')
    ocultarObjeto('ctnExportar');
    ocultarObjeto('btnExportar');
    ocultarObjeto('ctnInforme');
    ocultarObjeto('btnEmpezar');

    limpiarCampos();
    mostrarObjeto('divNombre');
}

function limpiarCampos(){
    const objectNombre = document.getElementById('txtNombre');
    objectNombre.value = '';
    const objectEdad = document.getElementById('txtEdad');
    objectEdad.value = '';
   
}
//Validacion de inputs de usuario
const btnEnviar = document.getElementById('btn-enviar');

const validación = (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre');
  const edad = document.getElementById('edad');
  if (nombre.value === "") {
    alert("Por favor, escribe tu nombre");
    
    return false;
  }
  if (edad.value === "") {
    alert("Por favor, escribe tu edad");
    
    return false;
  }
  
}


//Simulación de base de datos de paciente, trae diagnóstico de los pacientes previamente diagnosticados y cargados en base de datos.
function escribirInforme() {
    console.log("Escrbiendo informe");
    const inicioInforme = "El paciente " + datosPaciente.nombre + " de " + datosPaciente.edad + " años de edad, posee un cuadro ";
    datosPaciente.informe = inicioInforme + elegirCuadroAleatorio();
}
//funcion random para simular funcionamiento del programa: Al cargar nombre y edad retorna el diagnostico ya cargado en base de datos.
function elegirCuadroAleatorio() {
    var cuadro;
    var count = 0;
    for (var prop in cuadrosPsicologicos) {
        if (Math.random() < 1/++count) {
            cuadro = prop;
        }
    }

    return cuadrosPsicologicos[cuadro];
}

function mostrarObjeto(objetoId) {
    console.log('mostrar objeto: ' + objetoId);
    const div = document.getElementById(objetoId);
    div.style.display = '';
    return div;
}

function ocultarObjeto(objetoId) {
    console.log('ocultar objeto: ' + objetoId);
    const div = document.getElementById(objetoId);
    div.style.display = 'none';
    return div;
}

function seguirLuegoDeNombre() {
    ocultarObjeto('divNombre');
    const objectNombre = document.getElementById('txtNombre')
    datosPaciente.nombre = objectNombre.value;
    mostrarObjeto('divEdad');
}
//genera informe y lo guarda en local storage.
function generarInforme() {
    const objectEdad = document.getElementById('txtEdad');
    datosPaciente.edad = objectEdad.value;
    ocultarObjeto('divEdad');

    mostrarInforme();

    guardarLocalstorage();
}

function mostrarInforme(flagUltimoInforme = false){
    mostrarObjeto('ctnInforme');
    const objectInforme = mostrarObjeto('informe');

    if (flagUltimoInforme) {
        const ultimoLocalStorage = obtenerLocalstorage();
        datosPaciente.nombre = ultimoLocalStorage.nombre;
        datosPaciente.edad = ultimoLocalStorage.edad;
        datosPaciente.informe = ultimoLocalStorage.informe;
    } else {
        escribirInforme();
    }

    console.log(datosPaciente);
    objectInforme.textContent = datosPaciente.informe;

    mostrarObjeto('btnExportar');
    mostrarObjeto('btnEmpezar');
}

function verExportar() {
    mostrarObjeto('ctnExportar');
    const objectExportar = mostrarObjeto('exportar');
    objectExportar.textContent = exportarJSON(datosPaciente);
}
//Exporta a JSON.
function exportarJSON(objeto) {
    return JSON.stringify(objeto);
}
//función que nos trae el último paciente guardado en local storage.
function obtenerLocalstorage(){
    const nombre = localStorage.getItem("Nombre");
    const edad = localStorage.getItem("Edad");
    const informe = localStorage.getItem("Informe");

    return {
        nombre: nombre,
        edad: edad,
        informe: informe
    }
};

function guardarLocalstorage(){
    localStorage.setItem("Nombre", datosPaciente.nombre);
    localStorage.setItem("Edad", datosPaciente.edad);
    localStorage.setItem("Informe", datosPaciente.informe);
};

function mostrarUltimoInforme(){
    mostrarInforme(true);
}
//Ejemplos aleatorios de cuadros psicológicos para simular la sintomatología de los pacientes cargados en una base de datos.
const cuadrosPsicologicos = {
    TrastornoAnsiedadGeneralizada: "de Trastorno de Ansiedad Generalizada que suele estar vinculado al hecho de ir a la escuela y tener que encontrarse con personas semi-desconocidas, tener que hablar frente al resto de la clase, realizar exámenes, o exponerse al riesgo de sufrir bullying.",
    FobiaSocial: "de Fobia Social que experimenta pensamientos catastróficos acerca de lo que puede pasar si inicia una conversación con alguien o si interactúa de alguna manera con gente desconocida.",
    TrastornoConducta: "de Trastorno de la Conducta que se caracteriza por expresarse a través de una tendencia a la agresividad y a transgredir las normas constantemente.",
    TDAH: "de TDAH que están relacionados con la necesidad de buscar actividades de interacción con el entorno que distraigan al niño o niña, y con los problemas a la hora de focalizar la atención en un mismo estímulo durante varios minutos seguidos.",
    TrastornosAlimentaria: "de Trastornos de la conducta alimentaria que es la preocupación por la propia imagen también cobra protagonismo, y se asume que la apariencia es la carta de presentación que implicará tener más o menos apoyo en estos grupos de adolescentes.",
    TrastornodeAbusodeSustancias: "de trastorno de abuso de sustancias que pueden estar o no vinculadas a episodios maníacos y/o depresivos en conjunto con episodios de paranoia.",
    TrasornodeAlcoholismo: "de trastorno por abuso de ingesta de alcohol relacionado a estados de depresión y/o melancolía.",
    TrastornoGeneralizadoDelDesarrollo: "de trastorno de alteración significativa de la capacidad de interacción social y la comunicación verbal y no verbal."
}

//Llamda AJAX 
$( document ).ready(function() {
    
    const APIURL = 'https://jsonplaceholder.typicode.com/posts' ; 
    
    const infoPost = { nombre: "", edad: "" }
    
    $("body").prepend('<button id="btn1">ENVIAR API</button> ');
    
    $("#btn1").click(() => { 
    $.ajax({
    method : "POST",
    url : APIURL,
    data : infoPost,
    success: function(respuesta){
    
   $("body").prepend(`<div>${respuesta.nombre}</div>`);
   $("body").prepend(`<div>${respuesta.edad}</div>`);
    }
    });
    });
   });
