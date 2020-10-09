/*
* Desenvolvido por Lucas-HMSC com a ferramenta whatsapp-web.js
* Data Setembro de 2020
*/

let fila = [];
const fs = require('fs');
const qrcode = require('qrcode-terminal');
//const { Client, Location } = require('./index');
const { Client } = require('whatsapp-web.js');
const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

function saudacao() {
    // Função para gerar a saudação dinâmica, de acordo com o horario
    const data = new Date();
    let hora = data.getHours();
    let str = '';
    if (hora >= 0 && hora < 12) {
        str = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        str = "Boa tarde";
    } else {
        str = "Boa noite";
    }
    return str;
}

function imprimirFila(fila) {
    // Função para formatar a fila em um novo vetor
    let filaFormat = [];
    for (let i = 0; i < fila.length; i++) {
        filaFormat.push(`${i+1}) ${fila[i]}\n`);
    }
    return filaFormat.join('');
}

const client = new Client({ 
    puppeteer: { 
        headless: false, 
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' 
    }, 
    session: sessionCfg 
});
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', async (msg) => {
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    // Fired on all message creations, including your own
    if (msg.fromMe) {
        if (msg.body == '###') { // Comando para exibir a fila atualizada
            if (fila.length == 0) {
                msg.reply('A fila está vazia até o momento.');
            } else {
                msg.reply(`O tamanho da fila é ${fila.length} com os seguintes integrantes: \n` + imprimirFila(fila));
            }
        } else if (msg.body.match(/&+/)) { // Comando para remover um número da fila, de acordo com a sua posição
            let i = Number(msg.body.slice(1));
            let removido = fila[i-1];
            msg.reply(`Atendimento encerrado para o ${i}) ${removido}`); // Mensagem de confirmação para o usuario da fila
            fila.splice((i-1), 1);
            let number = removido;
            number = number.includes('@c.us') ? number : `${number}@c.us`;
            let message = `Atendimento encerrado. Caso tenha mais dúvidas, pode responder a essa mensagem quando quiser!`; // Mensagem automática para o integrante da fila que foi removido
            client.sendMessage(number, message);
        }
    } else if ((chat.isGroup == false) && (!fila.includes(contact.number))) { // Inclui o numero na fila caso não esteja
        fila.push(contact.number);
        chat.sendStateTyping();
        chat.sendMessage(saudacao() + ` @${contact.number}! Tudo bem? Como posso ajudar? \n\nVocê é o ${fila.length}º da fila de atendimento, aguarde um momento e irei te atender!`, {
            mentions: [contact]
        });
    } 
});

client.initialize();