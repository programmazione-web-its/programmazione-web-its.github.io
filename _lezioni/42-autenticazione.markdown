---
layout: post
title: "#42. Gestire l'autenticazione"
categories: lezioni
excerpt: Gestire l'autenticazione in React tramite i componenti
featured_image:
---

Nell'[esempio fatto in classe](https://codesandbox.io/p/sandbox/formautenticazione-5n7rj2), abbiamo visto come gestire l'autenticazione in modo semplice tramite i componenti e l'utilizzo di `useState` e `useEffect` 👇

<iframe src="https://codesandbox.io/embed/5n7rj2?view=editor+%2B+preview&module=%2Fsrc%2Fpages%2FLoginForm.jsx"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="FormAutenticazione"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

L'implementazione è state gestita attraverso:

- form di login;
- fetch delle API;
- salvataggio del token;
- redirect manuale con l'hook `useNavigate`;
- recupero del token da `localStorage`.

### Step 1: invio delle credenziali

Quando l'utente invia il form

```jsx
const res = await fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username,
    password,
  }),
})
```

### Step 2: salvo il token

se la risposta è ok, allora ci verranno restituiti i dati dell'utente e il token. Possiamo a questo punto prendere il nostro token e salvarlo nel `localStorage` con:

```js
localStorage.setItem('token', data.accessToken)
```

👀 Il token ci serve per permettere all'utente di rimanere loggato anche al refresh della pagina.

### Step 3: recupero il token

Naturalmente, per essere utilizzato, il token andrà recuperato al mount del componente:

```jsx
useEffect(() => {
  const localToken = localStorage.getItem('token')
  setToken(localToken)
}, [])
```

Se l'utente è già loggato possiamo, volendo, forzare un redirect alla pagina di account, sfruttando `useNavigate` e passando il token nello stato dell'hook

```jsx
useEffect(() => {
  if (!token) return
  navigate('account', { state: { token } })
}, [token])
```

A questo punto possiamo controllare l'accesso alla pagina account: con il `location.state` se ci atterriamo da redirect oppure da `localStorage` se ci arriviamo direttamente. Se il token esiste, lo useremo per fare la chiamata privata:

```jsx
fetch('https://dummyjson.com/auth/me', {
  headers: { Authorization: `Bearer ${token}` },
})
```

⚠️ Questo approccio, per quanto semplice, presenta alcuni limiti:

- il redirect che dipende dal local state è poco "robusto";
- la protezione delle rotte non è centralizzata;
- ogni pagina deve fare un controllo sull'esistenza del token.

👉 [Vai alla lezione 46](/_lezioni/46-auth-con-loader.markdown) per vedere un approccio diverso e migliorativo della gestione dell'autenticazione.
