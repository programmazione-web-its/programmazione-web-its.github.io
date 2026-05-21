---
layout: post
title: '#34. La navigazione programmatica'
categories: lezioni
excerpt: Eseguire la navigazione tra le pagine in modo programmatico con React Router
featured_image:
---

In React Router, il metodo più comune per navigare tra le pagine è tramite i link (`<Link>` o `<NavLink>`). Questo permette agli utenti di cliccare un collegamento e spostarsi tra le route.

Tuttavia, esistono situazioni in cui la navigazione deve essere attivata dal codice, senza che l’utente clicchi un link: questo si chiama **navigazione imperativa o programmatica**.

## Quando usare la navigazione programmatica?

Alcuni casi in cui si usa la navigazione programmatica sono:

- dopo l’invio di un form: vuoi reindirizzare l’utente a una pagina di conferma;
- dopo un timer o un’azione automatica, come la scadenza di un countdown;
- dopo un evento specifico che richiede di cambiare pagina senza interazione diretta dell’utente.

In questi casi, i link non sono sufficienti, perché vogliamo che il codice controlli il routing.

## Come eseguire la navigazione programmatica: useNavigate

React Router fornisce l’hook `useNavigate`, che restituisce una funzione navigate:

```jsx
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigazione programmatica a /products
    navigate('/products')
  }

  return <button onClick={handleClick}>Vai a Products</button>
}
```

In questo esempio, quando l’utente clicca il pulsante, viene eseguita la funzione `handleClick`, che chiama `navigate('/products')`, causando la navigazione alla route `/products`.

`navigate(path)` sposta l’utente alla route indicata.
⚠️ Funziona solo all’interno di componenti figli di un `<Router>`, perché React Router **deve conoscere il contesto** delle route.

Un esempio più completo potrebbe essere un form di login: una volta che l’utente effettua il login con successo, vogliamo reindirizzarlo alla dashboard.

```jsx
function LoginForm() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Esegui login...
    // Dopo login riuscito, naviga alla dashboard
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Username' />
      <input type='password' placeholder='Password' />
      <button type='submit'>Login</button>
    </form>
  )
}
```

### Opzioni avanzate di useNavigate

La funzione `navigate` accetta un secondo argomento opzionale, un oggetto di opzioni, tra cui:

- `replace: true` - sostituisce la voce corrente nella cronologia invece di aggiungerne una nuova. Utile per evitare che l’utente torni alla pagina precedente con il pulsante Indietro.
- `state: any` - permette di passare uno stato aggiuntivo alla nuova route;

👉 Per la lista completa di opzioni leggi la [documentazione ufficiale](https://reactrouter.com/6.30.3/hooks/use-navigatee)

Esempio con opzioni:

```jsx
navigate('/dashboard', { replace: true, state: { fromLogin: true } })
```

In questo caso, la navigazione alla dashboard sostituirà la voce corrente nella cronologia e passerà uno stato che indica che l’utente proviene dal login.
