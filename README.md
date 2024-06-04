# PHOTO UPLOAD APP
L'applicazione è in sè molto semplice, contiene una CRUD per la gestione di file image. 
Per runnare l'applicazione in locale è sufficiente:

### Docker

Aprire l'applicazione docker ed eseguire il seguente comando da terminale:

```bash
docker-compose up -d
```

Se si desidera vedere i processi avviati:

```bash
docker ps
```

Se si desidera arrestare i processi:

```bash
docker-compose down -v
```
### Server Python

Lavorando con dei file, è necessario avere un server che funge da storage. Ho utilizzato a questo scopo un semplice server python, il comando per runnarlo è il seguente (assicurarsi di avere installato python3):

```bash
python -m http.server 8000
```

### Avvio BackEnd

Installare i pacchetti necessari:

```bash
npm install
```

Assicurarsi di avviare prima il backend in locale, essendo la porta standard già definita:

```bash
npm run start
```

Se si desidera vedere i log 'real time':

```bash
npm run start:dev
```
### Avvio FrontEnd

Installare i pacchetti necessari:

```bash
npm install
```

Assicurarsi di avviare prima il backend in locale, essendo la porta standard già definita:

```bash
npm run start
```