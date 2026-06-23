import cities from '../data/cities.json'

// Static mode: pick from seeded cities (works with no API key).
// `compact` drops the fieldset chrome for the collapsed sticky header.
// Commit (later): swap for Google/Nominatim autocomplete.
export default function CitySearch({ value, onChange, compact = false }) {
  const select = (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select a city…</option>
      {Object.entries(cities).map(([key, c]) => (
        <option key={key} value={key}>
          {c.label}
        </option>
      ))}
    </select>
  )

  if (compact) {
    return (
      <div className="field">
        <span className="field-label">City</span>
        <div className="selector-compact">{select}</div>
      </div>
    )
  }

  return (
    <fieldset className="selector">
      <legend>City</legend>
      {select}
    </fieldset>
  )
}
