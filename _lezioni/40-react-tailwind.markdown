---
layout: post
title: '#40. Tailwind CSS in React'
categories: lezioni
excerpt: Dare stile ai componenti React con Tailwind CSS, il framework CSS basato sulle classi di utilità.
featured_image:
---

{% capture standardcontent %}

Finora abbiamo dato stile ai nostri componenti scrivendo CSS "classico": inventiamo un nome di classe, lo assegniamo con `className` e poi scriviamo le regole in un file `.css` separato. Funziona, ma man mano che il progetto cresce ci troviamo a saltare continuamente tra il file JSX e il file CSS, a inventare nomi (`card`, `card-wrapper`, `card-inner`...) e a ritrovarci con file CSS enormi, pieni di regole che non sappiamo più se vengono usate. **Tailwind CSS** propone un approccio diverso.

## Cos'è Tailwind CSS?

Tailwind è un framework CSS **utility-first**: invece di scrivere le nostre regole CSS, usiamo direttamente nel JSX tante piccole classi già pronte, ognuna delle quali fa **una sola cosa**.

```jsx
// CSS classico
<button className='btn-primary'>Salva</button>
```

```css
.btn-primary {
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border-radius: 8px;
}
.btn-primary:hover {
  background-color: #1d4ed8;
}
```

```jsx
// Tailwind
<button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
  Salva
</button>
```

Il risultato è identico, ma con Tailwind **non abbiamo scritto una riga di CSS**: ogni classe corrisponde a una singola proprietà (`px-4` = padding orizzontale, `bg-blue-600` = colore di sfondo, `rounded-lg` = bordi arrotondati...).

