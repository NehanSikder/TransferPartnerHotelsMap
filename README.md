# TransferPartnerHotelsMap

A map of hotels in a city that your credit card's **points transfer partners** support.

Enter your card(s) + a city → get pins on a map + a list of hotels you can reach
by transferring that card's points. Click a pin or row → opens the hotel's website.
No login, no points math — just discovery.

## How it works (the model)

```
Card ──belongs to──> PointsCurrency ──transfers to──> HotelProgram ──has──> Brands ──> Hotels
```

A **card** earns a **points currency** (many cards share one — Amex Gold & Platinum
both earn Membership Rewards). A currency **transfers to** a set of **hotel programs**
(World of Hyatt, IHG, …). Each program has **brands** (Hyatt → Park Hyatt, Andaz, …)
used to find/classify hotels.

All of this lives in editable JSON files under `server/src/data/` — no database.

## Control plane / data plane

- **Data plane** (what users see): the React app + the one read endpoint
  `GET /api/hotels`. It knows nothing about how hotels are sourced.
- **Control plane** (the brains): the JSON mapping + swappable `HotelProvider`s.
  - `StaticHotelProvider` — seed JSON, runs with **no API keys**.
  - `GooglePlacesProvider` — live data (set keys in `.env`).
  - Future: a background indexer that populates a hotel store per partner.

## Run it

```bash
# 1. Backend (port 4000) — works with zero keys on static data
cd server && npm install && npm run dev

# 2. Frontend (port 5173) — in a second terminal
cd client && npm install && npm run dev
```

Open http://localhost:5173. The map needs a Google Maps JS key (see
`client/.env.example`); without it you still get the synced hotel list.

To switch to live hotel data, set `HOTEL_PROVIDER=google` and the Google keys in
`server/.env`.
