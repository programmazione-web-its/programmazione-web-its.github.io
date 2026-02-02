---
layout: post
title: '#07. Children: una Prop speciale'
categories: lezioni
excerpt: L'utilizzo della proprietà children nella costruzione dei componenti
featured_image:
---

Abbiamo visto che, in React, quando creiamo un componente personalizzato possiamo passargli le informazioni tramite gli attributi (**props**) ma c'à anche un altro modo di farlo, ovvero passando del contenuto direttamente all'interno del componente, racchiudendolo tra i _tag_:

```jsx
<MyComponent> Questo è il contenuto all'interno </MyComponent>
```

Quando scriviamo qualcosa in questo modo ☝️, React non lo ignora: mette tutto quel contenuto in una proprietà speciale che si chiama **children**.

Se vogliamo usare quel contenuto dentro il nostro componente, dobbiamo richiamare la prop children:

```jsx
function MyComponent(props) {
  return <div>{props.children}</div>
}
```

Il bello di **children** è che non deve essere solo testo ma può essere anche altri **elementi JSX**:

```jsx
<MyComponent>
  <h2>Ciao!</h2>
  <p>Questo è un paragrafo</p>
</MyComponent>
```

oppure **altri componenti** React:

```jsx
<MyComponent>
  <Button>Aggiungi Task</Button>
</MyComponent>
```

## 🧐 Perché è utile?

Perché ci permette di creare **contenitori riutilizzabili** che non sanno in anticipo quale contenuto avranno dentro: il componente definisce solo la struttura esterna e di volta in volta decideremo cosa mettere al suo interno in base alla necessità. Esempi di utilizzo sono:

- Layout di pagina (un contenitore che racchiude header, main e footer).
- modali (struttura fissa, ma contenuto variabile a seconda del caso).
- plsanti → invece di scrivere `<Button label="Clicca qui" />`, possiamo scrivere `<Button>Clicca qui</Button>`, proprio come in HTML.
  <br/>
  <br/>

{% capture esercizio %}

## 💪 Integriamo children nella To Do List

- Crea un nuovo componente `Button`;
- fai in modo che sia utilizzabile con `<Button>Testo</Button>`;
- inseriscilo nel componente `TooList.jsx`.

- Adesso crea un nuovo componente `Container`, che servira per gestire il layout;
- incapsula tutto il conenuto dell'app all'interno di `Container`.

{% endcapture %}

{% include exercise_box.html content=esercizio %}
