// Contar números pares
function contarNumerosPares() {
    const numero = parseInt(document.getElementById("entradaContadorPares").value);
    if (isNaN(numero) || numero <= 0) {
        document.getElementById("resultadoContadorPares").innerText = "Por favor, ingresa un número positivo válido.";
        return;
    }

    let contador = 0;
    for (let i = 1; i <= numero; i++) {
        if (i % 2 === 0) {
            contador++;
        }
    }

    document.getElementById("resultadoContadorPares").innerText = `Números pares desde 1 hasta ${numero}: ${contador}`;
}

// Calcular exponentes
function calcularExponente() {
    const base = parseInt(document.getElementById("entradaBase").value);
    const exponente = parseInt(document.getElementById("entradaExponente").value);
    if (isNaN(base) || isNaN(exponente)) {
        document.getElementById("resultadoExponente").innerText = "Por favor, ingresa valores válidos para base y exponente.";
        return;
    }

    const resultado = Math.pow(base, exponente);
    document.getElementById("resultadoExponente").innerText = `${base} elevado a ${exponente} es ${resultado}`;
}

// Invertir cadena
function invertirCadena() {
    const cadena = document.getElementById("entradaInversor").value;
    if (cadena.trim() === "") {
        document.getElementById("resultadoInversor").innerText = "Por favor, ingresa una cadena válida.";
        return;
    }

    const cadenaInvertida = cadena.split("").reverse().join("");
    document.getElementById("resultadoInversor").innerText = `Cadena invertida: ${cadenaInvertida}`;
}

// Generar números primos
function generarPrimos() {
    const numero = parseInt(document.getElementById("entradaPrimos").value);
    if (isNaN(numero) || numero <= 0) {
        document.getElementById("resultadoPrimos").innerText = "Por favor, ingresa un número positivo válido.";
        return;
    }

    const primos = [];
    for (let i = 2; primos.length < numero; i++) {
        if (esPrimo(i)) {
            primos.push(i);
        }
    }

    document.getElementById("resultadoPrimos").innerText = `Resultados de ${numero}: ${primos.join(", ")}`;
}

