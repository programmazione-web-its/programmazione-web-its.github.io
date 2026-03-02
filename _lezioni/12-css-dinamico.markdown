---
layout: post
title: '#13. CSS e stili dinamici'
categories: lezioni
excerpt: Come applicare stili dinamici in React
featured_image:
---

Ora che sappiamo come renderizzare contenuti in modo condizionale, è il momento di affrontare un altro aspetto fondamentale dello sviluppo con React: lo styling dinamico degli elementi.

In molti casi, non basta mostrare un contenuto diverso: vogliamo anche modificare lo stile dell’interfaccia in base allo stato dell’applicazione.
Un esempio classico è quello delle tab o dei menu di navigazione: quando l’utente seleziona una scheda, vogliamo che essa venga evidenziata graficamente.

In JSX le classi CSS si applicano tramite l’attributo `className` (invece di `class`, che è una parola riservata in JavaScript).

```jsx
<div className='menu'>
  <div className='tab active'>Home</div>
  <div className='tab'>Profile</div>
  <div className='tab'>Settings</div>
</div>
```

Tuttavia, a parte questo dettaglio, la maggior parte degli altri attributi `(id, type, value, ecc.)` funziona esattamente come in HTML.

## Passare informazioni dinamiche alle classi CSS tramite props

Quando abbiamo la necessità di applicare classi CSS in modo dinamico, possiamo sfruttare le **props** per passare informazioni ai componenti figli.
Ad esempio, immaginiamo di avere un componente `Tab` che rappresenta una singola scheda in un menu di navigazione. Possiamo passare una prop chiamata `isActive` per indicare se la tab è attiva o meno.

```jsx
function Tab({ label, isActive }) {
  /* Operatore ternario 👇 */
  return <div className={isActive ? 'tab active' : 'tab'}>{label}</div>
}
```

In questo esempio, la classe `active` viene aggiunta solo se la prop `isActive` è vera. Altrimenti, viene applicata solo la classe `tab`.
Naturalmente dobbiamo passare la prop `isActive` quando usiamo il componente `Tab`.

```jsx
function TabMenu() {
  const [activeTab, setActiveTab] = useState('home')
  return (
    <div className='menu'>
      <Tab
        label='Home'
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      />
      <Tab
        label='Profile'
        isActive={activeTab === 'profile'}
        onClick={() => setActiveTab('profile')}
      />
      <Tab
        label='Settings'
        isActive={activeTab === 'settings'}
        onClick={() => setActiveTab('settings')}
      />
    </div>
  )
}
```

In questo modo, quando l’utente clicca su una tab, lo stato `activeTab` viene aggiornato e la UI si aggiorna di conseguenza, evidenziando la tab selezionata.

{% capture esercizio %}

## 💪 Stilizziamo gli elementi della lista che sono completati

- Aggiungiamo una classe `done` agli elementi della lista che sono completati

{% endcapture %}

{% include exercise_box.html content=esercizio %}
