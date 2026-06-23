import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// divIcon avoids Leaflet's default marker-image bundling issue and lets us style
// the active/highlighted pin via CSS.
function pinIcon(active) {
  return L.divIcon({
    className: 'map-pin-wrap',
    html: `<span class="map-pin${active ? ' active' : ''}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  })
}

// Recenters the map when a new search sets a new center.
function Recenter({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView([center.lat, center.lng], zoom)
  }, [center, zoom, map])
  return null
}

const US_CENTER = { lat: 39.5, lng: -98.35 }

export default function LeafletMap({
  center,
  zoom = 13,
  hotels,
  activeId,
  onHover,
  onSelect,
}) {
  const start = center ?? US_CENTER
  return (
    <MapContainer
      center={[start.lat, start.lng]}
      zoom={center ? zoom : 4}
      scrollWheelZoom
      zoomControl={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter center={center} zoom={zoom} />
      {hotels.map((h) => (
        <Marker
          key={h.id}
          position={[h.lat, h.lng]}
          icon={pinIcon(h.id === activeId)}
          eventHandlers={{
            mouseover: () => onHover?.(h.id),
            mouseout: () => onHover?.(null),
            click: () => {
              onSelect?.(h.id)
              window.open(h.website, '_blank', 'noopener')
            },
          }}
        >
          <Popup>
            <strong>{h.name}</strong>
            <br />
            {h.program}
            {h.rating ? ` · ★ ${h.rating}` : ''}
            <br />
            <a href={h.website} target="_blank" rel="noopener noreferrer">
              Visit site →
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