function esPrimo(num) {
    if (num < 2) return false; // Los números menores a 2 no son primos
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Convertir horas a minutos
function convertirHoras() {
    const horas = parseInt(document.getElementById("entradaHoras").value);
    if (isNaN(horas) || horas < 0) {
        document.getElementById("resultadoMinutos").innerText = "Por favor, ingresa un número de horas válido.";
        return;
    }

    const minutos = horas * 60;
    document.getElementById("resultadoMinutos").innerText = `${horas} horas son ${minutos} minutos.`;
}

// Mostrar inputs según figura seleccionada
function mostrarInputs() {
    const figura = document.getElementById("tipoFigura").value;
    const inputsCuadrado = document.getElementById("inputsCuadrado");
    const inputsRectangulo = document.getElementById("inputsRectangulo");
    const inputsTriangulo = document.getElementById("inputsTriangulo");

    // Ocultar todos los inputs
    inputsCuadrado.classList.add("d-none");
    inputsRectangulo.classList.add("d-none");
    inputsTriangulo.classList.add("d-none");

    // Mostrar solo los inputs correspondientes
    if (figura === "cuadrado") {
        inputsCuadrado.classList.remove("d-none");
    } else if (figura === "rectangulo") {
        inputsRectangulo.classList.remove("d-none");
    } else if (figura === "triangulo") {
        inputsTriangulo.classList.remove("d-none");
    }
}

// Calcular área
function calcularArea() {
    const figura = document.getElementById("tipoFigura").value;
    let area;

    if (figura === "cuadrado") {
        const lado = parseFloat(document.getElementById("entradaLadoCuadrado").value);
        area = lado * lado;
    } else if (figura === "rectangulo") {
        const largo = parseFloat(document.getElementById("entradaLargo").value);
        const ancho = parseFloat(document.getElementById("entradaAncho").value);
        area = largo * ancho;
    } else if (figura === "triangulo") {
        const base = parseFloat(document.getElementById("entradaBase").value);
        const altura = parseFloat(document.getElementById("entradaAlturaTriangulo").value);
        area = (base * altura) / 2;
    }

    document.getElementById("resultadoArea").innerText = `Área de la figura: ${area}`;
}


// Simulador de notas
const estudiantes = []; // Array para almacenar los estudiantes y sus notas
const notaCorte = 12;

// Función para agregar una nueva nota
function agregarNota() {
    // Obtener el nombre y la nota ingresados por el usuario
    const nombre = document.getElementById("nombreEstudiante").value.trim();
    const nota = document.getElementById("notaEstudiante").value.trim(); // Obtener la nota como cadena

    // Validar la entrada
    const esNumeroValido = /^\d+(\.\d+)?$/.test(nota); // Verificar que sea un número válido
    const esNombreValido = /^[A-Za-z\s]+$/.test(nombre); // Verificar solo letras y espacios

    if (nombre === "" || !esNombreValido || !esNumeroValido || Number(nota) < 0 || Number(nota) > 20) {
        document.getElementById("resultadoNotas").innerText = "Por favor, ingresa un nombre válido (solo letras) y una nota válida (0-20).";
        return; // Validacion
    }

    // Convertir la nota a número para hacer el calculo
    const notaNumero = Number(nota);

    // Verificar si el estudiante ya existe en el array
    const estudianteExistente = estudiantes.find(est => est.nombre.toLowerCase() === nombre.toLowerCase());

    if (estudianteExistente) {
        // Si existe, actualizar la nota
        estudianteExistente.nota = notaNumero;
    } else {
        // Si no existe, agregar nuevo estudiante
        estudiantes.push({ nombre, nota: notaNumero });
    }

    // Calcular el promedio y mostrar resultados
    mostrarResultados();
}

// Función para mostrar los resultados
function mostrarResultados() {
    let totalNotas = 0; // Variable para acumular el total de notas
    let resultadoTexto = ""; // Variable para almacenar el texto de resultados

    // Calcular el total y generar el texto de resultados
    estudiantes.forEach(estudiante => {
        totalNotas += estudiante.nota; // Sumar la nota del estudiante al total
        // Crear el texto con el nombre, la nota y si está aprobado o reprobado
        resultadoTexto += `${estudiante.nombre}: ${estudiante.nota} - ${estudiante.nota >= notaCorte ? 'Aprobado' : 'Reprobado'}<br>`;
    });

    // Calcular el promedio de notas
    const promedio = (totalNotas / estudiantes.length).toFixed(2);
    resultadoTexto += `<strong>Promedio general: ${promedio}</strong>`; // Agregar el promedio al texto de resultados

    // Mostrar los resultados en el elemento HTML correspondiente
    document.getElementById("resultadoNotas").innerHTML = resultadoTexto;
    mostrarRanking(); // Llamar a la función para mostrar el ranking de estudiantes
}

// Función para mostrar el ranking de estudiantes
function mostrarRanking() {
    // Ordenar estudiantes por nota de mayor a menor
    const rankingEstudiantes = estudiantes.sort((a, b) => b.nota - a.nota);
    // Crear el texto para mostrar el ranking
    const rankingTexto = rankingEstudiantes.map((estudiante, index) => `${index + 1}. ${estudiante.nombre}: ${estudiante.nota}`).join("<br>");

    // Mostrar el ranking en el elemento HTML correspondiente
    document.getElementById("ranking").innerHTML = `<strong>Ranking de estudiantes:</strong><br>${rankingTexto}`;
}

// Función para resetear el modal y limpiar los datos
function resetModalNotas() {
    // Limpiar los campos de entrada
    document.getElementById("nombreEstudiante").value = "";
    document.getElementById("notaEstudiante").value = "";
    // Limpiar los resultados mostrados
    document.getElementById("resultadoNotas").innerText = "";
    document.getElementById("ranking").innerText = "";
    estudiantes.length = 0; // Limpiar el array de estudiantes
}


// Validar palíndromo
function validarPalindromo() {
    const frase = document.getElementById("entradaPalindromo").value;

    // Verificar que la entrada no esté vacía
    if (frase.trim() === "") {
        document.getElementById("resultadoPalindromo").innerText = "Por favor, ingresa una palabra o frase válida.";
        return;
    }

    // Convertir a minúsculas, normalizar y eliminar espacios y caracteres no alfanuméricos
    const textoLimpio = frase.toLowerCase()
        .normalize("NFD") // Normalizar
        .replace(/[\u0300-\u036f]/g, "") // Eliminar marcas de acento
        .replace(/[^a-z0-9ñ]/g, ""); // Mantener letras y números

    const esPalindromo = textoLimpio === textoLimpio.split("").reverse().join("");

    document.getElementById("resultadoPalindromo").innerText = esPalindromo ? `"${frase}" es un palíndromo.` : `"${frase}" no es un palíndromo.`;
}



// Convertir unidades de longitud
//hacemos el recojo de valores
function convertirUnidades() {
    const valor = parseFloat(document.getElementById("valorLongitud").value);
    if (isNaN(valor)) {
        document.getElementById("resultadoConversionLongitud").innerText = "Por favor, ingresa un valor numérico para la longitud.";
        return;
    }

    const desde = document.getElementById("unidadDesdeLongitud").value;
    const hasta = document.getElementById("unidadHastaLongitud").value;
    let resultado;
    //recojemos los valores y los convertimos segun sea el caso
    if (desde === "metros" && hasta === "kilometros") {
        resultado = valor / 1000;
    } else if (desde === "kilometros" && hasta === "metros") {
        resultado = valor * 1000;
    } else if (desde === "centimetros" && hasta === "metros") {
        resultado = valor / 100;
    } else if (desde === "metros" && hasta === "centimetros") {
        resultado = valor * 100;
    } else {
        resultado = valor;
    }

    document.getElementById("resultadoConversionLongitud").innerText = `Resultado: ${resultado}`;
}

// Convertir unidades de masa
function convertirMasa() {
    const valor = parseFloat(document.getElementById("valorMasa").value);
    if (isNaN(valor)) {
        document.getElementById("resultadoConversionMasa").innerText = "Por favor, ingresa un valor numérico para la masa.";
        return;
    }

    const desde = document.getElementById("unidadDesdeMasa").value;
    const hasta = document.getElementById("unidadHastaMasa").value;
    let resultado;
    //de igual manera aca
    if (desde === "gramos" && hasta === "kilogramos") {
        resultado = valor / 1000;
    } else if (desde === "kilogramos" && hasta === "gramos") {
        resultado = valor * 1000;
    } else {
        resultado = valor; // Mismo tipo
    }

    document.getElementById("resultadoConversionMasa").innerText = `Resultado: ${resultado}`;
}

// Calcular edad en días
function calcularEdad() {
    const fechaNacimiento = new Date(document.getElementById("entradaFecha").value);

    // Verificar si la fecha es válida
    if (isNaN(fechaNacimiento.getTime())) {
        document.getElementById("resultadoEdad").innerText = "Por favor, ingresa una fecha válida.";
        return;
    }

    const hoy = new Date();

    // verificar horas
    hoy.setHours(0, 0, 0, 0);

    // Calcular diferencia en días
    const edadEnDias = Math.floor((hoy - fechaNacimiento) / (1000 * 60 * 60 * 24));

    document.getElementById("resultadoEdad").innerText = `Tu edad es aproximadamente ${edadEnDias} días.`;
}

// Calcular factorial
function calcularFactorial() {
    const numero = parseInt(document.getElementById("entradaFactorial").value);
    const limite = 170; // Puedes ajustar este límite según lo que consideres

    if (isNaN(numero) || numero < 0) {
        document.getElementById("resultadoFactorial").innerText = "Por favor, ingresa un número entero no negativo.";
        return;
    }

    if (numero > limite) {
        document.getElementById("resultadoFactorial").innerText = "El factorial de " + numero + " es infinito.";
        return;
    }

    let factorial = 1;
    for (let i = 1; i <= numero; i++) {
        factorial *= i;
    }

    document.getElementById("resultadoFactorial").innerText = `El factorial de ${numero} es ${factorial}.`;
}

//Cifrado cesar
function cifrarCesar() {
    // Obtener el texto ingresado por el usuario
    const texto = document.getElementById("entradaTexto").value;

    // Obtener y convertir el desplazamiento ingresado por el usuario a un número entero
    let desplazamiento = parseInt(document.getElementById("entradaDesplazamiento").value);

    // almacenar el resultado cifrado
    let resultado = "";

    // Verificar si el desplazamiento ingresado es un número válido
    if (isNaN(desplazamiento)) {
        document.getElementById("resultadoCesar").innerText = "Por favor, ingresa un número válido para el desplazamiento.";
        return; // Salir de la función si el desplazamiento no es válido
    }

    // Verificar si el desplazamiento está dentro del rango permitido (0-25)
    if (desplazamiento < 0 || desplazamiento > 25) {
        document.getElementById("resultadoCesar").innerText = "El desplazamiento debe estar entre 0 y 25.";
        return; // Salir de la función si el desplazamiento no está en el rango permitido
    }

    // Recorrer cada carácter del texto ingresado
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i]; // Obtener el carácter actual

        // Verificar si el carácter es una letra (mayúscula o minúscula)
        if (char.match(/[a-z]/i)) {
            const code = texto.charCodeAt(i); // Obtener el código ASCII del carácter
            const base = (char === char.toLowerCase()) ? 97 : 65; // Determinar la base (97 para minúsculas, 65 para mayúsculas)

            // Aplicar el desplazamiento al carácter y convertirlo de nuevo a carácter utilizando String.fromCharCode
            resultado += String.fromCharCode(((code - base + desplazamiento) % 26) + base);
        } else {
            // Si el carácter no es una letra, se deja sin cifrar
            resultado += char;
        }
    }

    // Mostrar el resultado cifrado en el elemento con id "resultadoCesar"
    document.getElementById("resultadoCesar").innerText = `Texto cifrado: ${resultado}`;
}





