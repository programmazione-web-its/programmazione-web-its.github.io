---
layout: post
title: '#14. Il props forwarding in React'
categories: lezioni
excerpt: Come passare props a componenti figli in React
featured_image:
---

Partiamo dal nostro progetto Todo List e, in particolare, sofferimiamoci sul componente `Container`.

```jsx
function Container({ children }) {
  return <div className='container py-8'>{children}</div>
}
```

Cosa succederebbe se volessimo aggiungere un `id` o una `className` al `div`?

```jsx
<Container id='main' className='bg-gray-100' style={{ borderRadius: '10px' }}>
  <TodoList tasks={dummyTasks} />
</Container>
```

Se guardiamo il codice dal browser notiamo che questi attributi vengono **ignorati** perché il componente `Container` non li inoltra al `div` interno, né li riceve.

Per evitare di perdere props, possiamo usare il **props forwarding**: una tecnica che consiste nel **passare tutte le props ricevute** da un componente a un altro componente o elemento figlio. Il modo per farlo è usando

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

```jsx
<Container
  id='main'
  className='bg-gray-100'
  style={{ border: '1px solid red' }}
>
  <TodoList tasks={dummyTasks} />
</Container>
```

React le applicherà direttamente al `div` interno senza doverle dichiarare manualmente ogni volta

{% capture highlight %}
☝️ Il props forwarding è particolarmente utile quando si creano componenti riutilizzabili che devono essere flessibili e adattabili a diversi contesti. Permette di mantenere il codice pulito e riduce la necessità di modificare i componenti ogni volta che si vogliono aggiungere nuove props.

☝️ Possiamo chiamare l’oggetto che raccoglie le props con qualsiasi nome, ma per convenzione — e per rendere il codice più leggibile ad altri sviluppatori — si utilizza quasi sempre il nome _props_.
{% endcapture %}
{% include highlight.html content=highlight  %}

{% capture esercizio %}

## 💪 Applichiamo il props forwarding alla nostra app

- Modifichiamo il componente `Button` per permettere di passare props extra (es. `onClick`, `class`, `id`, ecc.);
- Facciamo la sessa cosa per il componente `Container`;

{% endcapture %}

{% include exercise_box.html content=esercizio %}
