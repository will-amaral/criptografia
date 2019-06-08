// A variável inquirer é um componente nodejs para auxiliar na
// criação de prompts interativos. 
// Aqui declaramos também a variável alfabeto que servirá de base para as funções
// e a variável index, que será usada para quebrar uma cifra de forma automática. 
// Importamos também os módulos separados para organização.
const inquirer = require('inquirer');
const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const prompts = require('./prompts');
let index = 1;
// O método cifraCesar utiliza a cifra de Ceśar para cifrar ou decifrar
// uma mensagem. Aqui, separamos os espaços, pontos e vírgulas
function cifraCesar(mensagem, passo, sinal) {
    return [...mensagem.toLowerCase()].map(char => {
            if (char === ' ' || char === '.' || char === ',') return char;
            else return alfabeto[(alfabeto.indexOf(char) + (sinal * passo)) % 26];
        }).join('');
}
// Filtrar a chave para valores númericos que serão utilizados na cifra de Viginere
function filtrarChave(chave) {
    return [...chave].map((char, indice) => {
        return indice + 1;
    });
}
// A cifra de Vigenere é similar a cifra de César, mas ao invés de receber um número 
// um número de passos, passamos uma chave que será utilizada para fazer o deslocamento
// Assim como a cifra de Cesar, essa cifra é possível de ser utilizada para decifrar também. 
function cifraVigenere(mensagem, chave, sinal) {
    chave = filtrarChave(chave);
    return [...mensagem.toLowerCase()].map((char, indice) => {
        if (char === ' ' || char === '.' || char === ',') return char;
        else return alfabeto[(alfabeto.indexOf(char) + (sinal * chave[indice % chave.length])) % 26];
    }).join('');
}
// Caso o usuário não saiba o número de passos para quebrar a cifra de cesar, fazemos
// todos os passos possíveis
async function breakCesar(mensagem, frequenciaBase, frequenciaMensagem) {
    for (let passo = 0; passo <= 26; passo++) {
        let indice = alfabeto.indexOf(frequenciaBase[0][0]) + alfabeto.indexOf(frequenciaMensagem[0][passo]) % 26; 
        console.log('Tentativa de Decifrar: ' + cifraCesar(mensagem, indice, 1) + '\n');
        const { again } = await inquirer.prompt(prompts[7]);
        if (again) return console.log('Mensagem decifrada com sucesso!');
        else if (passo == 26) return console.log('Número máximo de passos executados');
    }
}
// A função breakVigenere utiliza a análise de frequência para tentar quebrar a mensagem criptografada.
async function analiseFrequencia(mensagem) {
    var arr = [];
    mensagem = [...mensagem.replace(/\s+/g, '').toLowerCase()].reduce((total, letter) => {
        total[letter] ? total[letter]++ : total[letter] = 1;
        return total;
    }, {});
    for (var char in mensagem) {
        arr.push([char, mensagem[char]]);
    }
    return arr.sort((a, b) => b[1] - a[1]);
}
// Exibe o menu e chama as funções. 
async function Main() {
    const { cifra, mensagem, ops, chave, temCifra, chaveDecifra } = await inquirer.prompt(prompts.slice(0,-2));
    if (cifra == 'Cifra de César') {
        if (ops == 'Cifrar a mensagem') {
            console.log('A mensagem original é: ' + mensagem);
            console.log('A mensagem cifrada é: ' + cifraCesar(mensagem, chave, 1));
        } else if (temCifra) {
            console.log('A mensagem cifrada é: ' + mensagem);
            console.log('A mensagem original é: ' + cifraCesar(mensagem, chaveDecifra, -1));
        } else {
            const { fraseBase } = await inquirer.prompt(prompts[6]);
            const frequenciaBase = await analiseFrequencia(fraseBase);
            const frequenciaMensagem = await analiseFrequencia(mensagem);
            console.log(frequenciaMensagem);
            console.log(frequenciaBase);
            breakCesar(mensagem, frequenciaBase, frequenciaMensagem);
        }
    } else {
        if (ops == 'Cifrar a mensagem') {
            console.log('A mensagem original é: ' + mensagem);
            console.log('A mensagem cifrada é: ' + cifraVigenere(mensagem, chave, 1));
        } else if (temCifra) {
            console.log('A mensagem cifrada é: ' + mensagem);
            console.log('A mensagem original é: ' + cifraVigenere(mensagem, chaveDecifra, -1));
        } else {
            console.log('Não é possível decifrar essa mensagem.');
        }
    }
}
// Executar o Menu
Main();