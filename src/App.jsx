import { getCards } from './domain/catalog.js'

// Commit 1 sanity view: prove the data model loads in the browser.
// Replaced by the real card selector + map in later commits.
export default function App() {
  const cards = getCards()
  return (
    <main className="container">
      <header>
        <h1>TransferPartnerHotelsMap</h1>
        <p className="tagline">
          Hotels your credit card's points transfer partners support — on a map.
        </p>
      </header>

      <section>
        <h2>Supported cards ({cards.length})</h2>
        <ul className="card-list">
          {cards.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong>
              <span className="muted"> · {c.issuer} · earns {c.currencyName}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
