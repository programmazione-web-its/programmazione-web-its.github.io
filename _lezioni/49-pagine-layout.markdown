---
layout: post
title: '#49. I Layout'
categories: lezioni
excerpt: Lavorare con page e layout in Next.js
featured_image:
---

## Il file layout.js

`page.js` non è l'unico file _speciale_ in Next.js, esiste anche `layout.js` .
Come `page.js` , anche `layout.js` è un **nome riservato** e, come indica la parola, definisce il layout , la cornice, all'interno del quale la pagina `page.js` dev'essere renderizzata.

In ogni progetto Next.js dev'esserci **almeno un layout.js** che:

- deve stare nella root della cartella `app/`;
- deve chiamarsi `RootLayout`;
- si applica \*_a tutte_ le pagine del sito.

Senza un Root Layout, Next.js non è in grado di costruire la struttura HTML base del sito.

## Layout specifici

Naturalmente, possiamo creare layout specifici per diverse sezioni del sito e lo facciamo in modo analogo alla creazione delle pagine:

```
app/
 ├─ layout.js         ← Root layout
 ├─ page.js
 └─ about/
     ├─ page.js
     └─ layout.js     ← Layout valido solo per “about”
```

I **layout sono**, come le pagine, dei **componenti** a tutti gli effetti che, però, hanno qualcosa di speciale:

- solo in RootLayout possiamo (e dobbiamo) inserire i tag `<html>` e `<body>`;
- nei componenti annidati, quelli specifici per le pagine, inseriremo solo le parti interne al body;

Per il resto, usiamo `children` come in un normale componente: qui rappresenterà il contenuto della pagina attualmente attiva. Se siamo u `/about` il `children` sarà il JSX di `about/page.js`.

{% capture highlight %}

### Dov'è il tag `<head>`?

Nel Root Layout non vediamo un tag `<head>`. Perché in Next.js la gestione dell'`<head>` è \*_automatizzata_: per impostare titolo e metadati si usa una variabile speciale:

```js
export const metadata = {
  title: 'My Page',
  description: 'A beautiful page',
}
```

`metatada` è un nome riservato, che viene letto da Next.js per compilare automaticamente l'`<head>` e va applicato a tutte le pagine che usano quel layout.

{% endcapture %}

{% include highlight.html content=highlight  %}