{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Tailwind CSS - Documentazione ufficiale](https://tailwindcss.com/docs)
  - 👀 [Tailwind Play - editor online per fare prove](https://play.tailwindcss.com/)
  - 🧩 [Estensione Tailwind CSS IntelliSense per VS Code](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

{% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

## Come installare Tailwind in un progetto Vite

In un progetto React creato con Vite, l'installazione richiede tre passaggi.

**1. Installiamo i pacchetti**

```bash
npm install tailwindcss @tailwindcss/vite
```

**2. Aggiungiamo il plugin nel file `vite.config.js`**

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**3. Importiamo Tailwind nel file CSS principale**

Apriamo `src/index.css`, cancelliamo tutto il contenuto e scriviamo solo:

```css
/* src/index.css */
@import 'tailwindcss';
```

Assicuriamoci che `index.css` sia importato in `main.jsx` (nei progetti Vite lo è già di default), riavviamo il server con `npm run dev` e siamo pronti.

Per verificare che funzioni, proviamo a modificare `App.jsx`:

```jsx
function App() {
  return <h1 className='text-3xl font-bold text-blue-600'>Ciao Tailwind!</h1>
}
```

Se il titolo appare grande, in grassetto e blu, Tailwind è installato correttamente.

{% capture highlight %}

### ☝️ Installate l'estensione per VS Code!

Con Tailwind dobbiamo ricordare molti nomi di classi, almeno all'inizio. L'estensione **Tailwind CSS IntelliSense** per VS Code ci suggerisce le classi mentre scriviamo, ci mostra il CSS corrispondente passando il mouse sopra una classe e ci segnala gli errori. È praticamente indispensabile.

{% endcapture %}
{% include highlight.html content=highlight %}

## Come sono fatte le classi

I nomi delle classi di Tailwind seguono uno schema abbastanza regolare: di solito sono formati da **proprietà** + **valore**.

### Spaziature: `margin` e `padding`

| Classe    | CSS corrispondente                                      |
| --------- | ------------------------------------------------------- |
| `p-4`     | `padding: 1rem` (16px)                                  |
| `px-4`    | `padding-left` e `padding-right: 1rem`                  |
| `py-2`    | `padding-top` e `padding-bottom: 0.5rem`                |
| `pt-2`    | `padding-top: 0.5rem`                                   |
| `m-4`     | `margin: 1rem`                                          |
| `mx-auto` | `margin-left` e `margin-right: auto` (centra un blocco) |
| `mb-6`    | `margin-bottom: 1.5rem`                                 |

Le lettere dopo `p` e `m` indicano la direzione: `t` (top), `r` (right), `b` (bottom), `l` (left), `x` (orizzontale), `y` (verticale). Il numero segue una **scala**: ogni unità vale `0.25rem`, cioè 4px. Quindi `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, `p-8` = 32px.

### Colori

I colori si usano con il formato `proprietà-colore-intensità`, dove l'intensità va da `50` (chiarissimo) a `950` (scurissimo):

```jsx
<p className='text-gray-700'>Testo grigio scuro</p>
<div className='bg-red-100 text-red-800'>Messaggio di errore</div>
<div className='border border-green-500'>Bordo verde</div>
```

Esistono anche `white`, `black` e `transparent`: `bg-white`, `text-black`.

### Testo

```jsx
<h1 className='text-4xl font-bold'>Titolo</h1>
<p className='text-sm text-gray-500 italic'>Didascalia</p>
<p className='text-center uppercase tracking-wide'>Testo centrato</p>
```

Le dimensioni vanno da `text-xs` a `text-9xl`, passando per `text-sm`, `text-base` (la dimensione normale), `text-lg`, `text-xl`, `text-2xl`...

### Dimensioni, bordi e ombre

```jsx
<img className='w-full h-48 object-cover rounded-xl shadow-md' src={poster} />
<div className='w-64 max-w-full border-2 border-gray-200 rounded-lg'>...</div>
```

- `w-` e `h-` per larghezza e altezza (`w-64`, `w-full`, `w-1/2`, `h-screen`);
- `rounded`, `rounded-lg`, `rounded-full` per i bordi arrotondati;
- `border`, `border-2` per lo spessore del bordo, `border-gray-200` per il colore;
- `shadow-sm`, `shadow-md`, `shadow-lg` per le ombre.

### Flexbox e Grid

Le classi per il layout sono tra le più usate:

```jsx
// elementi affiancati, centrati verticalmente, con spazio tra loro
<nav className='flex items-center justify-between gap-4'>
  <Logo />
  <Menu />
</nav>

// una griglia a 3 colonne
<div className='grid grid-cols-3 gap-6'>
  {movies.map((movie) => (
    <MovieCard key={movie.id} {...movie} />
  ))}
</div>
```

### Valori personalizzati

Se ci serve un valore che non è presente nella scala di Tailwind, possiamo scriverlo tra **parentesi quadre**:

```jsx
<div className='w-[60px] h-[60px] bg-[#ff6b35] top-[117px]'>...</div>
```

È comodo per i casi particolari, ma va usato con moderazione: se ci accorgiamo di usare sempre gli stessi valori personalizzati, è meglio aggiungerli al tema (lo vediamo più avanti).

## Gli stati: hover, focus e gli altri

Per applicare uno stile solo in un certo **stato** dell'elemento, aggiungiamo un **prefisso** alla classe, seguito da `:`:

```jsx
<button className='bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50'>
  Salva
</button>

<input className='border border-gray-300 focus:border-blue-500 focus:outline-none' />
```

| Prefisso           | Quando si applica                         |
| ------------------ | ----------------------------------------- |
| `hover:`           | quando il mouse è sopra l'elemento        |
| `focus:`           | quando l'elemento ha il focus (es. input) |
| `active:`          | mentre l'elemento viene cliccato          |
| `disabled:`        | quando l'elemento è disabilitato          |
| `first:` / `last:` | sul primo / ultimo elemento di una lista  |

## Responsive design

Anche per il responsive si usano i prefissi. Tailwind è **mobile-first**: le classi senza prefisso valgono per **tutti gli schermi**, quelle con prefisso valgono **da quella larghezza in su**.

| Prefisso | Si applica da... |
| -------- | ---------------- |
| `sm:`    | 640px            |
| `md:`    | 768px            |
| `lg:`    | 1024px           |
| `xl:`    | 1280px           |
| `2xl:`   | 1536px           |

```jsx
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
  {movies.map((movie) => (
    <MovieCard key={movie.id} {...movie} />
  ))}
</div>
```

Si legge così: **1 colonna** di base (smartphone), **2 colonne** da 768px in su (tablet), **4 colonne** da 1024px in su (desktop). Senza scrivere nessuna media query.

{% capture highlight %}

### ☝️ Mobile-first: si parte dal piccolo

Un errore comune è pensare che `md:` significhi "solo sui tablet". In realtà significa "**dai tablet in su**". Per questo si scrivono prima gli stili per lo smartphone (senza prefisso) e poi si aggiungono le modifiche per gli schermi più grandi.

```jsx
// visibile su smartphone, nascosto da 768px in su
<p className='md:hidden'>...</p>

// nascosto su smartphone, visibile da 768px in su
<p className='hidden md:block'>...</p>
```

{% endcapture %}
{% include highlight.html content=highlight %}

## Classi dinamiche in React

In React capita spesso di dover cambiare le classi in base allo **stato** o alle **props**. Con Tailwind si fa esattamente come abbiamo già visto per le classi dinamiche, con l'operatore ternario e i template literal:

```jsx
function MovieCard({ title, favorite }) {
  return (
    <article
      className={`p-4 rounded-lg border ${
        favorite ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'
      }`}
    >
      <h2 className='text-lg font-semibold'>{title}</h2>
    </article>
  )
}
```

{% capture highlight %}

### ⚠️ Attenzione: le classi vanno scritte per intero!

Tailwind non include nel CSS finale tutte le sue classi (sarebbero migliaia), ma **legge i nostri file** e genera solo quelle che trova scritte. Questo significa che **non possiamo costruire i nomi delle classi "a pezzi"**:

```jsx
// ❌ NON funziona: Tailwind non trova né "bg-red-500" né "bg-green-500" nel codice
<div className={`bg-${color}-500`}>...</div>

// ✅ funziona: le classi sono scritte per intero
<div className={color === 'red' ? 'bg-red-500' : 'bg-green-500'}>...</div>
```

Se le varianti sono tante, una soluzione ordinata è usare un oggetto:

```jsx
const colors = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
}

<div className={colors[color]}>...</div>
```

{% endcapture %}
{% include highlight.html content=highlight %}

## La modalità scura

Con il prefisso `dark:` possiamo definire gli stili da usare quando è attiva la modalità scura:

```jsx
<div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
  ...
</div>
```

Di default, `dark:` segue le **impostazioni del sistema operativo** dell'utente. Se invece vogliamo attivare la modalità scura con un pulsante, come nel `ThemeSwitcher` della lezione sui custom hooks, dobbiamo dire a Tailwind di guardare una classe `dark` sull'elemento principale. Lo facciamo nel file CSS:

```css
/* src/index.css */
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));
```

Ora le classi `dark:` si attivano quando un elemento (o uno dei suoi antenati) ha la classe `dark`:

```jsx
function App() {
  const [dark, toggleDark] = useToggle()

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
        <button onClick={toggleDark}>{dark ? '☀' : '☾'}</button>
        <p>Il tema cambia al click!</p>
      </div>
    </div>
  )
}
```

## Personalizzare il tema

Tailwind ha già una palette di colori, font e spaziature, ma quasi sempre un progetto reale ha i **propri colori** (quelli del brand, del cliente...). Possiamo aggiungerli nel file CSS con la direttiva `@theme`:

```css
/* src/index.css */
@import 'tailwindcss';

