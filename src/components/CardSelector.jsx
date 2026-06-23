import { getCards } from '../domain/catalog.js'

// Multi-select for credit cards. Selecting more cards unions their partners.
export default function CardSelector({ selected, onChange }) {
  const cards = getCards()

  function toggle(id) {
    onChange(
      selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id],
    )
  }

  return (
    <fieldset className="selector">
      <legend>Your card(s)</legend>
      <div className="card-grid">
        {cards.map((c) => (
          <label key={c.id} className={selected.includes(c.id) ? 'chip on' : 'chip'}>
            <input
              type="checkbox"
              checked={selected.includes(c.id)}
              onChange={() => toggle(c.id)}
            />
            <span>{c.name}</span>
            <small className="muted">{c.currencyName}</small>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
