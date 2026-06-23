// The catalog is the in-browser "control plane" data: the editable JSON mapping
// of cards -> points currency -> hotel transfer partners -> brands.
// Everything here is derived from static JSON files; no backend.

import cards from '../data/cards.json'
import currencies from '../data/currencies.json'
import hotelPrograms from '../data/hotelPrograms.json'
import transferPartners from '../data/transferPartners.json'

// [{ id, name, issuer, currencyId, currencyName }], sorted by issuer then name.
export function getCards() {
  return Object.entries(cards)
    .map(([id, card]) => ({
      id,
      name: card.name,
      issuer: card.issuer,
      currencyId: card.currencyId,
      currencyName: currencies[card.currencyId]?.name ?? card.currencyId,
    }))
    .sort((a, b) => a.issuer.localeCompare(b.issuer) || a.name.localeCompare(b.name))
}

export { cards, currencies, hotelPrograms, transferPartners }
