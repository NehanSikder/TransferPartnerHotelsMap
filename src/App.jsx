import { useState } from 'react'
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

  const programIds = resolveProgramIds(cardIds)
  const canSearch = cardIds.length > 0 && cityKey && !loading

  async function search() {
    setLoading(true)
    const results = await provider.search({ cityKey, programIds })
    setHotels(results)
    const c = cities[cityKey]
    setCenter(c ? { lat: c.lat, lng: c.lng } : null)
    setLoading(false)
  }

  return (
    <main className="container">
      <header>
        <h1>Transfer Partner Hotels Map</h1>
        <p className="tagline">
          Hotels your credit card's points transfer partners support — on a map.
        </p>
      </header>

      <CardSelector selected={cardIds} onChange={setCardIds} />
      <CitySearch value={cityKey} onChange={setCityKey} />

      {programIds.length > 0 && (
        <p className="programs">
          Reaches:{' '}
          {programIds.map((id) => (
            <span key={id} className="pill">{programName(id)}</span>
          ))}
        </p>
      )}

      <button className="search-btn" disabled={!canSearch} onClick={search}>
        {loading ? 'Searching…' : 'Find hotels'}
      </button>

      {hotels && (
        <section className="results">
          <h2>{hotels.length} hotel{hotels.length === 1 ? '' : 's'}</h2>
          <div className="results-grid">
            <div className="map-pane">
              <MapView
                center={center}
                hotels={hotels}
                activeId={activeId}
                onHover={setActiveId}
                onSelect={setActiveId}
              />
            </div>
            <HotelList
              hotels={hotels}
              activeId={activeId}
              onHover={setActiveId}
              onSelect={setActiveId}
            />
          </div>
        </section>
      )}
    </main>
  )
}
