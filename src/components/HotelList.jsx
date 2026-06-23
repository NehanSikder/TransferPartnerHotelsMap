// Synced list. Hovering/selecting a row reports up so the map (commit 3) can
// highlight the matching pin. Clicking opens the hotel's website in a new tab.
export default function HotelList({ hotels, activeId, onHover, onSelect }) {
  if (!hotels.length) {
    return <p className="muted">No hotels found for this card + city combination.</p>
  }

  return (
    <ul className="hotel-list">
      {hotels.map((h) => (
        <li
          key={h.id}
          className={h.id === activeId ? 'hotel-row active' : 'hotel-row'}
          onMouseEnter={() => onHover?.(h.id)}
          onMouseLeave={() => onHover?.(null)}
        >
          <a
            href={h.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onSelect?.(h.id)}
          >
            <span className="hotel-name">{h.name}</span>
            <span className="muted">
              {h.program}
              {h.rating ? ` · ★ ${h.rating}` : ''}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
