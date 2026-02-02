---
layout: post
title: "#47. Next.js - Un'introduzione"
categories: lezioni
excerpt: Introduzione a uno dei framework React più usati per la creazione di una full-stack App
featured_image:
---

## Cos'è Next.js

{% capture standardcontent %}
Next.js è un **framework** di React usato per la creazione di applicazioni web full-stack: si utilizzano i componenti React per la realizzazione delle interfacce e Next.js per aggiungere funzionalità e ottimizzazione al progetto, come ad esempio il **server-side rendering** e la **generazione statica**.

Next.js è un framework front-end che **estende le capacità di React**. Ciò che lo distingue è la sua capacità di **semplificare aspetti complessi** dello sviluppo web fornendo una suite completa di strumenti e funzionalità, tra cui:

Una delle funzionalità fondamentali che Next.js offre è, appunto il **server-side rendering (rendering lato server)** che migliora in maniera significativa le performance dell'app e la SEO. Questo significa che i siti web costruiti con Next.js **si caricano più velocemente** e **si posizionano meglio** nei risultati di ricerca.

Un'altra feature chiave è la **static site generation (generazione statica)**: questa funzionalità **pre-genera i file durante la fase di build**,permettendo che vengano serviti immediatamente **senza** dover **aspettare il caricamento dei dati**. I file vengono poi distribuiti globalmente garantendo tempi di caricamento ancora più rapidi.

{% endcapture %}

{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Documentazione ufficiale di Next.js](https://nextjs.org/docs)
  - 🔗 [Apprfondimento su SSR](https://www.sanity.io/glossary/server-side-rendering)
  - 🔗 [Approfondimento su SSG](https://www.freecodecamp.org/news/static-site-generation-with-nextjs/)
  - 🔗 [Approfondimento su ISG](https://dev.to/remejuan/understanding-incremental-static-generation-in-nextjs-a-practical-guide-11ff)
  - 🔗 [Come strutturare il progetto](https://nextjs.org/docs/app/getting-started/project-structure)
  - 🔗 [File-system conventions](https://nextjs.org/docs/app/api-reference/file-conventions)
  {% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

Next.js offre anche la **incremental static generation (rigenerazione statica incrementale)**, che combina la generazione statica con aggiornamenti dinamici per gli elementi che non sono stati generati staticamente o che sono cambiati dalla loro prima generazione.

## Caratteristiche principali di Next.js

#### Approccio innovativo al rendering

- **Server-side rendering (SSR)**: permette di recuperare i dati al momento della richiesta, migliorando le prestazioni e le capacità SEO;
- **Static Site Generation (SSG)**: genera i file al momento della compilazione e li serve in anticipo, migliorando la velocità di caricamento.

#### Code-splitting automatico

Next.js eccelle 🔥 nel _code-splitting_, che assicura che venga caricato solo il codice necessario per ogni pagina, rendendo le applicazioni più veloci ed efficienti. Questa caratteristica migliora significativamente i tempi di risposta portando a una migliore esperienza utente.

#### Tooling JavaScript preconfigurato

Next.js offre strumenti JavaScript preconfigurati basati su Rust per build più veloci, mantenendo un'esperienza di sviluppo di alta qualità.

### Il Server Side Rendering - SSR

Il SSR è una tecnica di sviluppo web che genera il markup HTML della pagina **lato server** e di **inviarla** al browser dell'utente quanto questo la richiede: è il server a lavorare dietro le quinte per la creazione della pagina.
In Next.js, ma non solo, se la pagina usa il SSR il suo codice HTML verrà generato **ad ogni richiesta**

### La Static Site Generation - SSG

Questa tecnica permette di **pre-generare tutte le pagine HTML in fase di compilazione** piuttosto che al momento della richiesta dell'utente, come avviene invece con il SSR, o tramite esecuzione di script lato client, come avviene in una SPA. Questo significa che quando l'utente visita il sito, **il server invierà direttamente le pagine HTML** statiche già pronte all'uso, senza necessità di eseguire rendering o di chiamare il backend al momento della richiesta.
☝️ Essendo statiche, le pagine, una volta generate, **rimangono così come sono state compilate in fase di generazione**, fino alla generazione successiva.

### L'Incremental Static Regeneration - ISR

L'ISR è una tecnica che permette di aggiornare pagine statice dopo che queste sono state generate, **senza dover rifare la build** dell'intera applicazione. Quando usiamo l'ISR, Next.js serve una pagina statica **pre-generata dalla cache** e la rigenera **in background quando viene raggiunto uno specifico intervallo di `revalidate`**. Questo significa che gli utenti ricevono sempre una versione pronta da servire senza ritardi, mentre il nuovo contenuto viene preparato automaticamente in background. In altre parole: con l'ISR, il primo utente che visita la pagina dopo l'intervallo di `revalidate` riceve comunque la versione cached (veloce), ma nel frattempo Next.js avvia la rigenerazione della pagina. **Il prossimo utente che visiterà la pagina riceverà la versione aggiornata.**
