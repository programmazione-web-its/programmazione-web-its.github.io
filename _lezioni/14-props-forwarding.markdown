---
layout: post
title: '#15.Rest/spread props in React'
categories: lezioni
excerpt: Come evitare di perdere props in un componente React.
featured_image:
---

Partiamo dal nostro progetto Todo List e, in particolare, sofferimiamoci sul componente `Container`.

```jsx
function Container({ children }) {
  return <div className='container py-8'>{children}</div>
}
```

Cosa succederebbe se volessimo aggiungere un `id` o uno stile inline al `div`?
{% raw %}

```jsx
<Container id='main' style={{ border: '1px solid red' }}>
  <TodoList tasks={dummyTasks} />
</Container>
```

{% endraw %}
Se guardiamo il codice dal browser notiamo che questi attributi vengono **ignorati** perché il componente `Container` non li inoltra al `div` interno, né li riceve.

Per evitare di perdere props, possiamo usare il **lo spreading delle props**: una tecnica che consiste nel **passare tutte le props ricevute** da un componente a un altro componente o elemento figlio. Il modo per farlo è usando

- il **rest operator (`...`)** che ci permette di "raccogliere" tutte le props extra;
- e lo **spread operator (`...`)** che ci permette di "spalmare" queste props su un elemento JSX.

```jsx
function Container({ children, ...props }) {
  return (
    <div className='container py-8' {...props}>
      {children}
    </div>
  )
}
```

Cosa abbiamo fatto?

- `{ children, ...props }` estrae children e raccoglie tutte le altre props in un oggetto props;
- `{...props}` "spalma" tutte le props raccolte sull'elemento `div`.

Ora, se scriviamo
{% raw %}

```jsx
<Container id='main' style={{ border: '1px solid red' }}>
  <TodoList tasks={dummyTasks} />
</Container>
```

{% endraw %}

React le applicherà direttamente al `div` interno senza doverle dichiarare manualmente ogni volta

{% capture highlight %}
☝️ Lo spreading delle props è particolarmente utile quando si creano componenti riutilizzabili che devono essere flessibili e adattabili a diversi contesti. Permette di mantenere il codice pulito e riduce la necessità di modificare i componenti ogni volta che si vogliono aggiungere nuove props.

☝️ Possiamo chiamare l’oggetto che raccoglie le props con qualsiasi nome, ma per convenzione — e per rendere il codice più leggibile ad altri sviluppatori — si utilizza quasi sempre il nome _props_.
{% endcapture %}
{% include highlight.html content=highlight  %}

{% capture esercizio %}

## 💪 Applichiamo lo spreading alla nostra app

- Modifichiamo il componente componente `Container` per permettere di passare props extra (es. `id`, data-attributes, ecc.);

{% endcapture %}

{% include exercise_box.html content=esercizio %}
