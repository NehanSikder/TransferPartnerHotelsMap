// Provider factory — the swappable seam of the control plane.
// Today: static seed data. Commit 4 adds a Google Places provider here,
// selected by config/key availability without touching the data plane.

import { staticProvider } from './staticProvider.js'

export function getHotelProvider() {
  return staticProvider
}
