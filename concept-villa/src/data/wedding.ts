export const wedding = {
  bride: 'Marvy',
  groom: 'Georges',
  initials: { a: 'M', b: 'G' },
  tagline: 'Where love writes its forever',
  date: '2026-06-30T18:00:00-04:00',
  dateDisplay: '30 June 2026',
  location: 'Niagara-on-the-Lake, Ontario',
  contactEmail: 'mbaskhairoun@gmail.com',

  ceremony: {
    time: '6:00 PM',
    venue: 'The Hare Wine Co.',
    address: '769 Niagara Stone Rd, Niagara-on-the-Lake, ON',
  },
  reception: {
    time: '7:30 PM',
    venue: 'The Barrel Room — The Hare Wine Co.',
    address: 'Brick, barrels, and string lights, all evening.',
  },

  timeline: [
    {
      time: '6:00 PM',
      title: 'The Ceremony',
      detail: 'Vows beneath the brick arch.',
      icon: 'rings',
    },
    {
      time: '6:30 PM',
      title: 'Cocktail Hour',
      detail: 'Wines from the house, on the lawn.',
      icon: 'flutes',
    },
    {
      time: '7:30 PM',
      title: 'Dinner & Toasts',
      detail: 'A long-table feast in the barrel room.',
      icon: 'wreath',
    },
    {
      time: '9:00 PM',
      title: 'First Dance',
      detail: 'Candlelit, slow, ours.',
      icon: 'dance',
    },
    {
      time: '11:30 PM',
      title: 'Send-off',
      detail: 'Sparklers down the vines.',
      icon: 'sparkler',
    },
  ],

  accommodations: [
    {
      name: 'Riverbend Inn & Vineyard',
      blurb:
        'A Georgian manor wrapped in vines, ten minutes from the venue.',
      url: 'https://maps.google.com/?q=Riverbend+Inn+Niagara-on-the-Lake',
    },
    {
      name: 'Pillar and Post',
      blurb:
        'Old World rooms in the heart of Old Town. Walk to dinner from your door.',
      url: 'https://maps.google.com/?q=Pillar+and+Post+Niagara-on-the-Lake',
    },
  ],

  transportation: {
    note:
      'Niagara-on-the-Lake is about ninety minutes from Toronto Pearson by car. We will arrange shuttles between the inns above and the venue from 5:30 PM until midnight — let us know in your RSVP if you would like a seat.',
  },

  dressCode: {
    title: 'Cocktail Chic',
    note:
      'Light and airy — think linen, cream, sage, and summer wine. Heels live a hard life on grass; consider this a warning.',
    swatches: [
      { name: 'Ivory', hex: '#f5ede0' },
      { name: 'Champagne', hex: '#d6b985' },
      { name: 'Dusty Rose', hex: '#c79e8e' },
      { name: 'Sage', hex: '#8a9b7f' },
    ],
  },

  faqs: [
    {
      q: 'Can I bring a plus-one?',
      a: 'Plus-ones are listed on each invitation. If yours includes one, we can’t wait to meet them.',
    },
    {
      q: 'Are children welcome?',
      a: 'We’re keeping the evening grown-up. Babes in arms are always the exception.',
    },
    {
      q: 'What if I have dietary restrictions?',
      a: 'Tell us in your RSVP. The kitchen is gracious and accommodating.',
    },
    {
      q: 'Where should I stay?',
      a: 'See the Accommodations section for two of our favorites — both are minutes from the venue.',
    },
    {
      q: 'Will there be parking?',
      a: 'Yes — a long gravel drive with plenty of room. Shuttles are also planned, so you’re free to leave the keys at home.',
    },
  ],

  rsvp: {
    deadline: '15 May 2026',
    subject: 'RSVP — Marvy & Georges, June 30, 2026',
    body:
      'Hi! I’m responding to your invitation:\n\nName(s):\nAttending: Yes / No\nPlus-one (if invited):\nDietary notes:\nSong request:\nShuttle from inn? Yes / No\n',
  },
} as const;

export type Wedding = typeof wedding;
