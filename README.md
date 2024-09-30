
## Comandos

1. Instalar:

```bash
sudo apt ubdate
sudo apt upgrade
sudo apt install git
```
## Instalación
2.Clona el repositorio:
   ```bash
   git clone https://github.com/SINNOMBRE22/ssh-bot.git
   cd ssh-bot
   npm install
   ```

## instala node
```bash

apt install nodejs

 node -v #verificamos la versión de node

 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

 source ~/.nvm/nvm.sh

 nvm --version

 nvm ls-remote

 nvm install 22.6.0   #o superior
```

## Despues de tener todos los packs instalados en la VPS solo usen estos comandos para comenzar

```bash
 git clone https://github.com/SINNOMBRE22/ssh-bot

cd ssh-bot

npm install
```

## Y Antes De Iniciar El Bot Creá una carpeta llamada .env Y Pega La siguiente información Reemplazando con los datos de tu VPS

```bash
VPS_HOST=tu-ip  # Reemplaza con la IP de tu VPS
VPS_USER=root         # Si usas otro usuario, cámbialo aquí
VPS_PASSWORD=password # Pon la contraseña de tu VPS
```
## INICIA EL BOT
```bash
node bot.js
```
## Ejecutar el bot estable con PM2

1.- instalar PM2 en VPS :
```bash

> npm install -g pm2

```  

2.- Ejecutar el bot en PM2 :

```bash

> pm2 start bot.js --name "vps-user"

```
3.- Visualizar proceso en PM2 :
```bash 

> pm2 monit
[ ! ] Para salir del monitor usa la combinación de CTRL + c
```

4.- Eliminar PM2 para el bot :
```bash

> pm2 kill
```

## Comentarios ó sugerencias :3


##Si encuentran algun error me comentan ;)

　　☟☟☟☟ Toca El Boton ☟☟☟☟

[![Enviar WhatsApp](https://img.shields.io/badge/Enviar%20WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/message/BSE4ZCEPY7ZOP1)

```