@theme {
  --color-brand: #ff6b35;
  --color-brand-dark: #c44d1f;
  --font-display: 'Poppins', sans-serif;
}
```

Tailwind crea automaticamente le classi corrispondenti, che possiamo usare come quelle predefinite:

```jsx
<h1 className='font-display text-brand'>MovieHub</h1>
<button className='bg-brand hover:bg-brand-dark text-white'>Scopri</button>
```

## E se le classi diventano troppe?

Guardando il codice scritto con Tailwind, la prima impressione è spesso: "_quante classi!_". È normale, ed è il compromesso di questo approccio. Ma in React abbiamo già lo strumento giusto per non ripeterle: i **componenti**.

Se lo stesso pulsante compare in dieci punti, non copiamo dieci volte le stesse classi: creiamo un componente `Button` e le scriviamo **una sola volta**.

```jsx
// src/components/Button.jsx
function Button({ children, variant = 'primary', ...props }) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
  }

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

```jsx
<Button onClick={handleSave}>Salva</Button>
<Button variant='secondary' onClick={handleCancel}>Annulla</Button>
```

☝️ Esiste anche la direttiva `@apply`, che permette di raggruppare delle classi di Tailwind in una classe CSS (`.btn { @apply px-4 py-2 rounded-lg; }`), ma in un progetto React è quasi sempre meglio creare un componente: è il modo in cui React ci chiede di riutilizzare il codice.

## Tailwind: pro e contro

| ✅ Pro                                                       | ❌ Contro                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| non serve inventare nomi di classi                           | il JSX diventa più lungo e, all'inizio, meno leggibile       |
| gli stili sono dentro il componente: niente salti tra file   | c'è una "nuova lingua" da imparare (i nomi delle classi)     |
| scala di spaziature e colori già pronta: design più coerente | serve comunque conoscere il CSS: Tailwind non lo sostituisce |
| responsive e stati senza scrivere media query o selettori    |                                                              |
| il CSS finale contiene solo le classi che usiamo davvero     |                                                              |

☝️ L'ultimo punto dei contro è il più importante: `flex`, `justify-between`, `grid-cols-3` sono solo nomi più corti per proprietà CSS. **Se non sappiamo come funziona il CSS, Tailwind non ci aiuta**: ci aiuta a scriverlo più velocemente.

## Che differenza c'è con Bootstrap?

