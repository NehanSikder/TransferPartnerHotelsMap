// Static hotel provider: reads bundled seed hotels. No API key required.
// Implements the HotelProvider contract:
//   search({ cityKey, programIds }) -> Promise<Hotel[]>
//   Hotel = { id, name, programId, program, rating, lat, lng, website }

import staticHotels from '../data/staticHotels.json'
import { programName } from '../domain/resolve.js'

export const staticProvider = {
  id: 'static',
  async search({ cityKey, programIds }) {
    const programs = new Set(programIds)
    return staticHotels
      .filter((h) => h.city === cityKey && programs.has(h.programId))
      .map((h) => ({
        id: h.id,
        name: h.name,
        programId: h.programId,
        program: programName(h.programId),
        rating: h.rating,
        lat: h.lat,
        lng: h.lng,
        website: h.website,
      }))
  },
}
