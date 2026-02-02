---
layout: post
title: "#46. Gestire l'autenticazione usando il loader()"
categories: lezioni
excerpt: Migliorare la gestione dell'autenticazione con React Router
featured_image:
---

Abbiamo visto nella lezione precedente che, dalla versione 6, React Router ha introdotto i Data Routers, che ci permettono di gestire le fetch in maniera semplice e più efficiente. Tra questi:

- `loader`
- `action`
- `redirect`
- `useLoaderData`

Questi strumenti ci permettono di semplificare anche la gestione dell'autenticazione: sfruttando i loader possiamo infatti **controllare** se esiste il token **prima** di renderizzare la pagina e, di conseguenza, **bloccare l'accesso** alle pagine protette. Possiamo inoltre **gestire i redirect automatici** e ottenere i **dati** della chiamata **in anticipo.**

Recuperando l'esempio della [lezione 42](/_lezioni/42-autenticazione.markdown), potremmo trasformare il controllo sulla pagina Account facendo questo:

```jsx
//App.js
import LoginForm from './pages/LoginForm'
import { Account, loader as accountLoader } from './pages/Account'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: LoginForm,
      },
      {
        path: 'account',
        Component: Account,
        loader: accountLoader,
      },
    ],
  },
])
```

```jsx
// Account.jsx

import { useLoaderData, redirect } from 'react-router'
export default function Account() {
  const userDetails = useLoaderData()

  return (
    <div className='my-4 container mx-auto px-4'>
      {userDetails ? (
        <div className='text-left'>
          <h1>Ciao {userDetails?.firstName}!</h1>
          {userDetails && (
            <div className='my-3 flex gap-2 text-sm'>
              <div className='rounded-full w-[40px] h-[40px] grow-0 shrink-0 border border-cyan-800  overflow-hidden'>
                <img src={userDetails.image} />
              </div>
              <div className='text-left'>
                <p>
                  {userDetails?.firstName} {userDetails?.lastName}
                </p>
                <p>{userDetails.age}</p>
                <h5>Role: {userDetails.role} </h5>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='text-xl'>
          Non hai il permesso per visualizzare questa pagina
        </div>
      )}
    </div>
  )
}

export async function loader() {
  // loader eseguito solo nel browser → allora localStorage esiste
  /* ⚠️ I loader di React Router possono essere eseguiti fuori dal browser,
   in certi casi anche durante navigazioni “server-side-like”.
  e quando questo accade, allora localStorage non esiste → errore. */
  if (typeof window === 'undefined') {
    return redirect('/')
  }

  const token = window.localStorage.getItem('token')

  if (!token) {
    return redirect('/')
  }

  const res = await fetch('https://dummyjson.com/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    return redirect('/')
  }

  return res.json()
}
```

{% capture highlight %}

#### 🛑 Il loader blocca realmente il rendering

Una differenza fondamentale rispetto alla versione “base” dell’autenticazione (lezione 42) è che:

- il loader viene **eseguito prima** del rendering del componente;

- se il token è assente o non valido, il componente **non viene mai renderizzato.**

Questo protegge la rotta in modo molto più robusto, evitando flicker, redirect visibili e controlli sparsi nel codice.

#### 🔍 Nota importante sulla serializzazione dei loader

React Router raccomanda che i loader siano **serializzabili** e **senza side effects.**
Nel nostro esempio utilizziamo `localStorage`, che va bene in ambiente didattico, ma in un progetto reale sarebbe preferibile utilizzare **cookie HttpOnly**, perché:

- sono più sicuri del `localStorage`;
- sono accessibili dal server e dal browser;
- non causano problemi quando il `loader` viene eseguito in modalità “server-like”.

{% endcapture %}
{% include highlight.html content=highlight  %}

## 💡 Bonus: gestione avanzata dei token: scadenza, auto logout, sicurezza

Negli esempi visti fin qui ci siamo preoccupati di salvare il token nello storage e recuperarlo ma non abbiamo considerato un fattore fondamentale: **la scadenza reale** del token. Infatti, nel momento in cui noi cerchiamo di recuperarlo quel token potrebbe essere scaduto anche se per il frontend è valido. Tradotto con un esempio:

- il token dura 1 ora;
- l'utente esegue il login;
- torna dopo 30 minuti → token ancora valido;
- torna dopo 2 ore → token scaduto **MA**
  - il frontend NON lo sa → pensa che il token sia ancora valido

☝️ Dobbiamo quindi salvare anche la data di scadenza del nostro token:

```js
const expirationDate = new Date()
expirationDate.setHours(expirationDate.getHours() + 1)

localStorage.setItem('expiration', expirationDate.toISOString())
```

Dovremo poi calcolare il tempo che rimane alla scadenza del nostro token, con una funzione tipo questa:

```js
function getTokenDuration() {
  const storedExpiration = localStorage.getItem('expiration')
  if (!storedExpiration) return -1

  const expirationDate = new Date(storedExpiration)
  const now = new Date()

  return expirationDate.getTime() - now.getTime()
}
```

E, finalmente, controllare lo stato di validità del token laddove necessario:

```jsx
useEffect(() => {
  const token = localStorage.getItem('token')
  if (!token) return

  const duration = getTokenDuration()
  if (duration < 0) {
    logout()
    return
  }

  setTimeout(logout, duration)
}, [])
```

Questo, dovrà essere accompagnata a una funzione di auto logout, ad esempio:

```jsx
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('expiration')
  navigate('/')
}
```

{% capture highlight2 %}

#### 🔄 Sincronizzare il logout tra più tab

Il meccanismo con `setTimeout(logout)` funziona solo nella tab corrente.
Se un utente ha due tab aperte:

- in una scade il token → scatta il logout;
- nell’altra potrebbe rimanere loggato finché non interagisce.

Per **sincronizzare automaticamente** il logout tra tutte le tab è possibile utilizzare l’evento:

```js
window.addEventListener('storage', () => {
  if (!localStorage.getItem('token')) {
    logout()
  }
})
```

{% endcapture %}
{% include highlight.html content=highlight2  %}

⚠️ Per migliorare ulteriormente il livello di sicurezza, sarebbe ancora meglio salvare token e data di scadenza in dei cookies invece che nello storage.
