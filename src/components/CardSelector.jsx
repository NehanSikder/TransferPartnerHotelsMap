import { useState } from 'react'
import { getCards } from '../domain/catalog.js'

// Multi-select for credit cards. Selecting more cards unions their partners.
// `compact` (sidebar) renders a collapsible disclosure so 7 chips don't make the
// panel tall and ragged; the full variant (unused now) keeps the labelled fieldset.
export default function CardSelector({ selected, onChange, compact = false }) {
  const cards = getCards()
  const [open, setOpen] = useState(true)

  function toggle(id) {
    onChange(
      selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id],
    )
  }

  const chips = cards.map((c) => (
    <label key={c.id} className={selected.includes(c.id) ? 'chip on' : 'chip'}>
      <input
        type="checkbox"
        checked={selected.includes(c.id)}
        onChange={() => toggle(c.id)}
      />
      <span>{c.name}</span>
      {!compact && <small className="muted">{c.currencyName}</small>}
    </label>
  ))

  if (compact) {
    return (
      <details
        className="card-disclosure"
        open={open}
        onToggle={(e) => setOpen(e.currentTarget.open)}
      >
        <summary>
          <span className="field-label">Cards</span>
          <span className="disclosure-hint">
            {selected.length ? `${selected.length} selected` : 'Choose'} ▾
          </span>
        </summary>
        <div className="card-grid">{chips}</div>
      </details>
    )
  }

  return (
    <fieldset className="selector">
      <legend>Your card(s)</legend>
      <div className="card-grid">{chips}</div>
    </fieldset>
  )
}