Anche **Bootstrap** è un framework CSS molto diffuso, ma parte da un'idea opposta. Bootstrap è **component-based**: ci fornisce dei **componenti già pronti** (pulsanti, card, navbar, modali, form...), ognuno con il suo stile. Tailwind, invece, non ci dà nessun componente: ci dà i "mattoncini" per costruirli noi.

Vediamo la stessa card scritta nei due modi:

```jsx
// Bootstrap
<div className='card'>
  <img src={poster} className='card-img-top' />
  <div className='card-body'>
    <h5 className='card-title'>{title}</h5>
    <p className='card-text'>{year}</p>
    <a href='#' className='btn btn-primary'>Dettagli</a>
  </div>
</div>
```

```jsx
// Tailwind
<div className='rounded-lg border border-gray-200 overflow-hidden shadow-sm'>
  <img src={poster} className='w-full h-48 object-cover' />
  <div className='p-4'>
    <h5 className='text-lg font-semibold mb-1'>{title}</h5>
    <p className='text-gray-500 mb-3'>{year}</p>
    <a href='#' className='inline-block px-4 py-2 bg-blue-600 text-white rounded-lg'>
      Dettagli
    </a>
  </div>
</div>
```

Con Bootstrap bastano poche classi (`card`, `card-body`, `btn btn-primary`) e la card è già stilizzata: è **più veloce** per partire. Con Tailwind scriviamo più classi, ma **decidiamo noi ogni dettaglio**: dimensioni, colori, spaziature, bordi.

La conseguenza più visibile è che i siti fatti con Bootstrap tendono ad **assomigliarsi tutti**, perché usano gli stessi componenti. Si possono personalizzare, ma spesso significa "combattere" contro gli stili di Bootstrap, sovrascrivendoli. Con Tailwind, invece, non c'è uno stile di partenza da sovrascrivere: il design è quello che costruiamo.

☝️ Bootstrap ha anche delle classi di utilità (`d-flex`, `mt-3`, `text-center`...), molto simili a quelle di Tailwind. La differenza è nel punto di partenza: in Bootstrap le utility sono un aiuto in più rispetto ai componenti, in Tailwind sono **l'unico strumento**.

|                          | Bootstrap                                               | Tailwind                                             |
| ------------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Approccio                | **component-based**: componenti già pronti              | **utility-first**: classi piccole da combinare       |
| Velocità per partire     | molto alta: la UI è già fatta                           | serve costruire i componenti                         |
| Libertà nel design       | limitata: i siti tendono ad assomigliarsi               | totale: il design è nostro                           |
| Personalizzazione        | si sovrascrivono gli stili o si modificano le variabili Sass | si aggiungono colori e font con `@theme`         |
| Componenti interattivi   | inclusi (modali, dropdown, carousel) con il suo JavaScript | non inclusi: li gestiamo noi con React            |
| In React                 | si usa spesso con la libreria **React Bootstrap**       | si usa direttamente in `className`                   |

### Quando scegliere l'uno o l'altro?

- **Bootstrap** è comodo quando serve un'interfaccia funzionale in poco tempo e il design non è la priorità: pannelli di amministrazione, prototipi, strumenti interni;
- **Tailwind** è la scelta migliore quando c'è un design specifico da realizzare (ad esempio un layout che arriva da Figma) o quando vogliamo che il sito abbia un aspetto unico.

In React, poi, Tailwind si sposa particolarmente bene con i componenti: invece di usare i componenti di Bootstrap, **creiamo i nostri**, con lo stile che vogliamo, come abbiamo fatto con `Button`.

## Riassumendo

- Tailwind è un framework CSS **utility-first**: si usano tante piccole classi, ognuna con una sola funzione, direttamente in `className`;
- con Vite si installa con `npm i tailwindcss @tailwindcss/vite`, aggiungendo il plugin in `vite.config.js` e `@import 'tailwindcss'` nel file CSS;
- le classi seguono lo schema **proprietà-valore** (`p-4`, `text-xl`, `bg-blue-600`); per i valori fuori scala si usano le **parentesi quadre** (`w-[60px]`);
- gli stati e il responsive si gestiscono con i **prefissi** (`hover:`, `focus:`, `md:`, `lg:`, `dark:`), e il responsive è **mobile-first**;
- nelle classi dinamiche i nomi vanno scritti **per intero**, mai costruiti a pezzi;
- il tema si personalizza con **`@theme`** nel file CSS;
- per non ripetere le stesse classi, si creano **componenti** riutilizzabili;
- a differenza di **Bootstrap**, che fornisce componenti già pronti, Tailwind fornisce solo i "mattoncini": più lavoro all'inizio, ma totale libertà nel design.
