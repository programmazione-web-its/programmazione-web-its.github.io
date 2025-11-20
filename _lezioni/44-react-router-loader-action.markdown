---
layout: post
title: '#43. React Router Loader: send data'
categories: lezioni
excerpt: Inviare dati al backend con React Router, usando le `action`
featured_image:
---
Uno dei casi tipici di invio di dati al backend è attraverso i form. Abbiamo visto che i form possono essere gestiti con `onSubmit`,  `useState` e le `fetch()` ma, con React Router (>= 6.4) esiste anche un altro modo per gestire i form e, più in generale, le richiesta POST, PUT, PATCH e DELETE, ovvero le **action**

## Cosa è un'Action?
Una action è una funzione eseguita in automatico da React Router quando il submit del form avviene da una route all'interno della quale questa azione è definita:

```jsx
createBrowserRouter([
  {
    path: '/login',
    action: async ({request}) => {
      const formData = await request.formData()
      const res = await fetch('http://myapis.com/auth', {
        method: 'POST',
        body: {...}
      })
      return res
    },
    Component: MyRoute,
  },
])
```

⚠️ Le azioni vengono **eseguite lato client**, esattamente come i loader.

## Perché usare le Action?
- intercettano automaticamente i form;
- passano la request contenente i dati del form;
- gestiscono errori e redirect in modo nativo;
- ci evitano di scrivere `onSubmit` nei componenti;
- separano UI e logica di mutazione dei dati.

Per usarle nei form, dobbiamo utilizzare un componente speciale di React Router: `<Form>`

```jsx
import { Form } from "react-router-dom"

<Form method="post">
  <input name="username" />
  <input name="password" />
  <button>Login</button>
</Form>
```
☝️ Ricordati sempre di:
- usare l'attributo `name` per gli input: servirà a recuperarne il valore tramite `formData`;
- specificare il metodo del form `method="post"` per inviare i dati all'action.

Quanto  `<Form>` viene inviato no, il form non fa una richiesta HTTP tradizionale, ma React Router intercetta la richiesta, crea un oggetto  `Request` che passa alla nostra  `action()` ed esegue quindi la azione.

## Leggere i dati dentro l'action

```jsx
export async function action({ request, params }) {
  // ...
}

```

È appunto questa `Request` che ci fornisce i valori del form, recuperabili attraverso `formData`.

### Un esempio di azione che crea un nuovo post e poi reindirizza alla pagina dei post
```jsx
export async function action({ request }) {
  const formData = await request.formData();

  const postData = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  const response = await fetch("https://example.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw json({ message: "Could not save post." }, { status: 500 });
  }

  return redirect("/posts");
}

```
