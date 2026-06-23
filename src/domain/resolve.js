// Resolution: selected card ids -> the set of hotel programs you can reach.
// cards -> points currency -> transfer partners -> hotel programs (deduped union).

import { cards, transferPartners, hotelPrograms } from './catalog.js'

// Unique currency ids for the selected cards.
function currencyIdsForCards(cardIds) {
  return [...new Set(cardIds.map((id) => cards[id]?.currencyId).filter(Boolean))]
}

// Deduped list of hotel program ids reachable from the selected cards.
export function resolveProgramIds(cardIds) {
  const currencyIds = new Set(currencyIdsForCards(cardIds))
  const programIds = transferPartners
    .filter((tp) => currencyIds.has(tp.currencyId))
    .map((tp) => tp.hotelProgramId)
  return [...new Set(programIds)]
}

export function programName(programId) {
  return hotelPrograms[programId]?.name ?? programId
}
