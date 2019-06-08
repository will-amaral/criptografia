const prompts = [
    {
        type: 'list',
        name: 'cifra',
        message: 'Escolha um tipo de cifra: ',
        choices: [
            'Cifra de César',
            'Cifra de Vigenere'
        ]
    },
    {   
        type: 'input',
        name: 'mensagem',
        message: 'Entre a mensagem: '
    },
    {
        type: 'list',
        name: 'ops',
        message: 'O que você quer fazer?',
        choices: [
            'Cifrar a mensagem',
            'Decifrar a mensagem'
        ]
    },
    {
        when: resposta => {
            if (resposta.ops == 'Cifrar a mensagem')
                return true;
        },
        type: 'input',
        name: 'chave',
        message: 'Entre a sua cifra ou o número de passos: '
    }, 
    {
        when: resposta => {
            if (resposta.ops == 'Decifrar a mensagem')
                return true;
        },
        type: 'confirm',
        name: 'temCifra',
        message: 'Você possui uma chave ou número de passos para essa cifra?'
    }, {
        when: resposta => {
            return resposta.temCifra;
        },
        type: 'input',
        name: 'chaveDecifra',
        message: 'Entre a chave ou o número de passos: '
    },
    {
        type: 'input',
        name: 'fraseBase',
        message: 'Entre uma frase para realizar a análise de frequência: '
    },
    {
        type: 'confirm',
        name: 'again',
        message: 'A mensagem foi decifrada?'
    }

]

module.exports = prompts;