// Funciones para resetear los modales
function resetModal1() {
    document.getElementById("entradaContadorPares").value = "";
    document.getElementById("resultadoContadorPares").innerText = "";
}

function resetModal2() {
    document.getElementById("entradaBase").value = "";
    document.getElementById("entradaExponente").value = "";
    document.getElementById("resultadoExponente").innerText = "";
}

function resetModal3() {
    document.getElementById("entradaInversor").value = "";
    document.getElementById("resultadoInversor").innerText = "";
}

function resetModal4() {
    document.getElementById("entradaPrimos").value = "";
    document.getElementById("resultadoPrimos").innerText = "";
}

function resetModal5() {
    document.getElementById("entradaHoras").value = "";
    document.getElementById("resultadoMinutos").innerText = "";
}

// Funciones de resetear
function resetModal6() {
    document.getElementById("tipoFigura").value = "";
    mostrarInputs(); // Resetear la visibilidad de inputs
    document.getElementById("resultadoArea").innerText = "";
}

function resetModal7() {
    document.getElementById("entradaFraseUnica").value = "";
    document.getElementById("resultadoPalabrasUnicas").innerText = "";
}

function resetModal8() {
    document.getElementById("entradaPalindromo").value = "";
    document.getElementById("resultadoPalindromo").innerText = "";
}

function resetModal9() {
    document.getElementById("valorLongitud").value = "";
    document.getElementById("resultadoConversionLongitud").innerText = "";
    document.getElementById("valorMasa").value = "";
    document.getElementById("resultadoConversionMasa").innerText = "";
}

function resetModal10() {
    document.getElementById("entradaFecha").value = "";
    document.getElementById("resultadoEdad").innerText = "";
}

// Resetear modal 11
function resetModal11() {
    document.getElementById("entradaFactorial").value = "";
    document.getElementById("resultadoFactorial").innerText = "";
}

// Resetear modal 12
function resetModal12() {
    document.getElementById("entradaTexto").value = "";
    document.getElementById("entradaDesplazamiento").value = "";
    document.getElementById("resultadoCesar").innerText = "";
}
