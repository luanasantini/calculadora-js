const calculadora = document.querySelector('.calculadora')
const teclas = calculadora.querySelector('.calculadora-teclas')
const display = document.querySelector('.calculadora-display')
let valores = []
let operadores = []

const calcula = (valores, operadores) => {
    for (let i = 0; i < operadores.length; i++) {
        if (operadores[i] === 'multiplica' || operadores[i] === 'divide') {
            const num1 = parseFloat(valores[i]);
            const num2 = parseFloat(valores[i + 1]);

            if (operadores[i] === 'multiplica') {
                valores.splice(i, 2, (num1 * num2).toString());
            } else if (operadores[i] === 'divide') {
                valores.splice(i, 2, (num1 / num2).toString());
            }

            operadores.splice(i, 1);
            i--;
        }
    }

    let resultado = parseFloat(valores[0]);
    for (let i = 0; i < operadores.length; i++) {
        const num = parseFloat(valores[i + 1]);

        if (operadores[i] === 'soma') {
            resultado += num;
        } else if (operadores[i] === 'subtrai') {
            resultado -= num;
        }
    }

    return resultado;
};

teclas.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const tecla = e.target;
        const action = tecla.dataset.action;
        const teclaConteudo = tecla.textContent;
        const numeroDisplay = display.textContent;

        if (!action) {
            display.textContent = numeroDisplay === '0' ? teclaConteudo : numeroDisplay + teclaConteudo;
        }

        if (['soma', 'subtrai', 'multiplica', 'divide'].includes(action)) {
            valores.push(numeroDisplay);
            operadores.push(action);
            display.textContent = '0';
        }

        if (action === 'decimal') {
            if (!numeroDisplay.includes('.')) {
                display.textContent = numeroDisplay + '.';
            }
        }

        if (action === 'limpa') {
            display.textContent = '0';
            valores = [];
            operadores = [];
        }

        if (action === 'apaga') {
            if (numeroDisplay.length > 1) {
                display.textContent = numeroDisplay.slice(0, -1);
            } else {
                display.textContent = '0';
            }
        }

        if (action === 'calcula') {
            valores.push(numeroDisplay);
            const resultado = calcula(valores, operadores);
            display.textContent = resultado;
            valores = [resultado.toString()];
            operadores = [];
        }
    }
});