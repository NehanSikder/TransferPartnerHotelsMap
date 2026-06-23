// MapView — the stable, backend-agnostic seam between the app and the map engine.
//
// Contract (every implementation must honor exactly this):
//   props: {
//     center: { lat, lng } | null,   // recenters when it changes; null = no search yet
//     zoom?: number,                 // default 13
//     hotels: Hotel[],               // { id, name, program, rating, lat, lng, website }
//     activeId: string | null,       // which hotel is highlighted (synced with the list)
//     onHover: (id | null) => void,  // pointer enters/leaves a marker
//     onSelect: (id) => void,        // marker clicked (also opens website)
//   }
//
// To switch map engines (e.g. Leaflet -> Google Maps), implement GoogleMap.jsx to
// this same contract and change ONLY the import/export below. Nothing else in the
// app references a specific map library.

export { default as MapView } from './LeafletMap.jsx'
