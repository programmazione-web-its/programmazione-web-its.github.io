---
layout: post
title: '#16. Come dividere un progetto in componenti'
categories: lezioni
excerpt: Approcci e strategie per suddividere un progetto React in componenti riutilizzabili
featured_image:
---

La divisione in componenti non è solo “spezzettare il codice in più file”, ma organizzare il progetto secondo responsabilità e riuso: bisogna pensare a quali parti dell’interfaccia utente possono essere isolate in componenti indipendenti, che possono essere riutilizzati in diverse parti dell’applicazione o in progetti futuri.

## Come fare 🤔?

### Fase 1: identificare le parti dell'interfaccia utente.

La prima cosa da fare è analizzare la UI per identificare:

- Elementi ripetuti: come bottoni, card, modali, form, ecc;
- sezioni logiche: come header, footer, sidebar, ecc;
- blocchi idipendenti: parti che possono essere isolate senza "rompere" l'app, come una notifica (toast), un tooltip, ecc.

### Fase 2: Separare la logica dalla presentazione.

Separare UI e logica è una buona pratica per mantenere il codice pulito e riutilizzabile. Un approccio comune è usare:

- Componenti "container" (contenitori): gestiscono lo stato, le chiamate API, la logica in generale. Ad esempio: `Dashboard`, `UserProfile`, ecc;
- comopnenti "presentazionali": mostrano dati, ricevono props, non gestiscono logica complessa o lo stato. Ad esempio `Button`, `Card`, `Modal`, ecc.

### Fase 3: stabilire la granularità dei componenti.

Non esiste una regola fissa, ma in generale:

- Componenti **piccoli e riutilizzabili** sono più facili da testare e modificare;
- componenti **complessi** possono combinare componenti più piccoli per creare funzionalità più avanzate.

☝️ **Regola pratica**: se un pezzo di UI può essere usato da solo o in contesti diversi allora è meglio creare un componente separato.

### Fase 4: gestore le props e la "configurabilità" del componente.

Ogni componente dovrebbe essere il più possibile flessibile e configurabile tramite props:

- Valori di default aiutano a semplificare l'uso del componente senza dover specificare ogni volta tutte le props;
- le props consentono di personalizzare il comportamento e l'aspetto del componente senza modificarne il codice interno;
- il **props forwarding** è utile per passare props extra a componenti figli o elementi HTML senza doverle dichiarare tutte manualmente.

### Fase 5: organizzare i file e le cartelle.

Una struttura di cartelle chiara aiuta a mantenere il progetto organizzato. Ecco alcuni approcci comuni:

- **per funzionalità**: raggruppare i componenti per funzionalità (es. `User`, `Dashboard`, `Auth`);
- **per tipo**: raggruppare i componenti per tipo (es. `Buttons`, `Modals`, `Forms`);
- **combinato** (consigliato): una combinazione dei due approcci sopra, ad esempio una cartella `components` con sottocartelle per funzionalità e tipi.

```
src/
  components/
    Button/
      index.jsx
      Button.module.css
    Card/
      index.jsx
      Card.module.css
    Tabs/
      index.jsx
      Tabs.module.css
  layouts/
    MainLayout.jsx
  pages/
    HomePage.jsx
    ProfilePage.jsx
  App.jsx
  index.js
```

## ⚛️ Atomic Design: un approccio alla progettazione dei componenti.

Un metodo (_pattern_) popolare per organizzare i componenti è l'**Atomic Design**, che suddivide i componenti in cinque livelli:

1. **Atomi**: componenti di base, piccoli e indivisibili, come bottoni, input, etichette;
2. **Molecole**: combinazioni di atomi che formano unità funzionali, come un campo di ricerca con un input e un bottone;
3. **Organismi**: gruppi di molecole che formano sezioni distinte dell'interfaccia, come un header con logo, menu di navigazione e barra di ricerca;
4. **Template**: layout di pagina che combinano organismi e definiscono la struttura generale della pagina;
5. **Pagine**: istanze specifiche dei template con contenuti reali.

{% capture highlight %}
☝️ Regola pratica.

- Se un pezzo di UI può essere riutilizzato da solo → atomo.
- Se serve solo combinando altri componenti → molecola o organismo.

{% endcapture %}

{% include highlight.html content=highlight  %}

## ⚠️ Non tutto deve essere un componente!

Quando lavoriamo con React, è importante ricordare che:

- solo la parte dinamica o interattiva dell’interfaccia deve andare nei componenti;
- markup statico (es. header fisso, footer semplice, logo) può rimanere direttamente in index.html;
- questo approccio semplifica il progetto e evita di mettere in componenti cose che non cambiano mai.

💡 Regola pratica: se un elemento non dipende da stato o props e non cambierà mai, può stare fuori dai componenti React.
