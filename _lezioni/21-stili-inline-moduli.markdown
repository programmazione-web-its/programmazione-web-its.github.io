---
layout: post
title: '#21. Gestire gli stili in React: Inline Styles e CSS Modules'
categories: lezioni
excerpt: Diversi approcci per gestire gli stili in React.
featured_image:
---

Abbiamo già visto l'utilizzo delle classi con `className` per applicare stili CSS ai nostri componenti React, anche con la gestione delle classi in modo condizionale.

Tuttavia, esistono altri due approcci comuni per gestire gli stili in React: gli **Inline Styles** e i **CSS Modules**.

## Inline Styles

Gli Inline Styles permettono di applicare stili direttamente agli elementi JSX utilizzando un oggetto JavaScript. Questo approccio è utile per stili dinamici o quando si desidera applicare stili specifici a un singolo elemento.
Ecco un esempio di come utilizzare gli Inline Styles in un componente React:

```jsx
export default function InlineStyleExample() {
  const divStyle = {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  }
  const textStyle = {
    color: 'darkblue',
    fontSize: '18px',
    fontWeight: 'bold',
  }
  return (
    <div style={divStyle}>
      <p style={textStyle}>Questo è un esempio di Inline Styles in React!</p>
    </div>
  )
}
```

In questo esempio, abbiamo definito due oggetti `divStyle` e `textStyle` che contengono le proprietà CSS. Questi oggetti vengono poi passati alla proprietà `style` degli elementi JSX.
A differenza del CSS tradizionale, le proprietà CSS in JavaScript utilizzano la notazione camelCase (ad esempio, `backgroundColor` invece di `background-color`).

## CSS Modules

I CSS Modules sono un modo per scrivere stili CSS che sono specifici per quel componente, evitando conflitti di nomi globali. Con i CSS Modules, ogni file CSS viene trattato come un modulo e le classi definite in quel file sono accessibili **solo all'interno del componente** che le importa.
Per utilizzare i CSS Modules, è necessario rinominare i file CSS con l'estensione `.module.css`. Ecco un esempio di come utilizzare i CSS Modules in un componente React:

```jsx
import styles from './MyComponent.module.css'
export default function MyComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Questo è un esempio di CSS Modules in React!
      </h1>
      <p className={styles.description}>
        Gli stili sono localizzati al componente.
      </p>
    </div>
  )
}
```

E il file `MyComponent.module.css` potrebbe essere simile a questo:

```css
.container {
  background-color: lightgreen;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.title {
  color: darkgreen;
  font-size: 24px;
  font-weight: bold;
}
.description {
  color: green;
  font-size: 16px;
}
```

In questo esempio, abbiamo importato gli stili dal file `MyComponent.module.css` e li abbiamo applicati agli elementi JSX utilizzando `className={styles.className}`. Le classi sono automaticamente uniche e non entreranno in conflitto con altre classi definite in altri file CSS.

{% capture highlight %}

⚠️ I fogli di stile CSS non sono "scoped" di default in React: significa che le classi definite in un file CSS sono globali e possono influenzare altri componenti. I CSS Modules risolvono questo problema rendendo le classi locali al componente.

{% endcapture %}
{% include highlight.html content=highlight  %}

### Un esempio pratico:

<iframe src="https://codesandbox.io/embed/35gx9j?view=editor+%2B+preview&module=%2Fsrc%2FApp.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="jovial-fog-35gx9j"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
