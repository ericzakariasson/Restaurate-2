export const TYPE_OF_PLACES = [
  { 
    label: 'Restaurang', 
    value: 'restaurant' 
  }, 
  { 
    label: 'Café', 
    value: 'cafe' 
  }
];

export const RATE_TREE = [
  {
    name: 'food',
    label: 'Mat',
    children: [
      {
        name: 'taste',
        label: 'Smak'
      },
      {
        name: 'quality',
        label: 'Råvaror'
      }
    ]
  },
  {
    name: 'service',
    label: 'Service',
    children: [
      {
        name: 'treatment',
        label: 'Bemötande'
      },
      {
        name: 'knowledge',
        label: 'Kunskap'
      }
    ]
  },
  {
    name: 'experience',
    label: 'Upplevelse'
  }
]

export const PRICE_LEVELS = [
  { value: 1, label: 'Billig' },
  { value: 2, label: 'Medel' },
  { value: 3, label: 'Dyr' },
  { value: 4, label: 'Exklusiv' },
];

export const COMMENT_MAX_LENGTH = 160;