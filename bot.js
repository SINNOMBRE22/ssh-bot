const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { Client: SSHClient } = require('ssh2');
require('dotenv').config();

// Crear una nueva instancia del cliente de WhatsApp con el flag --no-sandbox
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot de WhatsApp está listo!');
});

// Escuchar mensajes entrantes
client.on('message', async (message) => {
    if (message.body.startsWith('cuenta')) {
        const parts = message.body.split(',');
        if (parts.length === 3) {
            const username = parts[1].trim();
            const password = parts[2].trim();
            createSSHAccount(username, password, message);
        } else {
            message.reply('Formato incorrecto. Usa: cuenta,username,password');
        }
    }
});

// Aquí iría la función createSSHAccount y otras funciones necesarias...
// Función para generar el mensaje formateado con la información del VPS
function generateVPSInfoMessage(username, password, ip, expirationDate) {
    return `
╔═════════════════════
║      𝗩𝗣𝗦-𝗦𝗶𝗻𝗡𝗼𝗺𝗯𝗿𝗲
║═════════════════════
║[𖣘]𝗛𝗢𝗦𝗧/IP-Address: ${ip}
║𝗨𝗦𝗨𝗔𝗥𝗜𝗢: ${username}
║𝗣𝗔𝗦𝗦𝗪𝗗: ${password}
║𝗟𝗜𝗠𝗜𝗧𝗘: 1
║═════════════════════
║[𖣘]𝗩𝗔𝗟𝗜𝗗𝗘𝗦: ${expirationDate}
║═════════════════════
║[𖣘] 𝗣𝘆𝘁𝗵𝗼𝗻: ${ip}:80@${username}:${password}
║[𖣘] 𝗦𝗦𝗛/𝗦𝗦𝗟: ${ip}:443@${username}:${password}
║[𖣘] 𝗨𝗗𝗣-𝗖𝗨𝗦𝗧𝗢𝗠: ${ip}:1-65535@${username}:${password}
║═════════════════════
║[𖣘] 𝗣𝗮𝘆𝗹𝗼𝗮𝗱 : GET / HTTP/1.1[crlf]Host: sinnombre.ovh[crlf]Upgrade: websocket[crlf][crlf]
║═════════════════════
║[𖣘] 𝗜𝗣 𝗨𝗦𝗔 🇺🇸
╚═════════════════════
╔═════════════════════╗
║    ✯𝗗𝗨𝗘𝗡̃𝗢 𝗬 𝗖𝗥𝗘𝗔𝗗𝗢𝗥✯
║https://wa.me/message/BSE4ZCEPY7ZOP1
╚═════════════════════╝
`;
}

// Función para obtener la fecha de expiración en 1 día
function getExpirationDate() {
    const today = new Date();
    today.setDate(today.getDate() + 1);  // Sumar 1 día

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}

// Función para crear la cuenta SSH en el VPS
function createSSHAccount(username, password, message) {
    const conn = new SSHClient();
    const ip = process.env.VPS_HOST;
    const expirationDate = getExpirationDate();  // Obtener la fecha de expiración de 1 día

    conn.on('ready', () => {
        console.log('Conectado al servidor VPS.');

        const command = `sudo useradd -m ${username} && echo '${username}:${password}' | sudo chpasswd`;

        conn.exec(command, (err, stream) => {
            if (err) throw err;

            stream.on('close', (code, signal) => {
                conn.end();
                if (code === 0) {
                    const vpsInfoMessage = generateVPSInfoMessage(username, password, ip, expirationDate);
                    message.reply(vpsInfoMessage);
                } else {
                    message.reply('Error al crear la cuenta SSH.');
                }
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: process.env.VPS_HOST,
        port: 22,
        username: process.env.VPS_USER,
        password: process.env.VPS_PASSWORD
    });
}

// Iniciar el cliente de WhatsApp
client.initialize();

