import { useState, useEffect } from 'react'
import CardSelector from './components/CardSelector.jsx'
import CitySearch from './components/CitySearch.jsx'
import HotelList from './components/HotelList.jsx'
import { MapView } from './map/index.js'
import { resolveProgramIds, programName } from './domain/resolve.js'
import { getHotelProvider } from './providers/index.js'
import cities from './data/cities.json'

const provider = getHotelProvider()

export default function App() {
  const [cardIds, setCardIds] = useState([])
  const [cityKey, setCityKey] = useState('')
  const [hotels, setHotels] = useState(null)
  const [center, setCenter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const programIds = resolveProgramIds(cardIds)

  // Live search — no submit button. Re-runs (debounced) whenever cards/city change.
  useEffect(() => {
    if (cardIds.length === 0 || !cityKey) {
      setHotels(null)
      setCenter(null)
      return
    }
    let cancelled = false
    setLoading(true)
    const t = setTimeout(async () => {
      const results = await provider.search({
        cityKey,
        programIds: resolveProgramIds(cardIds),
      })
      if (cancelled) return
      setHotels(results)
      const c = cities[cityKey]
      setCenter(c ? { lat: c.lat, lng: c.lng } : null)
      setLoading(false)
    }, 150)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [cardIds, cityKey])

  return (
    <div className="app">
      {sidebarOpen && (
        <aside className="sidebar">
          <div className="sidebar-search">
            <div className="sidebar-head">
              <strong>Transfer Partner Hotels Map</strong>
              <button
                className="icon-btn"
                onClick={() => setSidebarOpen(false)}
                aria-label="Collapse panel"
                title="Collapse"
              >
                «
              </button>
            </div>
            <CardSelector selected={cardIds} onChange={setCardIds} compact />
            <CitySearch value={cityKey} onChange={setCityKey} compact />
            {programIds.length > 0 && (
              <div className="programs">
                <span className="muted reaches-label">Reaches:</span>
                {programIds.map((id) => (
                  <span key={id} className="pill">{programName(id)}</span>
                ))}
              </div>
            )}
          </div>

          {hotels !== null && (
            <div className="sidebar-results">
              <div className="list-head">
                {hotels.length} hotel{hotels.length === 1 ? '' : 's'}
                {loading ? ' · updating…' : ''}
              </div>
              <HotelList
                hotels={hotels}
                activeId={activeId}
                onHover={setActiveId}
                onSelect={setActiveId}
              />
            </div>
          )}
        </aside>
      )}

      <div className="map-area">
        <MapView
          center={center}
          hotels={hotels ?? []}
          activeId={activeId}
          onHover={setActiveId}
          onSelect={setActiveId}
        />
        {!sidebarOpen && (
          <button
            className="sidebar-reopen"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open panel"
          >
            » Search
          </button>
        )}
      </div>
    </div>
  )
}
