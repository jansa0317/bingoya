let numerosGenerados = new Set();

function mostrarAnimacion() {
    return new Promise(resolve => {
        let intervalo = setInterval(() => {
            let numeroAleatorio = Math.floor(Math.random() * 75) + 1;
            let letra = obtenerLetra(numeroAleatorio);
            document.getElementById('resultado').innerText = letra + numeroAleatorio;
        }, 80);

        setTimeout(() => {
            clearInterval(intervalo);
            resolve();
        }, 2000);
    });
}

async function generarNumero() {
    if (numerosGenerados.size === 75) {
        document.getElementById('resultado').innerText = "BINGO COMPLETO.";
        return;
    }
    await mostrarAnimacion();

    let numero;
    do {
        numero = Math.floor(Math.random() * 75) + 1;
    } while (numerosGenerados.has(numero));

    numerosGenerados.add(numero);

    let letra = obtenerLetra(numero);
    document.getElementById('resultado').innerText = letra + numero;

    CeldaNegra(numero);

    reproducirVoz(letra + numero);
}

function obtenerLetra(numero) {
    if (numero >= 1 && numero <= 15) {
        return 'B';
    } else if (numero >= 16 && numero <= 30) {
        return 'I';
    } else if (numero >= 31 && numero <= 45) {
        return 'N';
    } else if (numero >= 46 && numero <= 60) {
        return 'G';
    } else {
        return 'O';
    }
}

function CeldaNegra(numero) {
    const cell = document.getElementById(`cell-${numero}`);
    if (cell) {
        cell.style.backgroundColor = 'black';
        cell.style.color = 'white';
    }
}

function reproducirVoz(texto) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES'; 
    speechSynthesis.speak(utterance);
}
