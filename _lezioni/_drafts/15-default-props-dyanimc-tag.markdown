---
layout: post
title: '#15. Le default props e i tag dinamici in React'
categories: lezioni
excerpt: Rendere i componenti più flessibili con le default props e i tag dinamici
featured_image:
---

## I tag dinamici

In React, possiamo creare componenti che utilizzano tag HTML dinamici. Prendiamo ad esempio un componente "Lista" che può essere reso come un `ul` o un `ol` a seconda di una prop. Potremmo naturalemente fare due componenti, oppure potremmo semplificare il tutto creando un componente che accetta una prop per specificare il tipo di tag HTML da utilizzare. Potremmo chiamare questa prop `tag` e usarla per rendere il componente con il tag desiderato.
Ecco un esempio di come implementare un componente con un tag dinamico:

```jsx
function List({ tag, children }) {
  const Tag = tag
  return <Tag>{children}</Tag>
}
```

{% capture highlight %}
☝️ Non possiamo semplicemente sostisuitre il tag, in questo caso `<ul>` o `<ol>`, con una variabile perché React cercherebbe un componente built-in chiamato `tag`, che non esiste. La soluzione è creare una variabile che inizi con la maiuscola (in questo caso `Tag`), così React capisce che si tratta di un componente o di un tag HTML.

{% endcapture %}
{% include highlight.html content=highlight  %}

## Impostare valori di default per le props

L'idea alla base dei componenti è quella di renderli riutilizzabili e flessibili il più possibile. A volte, però, vogliamo che un componente abbia un comoportamento predefinito, ma che possa essere sovrascritto se necessario. Per esempio, nel componente `List` sopra, potremmo voler impostare il valore di default della prop `tag` a `ul`, così che se non viene specificato un tag, il componente renderizzerà una lista non ordinata. Per farlo, possiamo dare una valore di default alla prop `tag` direttamente nella destrutturazione delle props:

```jsx
function List({ tag = 'ul', children }) {
  const Tag = tag
  return <Tag>{children}</Tag>
}
```

In questo modo, se usiamo il componente `List` senza specificare la prop `tag`, verrà renderizzato come una lista non ordinata:

```jsx
<List>
  <li>Item 1</li>
  <li>Item 2</li>
</List>
```

Questo renderizzerà:

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

Se invece vogliamo una lista ordinata, possiamo specificare la prop `tag`:

```jsx
<List tag='ol'>
  <li>Item 1</li>
  <li>Item 2</li>
</List>
```

Questo renderizzerà:

```html
<ol>
  <li>Item 1</li>
  <li>Item 2</li>
</ol>
```
