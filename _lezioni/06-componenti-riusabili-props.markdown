---
layout: post
title: '#06. Rendere i componenti riusabili: le props'
categories: lezioni
excerpt: Come rendere i componenti riusabili e flessibili con le props
featured_image: /assets/images/05.webp
---

{% capture standardcontent %}

Come abbiamo visto, uno dei grandi vantaggi dei componenti è che sono **riutilizzabili** un numero indefinito di volte.
Tuttavia, per rendere un componente veramente riusabile, spesso è necessario renderlo **flessibile** in modo che possa adattarsi a contesti diversi.
Per fare questo, React offre un meccanismo chiamato **props** (abbreviazione di "properties", proprietà in italiano): il concetto di **props** si basa sull'idea di passare **dati** e **configurazioni** ai componenti in modo che possano comportarsi in modo diverso a seconda delle esigenze.

Questi dati vengono passati al componente come un oggetto, e ogni proprietà di questo oggetto rappresenta una **prop**, ovvero una proprietà specifica che il componente può utilizzare per personalizzare il suo comportamento o il suo aspetto.
I dati vengnono passati al componente come attributi HTML, e all'interno del componente possiamo accedere a questi dati tramite l'oggetto `props`.  
Ecco un esempio pratico per capire come funzionano le props.
{% endcapture %}
{% capture protips %}

  <h4>Utile da sapere</h4>
  - 🔗 [Passing props to a component](https://react.dev/learn/passing-props-to-a-component)
  - ☝️ Nelle *props* possiamo passare qualsiasi tipo di dato: stringhe, numeri, booleani, array, oggetti, funzioni, ecc.
  - 🧐 Le *props* sono **solamente in lettura**: un componente non può modificare le proprie props.
  - 💡 Possiamo dare agli attributi il nome che vogliamo.
{% endcapture %}

{% include utility_box.html content=standardcontent tip=protips %}

```jsx
// Card.jsx
function ProfileCard(props) {
  return (
    <div className='card'>
      <img src={props.image} alt={props.nickname} className='card-image' />
      <div className='card-content'>
        <h2 className='card-title'>{props.nickname}</h2>
      </div>
    </div>
  )
}
export default ProfileCard
```

In questo esempio, abbiamo definito un componente `ProfileCard` che accetta tre props: `image` e `nickname`. Queste props vengono utilizzate all'interno del componente per personalizzare l'immagine, il nome e la descrizione visualizzati nella card.

Per utilizzare il componente `ProfileCard` e passargli le props, possiamo fare così:

```jsx
import ProfileCard from './ProfileCard'
function App() {
  return (
    <div>
      <ProfileCard
        image='https://mypic.com/supermario93.jpg'
        nickname='supermario93'
      />
      <ProfileCard
        image='https://mypic.com/lorella22.jpg'
        nickname='lorella22'
      />
    </div>
  )
}
export default App
```

## Sintassi delle props

<img class="img-full-width" src="/assets/images/props.png" alt="React Logo" />

Come si vede nell'esempio sopra, le props vengono passate al componente come **attributi HTML**. Ogni attributo rappresenta una prop specifica, e il valore dell'attributo viene passato al componente.
All'interno del componente, possiamo accedere a queste props tramite l'oggetto `props`, che viene passato come argomento alla funzione del componente.
Possiamo accedere a ogni singola prop usando la notazione a punto, ad esempio `props.image` o `props.nickname`.
Possiamo anche usare la **destructuring assignment** per estrarre le props direttamente nell'argomento della funzione, in questo modo:

```jsx
function ProfileCard({ image, nickname }) {
  return (
    <div className='card'>
      <img src={image} alt={nickname} className='card-image' />
      <div className='card-content'>
        <h2 className='card-title'>{nickname}</h2>
      </div>
    </div>
  )
}
export default ProfileCard
```

In questo modo, possiamo usare direttamente `image` e `nickname` all'interno del componente, senza dover scrivere `props.image` o `props.nickname`.

Se poi le chiavi delle props sono molte possiamo anche fare la destructuring all'interno del corpo della funzione:

```jsx
function ProfileCard(props) {
  const { image, nickname } = props
  return (
    <div className='card'>
      <img src={image} alt={nickname} className='card-image' />
      <div className='card-content'>
        <h2 className='card-title'>{nickname}</h2>
      </div>
    </div>
  )
}
export default ProfileCard
```

Ma possiamo anche passare le props come un singolo oggetto, ad esempio:

```jsx
const user = {
  image: 'https://mypic.com/supermario93.jpg',
  nickname: 'supermario93'
}
<ProfileCard {...user} />
```

In questo caso, usiamo lo **spread operator** (`...`) per "spalmare" le proprietà dell'oggetto `user` come props del componente `ProfileCard`. Questo è particolarmente utile quando abbiamo un oggetto con molte proprietà che vogliamo passare come props. Naturalmente, le chiavi dell'oggetto devono corrispondere ai nomi delle props che il componente si aspetta.
