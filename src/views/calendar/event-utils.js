let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '형오 오사카',
    start: "2024-12-30",
    end: "2025-01-04"
  },
]

export function createEventId() {
  return String(eventGuid++)
}
