export const invitation = {
  names: { a: "Georges", b: "Marvy" },
  tagline: "are getting engaged",
  date: {
    iso: "2026-06-30T18:00:00-04:00",
    display: "Tuesday, June 30, 2026",
    time: "6:00 in the evening",
    note: "June 30th is a Tuesday — but Canada Day is the very next day, so everyone is off.",
  },
  venue: {
    name: "The Hare Wine Co.",
    address: "769 Niagara Stone Rd, Niagara-on-the-Lake, ON",
    city: "St. Catharines / Niagara, Ontario",
    mapsUrl: "https://maps.google.com/?q=The+Hare+Wine+Co+Niagara",
  },
  dresscode: {
    title: "Cocktail Chic",
    detail: "Light & airy suits and dresses. Think linen, cream, sage, and summer wine.",
  },
  bar: "Open bar all evening",
  rsvp: {
    placeholder: "RSVP opens soon — look up your name here.",
  },
};

export type PageKey =
  | "cover"
  | "welcome"
  | "date"
  | "venue"
  | "schedule"
  | "dresscode"
  | "bar"
  | "rsvp";
