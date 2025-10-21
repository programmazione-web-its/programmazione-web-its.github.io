---
layout: progetto
title: '🛍️ FAKESHOP '
date: 2025-09-03 16:48:45 +0200
categories: progetti
featured_image: /assets/images/01.png
github_url: programmazione-web-its/fakeshop
figma: https://www.figma.com/design/qEIgFI7p5PgGbpdVJiQHEg/Fakeshop?node-id=1-11&t=Gu5xontDF8eiRHHu-1
---

Questo progetto è un **mini e-commerce** sviluppato con **React**, **Tailwind CSS** e **classnames**.  
L’obiettivo della **prima fase** è costruire la struttura base dell’applicazione realizzando tutti i componenti fondamentali seguendo fedelmente il design fornito in Figma.

## 🚀 Stack Tecnologico

- **React** – libreria principale per la costruzione dell’interfaccia utente
- **Tailwind CSS** – framework utility-first per la gestione dello stile
- **classnames** – libreria per una gestione più pulita delle classi CSS condizionali

## ⚙️ Installazione

Clona il repository e installa le dipendenze:

```bash
git clone <URL_DEL_REPO>
cd <NOME_CARTELLA>
npm install
```

Avvia il server di sviluppo:

```bash
npm run dev
```

## 🧩 Componenti da implementare

All’interno dello starter sono già presenti i file dei seguenti componenti, attualmente vuoti:

- `Header`

- `Shop`

- `CartModal`

- `Cart`

- `Button`

- `Product`

Durante questa fase, dovranno essere sviluppati rispettando il design fornito nel link Figma (vedi sotto).

## 🗂️ Dati e struttura temporanea

Nel percorso:

```bash
/src/data/products.js
```

è presente un **dummy di prodotti** che verrà utilizzato per popolare temporaneamente lo shop.
In una fase successiva, questi dati saranno sostituiti da una **fetch a un’API reale**.

## 🎨 Design

Il design completo del progetto è disponibile su Figma:
👉 [Link al file Figma](https://www.figma.com/design/qEIgFI7p5PgGbpdVJiQHEg/Fakeshop?node-id=0-1&t=uXtfLWnnLm8wWoXO-1)

## 📁 Struttura del progetto (indicativa)

```bash
src/
 ├─ components/
 │   ├─ Header.jsx
 │   ├─ Shop.jsx
 │   ├─ CartModal.jsx
 │   ├─ Cart.jsx
 │   ├─ Button.jsx
 │   └─ Product.jsx
 ├─ data/
 │   └─ products.js
 ├─ App.jsx
 ├─ index.css
 └─ main.jsx
```
