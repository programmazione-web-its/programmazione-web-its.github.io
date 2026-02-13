---
layout: post
title: '#02. Creare un progetto React'
categories: lezioni
excerpt: 'Come creare un nuovo progetto React da zero'
featured_image: /assets/images/fallback.webp
---

## 🛠️ Cosa ci serve?

{% capture standardcontent %}
Per installare un progetto React in localce, ci servono:

- [Node.js](https://nodejs.org/en/) (versione 14 o superiore) e npm (viene installato automaticamente con Node.js);
- Un tool per creare il progetto, come [Vite](https://vitejs.dev/) o [Create React App](https://create-react-app.dev/);
- Un editor di codice, come [Visual Studio Code](https://code.visualstudio.com/).

**Node.js è un ambiente di esecuzione** che permette di utilizzare **JavaScript al di fuori del browser.** Normalmente JavaScript nasce per funzionare lato client, cioè all’interno delle pagine web; con Node, invece, possiamo eseguire codice JavaScript direttamente sul nostro computer. Questo è fondamentale quando lavoriamo con strumenti come Vite o Create React App, perché sono programmi che girano nel terminale e hanno bisogno di un motore capace di **interpretare JavaScript anche lato server.**

Oltre a questo, Node.js include **npm (Node Package Manager)**, il gestore di pacchetti che ci permette di installare librerie e dipendenze necessarie al progetto. Quando eseguiamo comandi come `npm install` o `npm run dev`, stiamo usando proprio npm per scaricare moduli, gestire script e avviare il server di sviluppo. In pratica, Node non serve solo per creare applicazioni backend, ma è uno strumento essenziale anche nello sviluppo front-end moderno, perché rende possibile l’utilizzo di build tool, bundler e framework come React in ambiente locale.
{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Documentazione ufficiale di React per l'installazione](https://react.dev/learn/installation)
  - Per far partire un progetto React sul browser, possiamo digitare nella barra degli indirizzi `react.new` e premere invio: in automatico verrà creato un nuovo progetto React su [CodeSandbox](https://codesandbox.io/), un ambiente di sviluppo online.
  - 🔗 [Documentazione ufficiale di Vite](https://vitejs.dev/guide/)
  - 🔗 [Documentazione ufficiale di Create React App](https://create-react-app.dev/docs/getting-started/)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

### <img class="img-logo" src="/assets/images/vite.svg" alt="Vite Logo" /> Creare un progetto React con **Vite**

- Dopo aver installato Node.js, apriamo il terminale o da computer o da Visual Studio Code;
- Spositiamoci nella cartella in cui vogliamo creare il progetto, ad esempio `cd ~/Documenti/Progetti`;
- Digitiamo il comando per creare un nuovo progetto con Vite:

  ```bash
  npm create vite@latest my-app // ci permette di scegliere template e configurazione
  ```

  oppure direttamente:

  ```bash
  npm create vite@latest my-app -- --template react // per creare un progetto React già configurato con JS
  ```

  Dove `my-app` è il nome che vogliamo dare alla cartella del progetto;

- Una volta che il comando è terminato, ci spositamo nella cartella del progetto con `cd my-app`;
- Installiamo le dipendenze del progetto con: `npm install`;
- Avviamo il server di sviluppo con: `npm run dev`;
- Apriamo il browser e andiamo all'indirizzo `http://localhost:5173/` (o quello indicato nel terminale) per vedere il progetto in esecuzione.
  <br/>
  <br/>

#### Ok, ma che cos'è Vite?

Vite è un **build tool** e **dev server** moderno pensato per velocizzare lo sviluppo di applicazioni web. In pratica:

- **Build tool**: trasforma il codice che scriviamo (JSX, TypeScript, moduli separati, ecc.) in file ottimizzati che il browser può eseguire. Anche durante lo sviluppo, Vite compila il nostro codice al volo mentre lo modifichiamo;
- **Dev server**: fornisce un server locale dove testare l'applicazione in tempo reale. Quando modifichiamo un file, Vite lo ricarca automaticamente nel browser (Hot Module Replacement, HMR) senza perdere lo stato della pagina;
- **Moderno e veloce**: Vite usa ESBuild come engine di compilazione, che è scritto in Go e molto più veloce dei bundler tradizionali come Webpack. Questo rende i tempi di avvio e di aggiornamento molto rapidi.

Insomma, **Vite semplifica lo sviluppo** trasformando e servendo il codice in modo efficiente e permettendoci di vedere i cambiamenti quasi istantaneamente nel browser.

#### Che cos'è Create React App?

Create React App (CRA) è un **tool ufficiale creato da Facebook (Meta)** per velocizzare la creazione di progetti React. In pratica:

- **Zero-config starter**: CRA fornisce una configurazione predefinita e completa, senza bisogno di toccare file di configurazione complessi. È pensato per chi vuole iniziare subito senza dover imparare Webpack, Babel e altri tool di build.
- **Build e dev server integrati**: Come Vite, CRA include un dev server con hot reload e un sistema di build ottimizzato. Quando eseguiamo `npm run dev` o `npm start`, il progetto parte automaticamente nel browser.
- **Convention over configuration**: CRA enforce una struttura di cartelle e convenzioni specifiche, il che rende i progetti creati con questo tool molto simili tra loro e più facili da mantenere per team grandi.
- **Maturità e stabilità**: CRA è stato uno dei primi tool di questo tipo ed è molto stabile, sebbene il progetto sia meno attivo oggi rispetto al passato.

In breve: **Create React App è ideale per chi vuole partire velocemente** con una configurazione già pronta, senza preoccuparsi dei dettagli interni della build.

### <img class="img-logo" src="/assets/images/react-app.svg" alt="React App Logo" /> Creare un progetto React con **Create React App**

- Dopo aver installato Node.js, apriamo il terminale o da computer o da Visual Studio Code;
- Spositiamoci nella cartella in cui vogliamo creare il progetto, ad esempio `cd ~/Documenti/Progetti`;
- Digitiamo il comando per creare un nuovo progetto con Vite:

  ```bash
  npx create-react-app my-app
  ```

  Dove `my-app` è il nome che vogliamo dare alla cartella del progetto;

- Una volta che il comando è terminato, ci spositamo nella cartella del progetto con `cd my-app`;
- Installiamo le dipendenze del progetto con: `npm run dev`;
- Apriamo il browser e andiamo all'indirizzo `http://localhost:3000/` (o quello indicato nel terminale) per vedere il progetto in esecuzione.
  <br/>
  <br/>

## 🤔 Quali sono le principali differenza tra Vite e CRA?

- **Velocità**: Vite è generalmente più veloce di CRA, specialmente per progetti di grandi dimensioni, grazie al suo sistema di build basato su ESBuild;
- **Configurabilità**: Vite offre una maggiore flessibilità e configurabilità rispetto a CRA, permettendo agli sviluppatori di personalizzare facilmente la configurazione del progetto;
- **Comunità e ecosistema**: CRA ha una comunità più grande e un ecosistema più maturo, essendo stato rilasciato prima di Vite ma il progetto è fermo da tempo;
- **Aggiornamenti**: Vite tende a ricevere aggiornamenti più frequenti e innovativi rispetto a CRA, che è più stabile ma meno dinamico.

In generale, Vite è spesso preferito per nuovi progetti grazie alla sua velocità e flessibilità, mentre CRA può essere una scelta solida per progetti esistenti o per sviluppatori che preferiscono una configurazione più semplice e standardizzata.

## 🤨 Perché ci servono tutti questi strumenti per avviare un progetto React?

Perché non possiamo semplicemente creare dei film HTML e includere del JS? Non possiamo perché React utilizza una **sintassi speciale** chiamata **JSX** che non è supportata nativamente dai browser. JSX, acronimo di Javascript Syntax eXtension permette di scrivere componenti React in modo più intuitivo, ma deve essere **trasformata in JavaScript standard prima di poter essere eseguita.**
I tools che installiamo (come Vite o CRA) si occupano di questa trasformazione, oltre a gestire altre funzionalità come il bundling, il live reloading e l'ottimizzazione delle performance.
