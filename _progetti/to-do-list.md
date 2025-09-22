---
layout: progetto
title: 'To do list'
date: 2025-09-03 16:48:45 +0200
categories: progetti
featured_image: /assets/images/01.png
github_url: https://github.com/programmazione-web-its/to-do-list
final_url: https://tododemo-black.vercel.app/
---

## Descrizione del progetto

Una semplice applicazione web per gestire una lista di cose da fare (to-do list), sviluppata con React. L'app permette di aggiungere, modificare, completare e rimuovere attività dalla lista oltre a visualizzare il numero di attività totali e quelle completate e a filtrare le attività in base al loro stato (tutte, attive, completate).

## Funzionalità principali

- Aggiunta di nuove attività alla lista;
- Modifica del testo delle attività esistenti;
- Completamento delle attività (con una spunta);
- Rimozione delle attività dalla lista;
- Visualizzazione del numero totale di attività e di quelle completate;
- Filtraggio delle attività in base al loro stato (tutte, attive, completate).

## Componenti principali

- `App`: il componente principale che gestisce lo stato dell'applicazione e rende gli altri componenti;
- `TodoList`: un componente che visualizza la lista delle attività e gestisce le azioni sugli elementi della lista;
- `TodoItem`: un componente che rappresenta una singola attività nella lista, con funzionalità per modificarla, completarla o rimuoverla;
- `FilterButtons`: un componente per filtrare le attività in base al loro stato (tutte, attive, completate);
- `TodoStats`: un componente che mostra il numero totale di attività e di quelle completate;

## ✋ Prima di iniziare

Dal momento che il focus del corso non è il CSS, per questo progetto utilizzeremo [Tailwind CSS](https://tailwindcss.com/) per lo stile.

Seguiamo i passaggi indicati nella [documentazione ufficiale](https://tailwindcss.com/docs/installation/using-vite) per installarlo.

Una volta installato, facciamo un po' di pulizia nel css della nostra app, rimuovendo tutto il contenuto di `index.css` e lasciando solo le direttive di Tailwind:

```css
@import 'tailwindcss';
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```
