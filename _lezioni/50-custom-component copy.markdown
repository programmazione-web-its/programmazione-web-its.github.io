---
layout: post
title: '#50. I componenti custom'
categories: lezioni
excerpt: Creare custom component per la nostra App
featured_image:
---

All'interno della nostra App, oltre alle pagine e ai layout avremo bisogno anche dei classici componenti React.
I nostri componenti possono essere creati o all'interno di `app/` oppure fuori dalla cartella `app/`. Ad esesempio, se volessimo creare un componente `Navbar`:

```
app/
 ├─ layout.js
 ├─ page.js
 └─ about/
     ├─ page.js
     └─ layout.js
      └─ about/
components/        ← cartella components
  └─ Header.js     ← il componente Navbar
```

Che potremmo poi usare normalmente:

```jsx
import Navbar from '@/components/Navbar'

export default function Homepage() {
  return (
    <>
      <Navbar />
      <h1>Title</h1>
    </>
  )
}
```
