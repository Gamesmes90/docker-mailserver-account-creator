# Docker mailserver Account Creator
This is a small node js application to interface with the setup.sh file of [docker-mailserver](https://github.com/docker-mailserver/docker-mailserver).

It allows the user to create an account without having to go through the server administrator.

## How it works
1. Upon connecting the user will be prompted to create an account by prompting username (without the mail domain) and password.
2. If everything went ok a confirmation message will appear with credentials for setting up the mail client.

## ENV
- DOMAIN: mail domain
- SMTP: smtp domain
- IMAP: imap domain
- SMTP_PORTS: info about ports of smtp server
- IMAP_PORTS: info about ports of imap server
- SMTP_SEC: info about security of smtp server
- IMAP_SEC: info about security of imap server
- PORT: port to deploy to (Default: 3006)

## Build
Make sure you have node 18 (nvm recommended)
```
nvm install 18
nvm use 18
```
run npm
```
npm ci
```
Get pkg if you don't have it
```
npm install pkg -g
```
Then run pkg
```
pkg .
```
or use npm with build-linux-arm64 or build-linux-x64
```
npm run build-linux-x64
npm run build-linux-arm64
```

By default, this program must run in a subdirectory of the folder of setup.sh and in the same directory as .env

## Nginx proxy
Example nginx proxy config
```
location /folder_name/ {
    proxy_pass http://localhost:3006/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;         
}
```
