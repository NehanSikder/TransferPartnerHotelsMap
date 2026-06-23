import cities from '../data/cities.json'

// Static mode: pick from seeded cities (works with no API key).
// Commit 4 swaps this for Google Places autocomplete when a key is present.
export default function CitySearch({ value, onChange }) {
  return (
    <fieldset className="selector">
      <legend>City</legend>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a city…</option>
        {Object.entries(cities).map(([key, c]) => (
          <option key={key} value={key}>
            {c.label}
          </option>
        ))}
      </select>
    </fieldset>
  )
}
