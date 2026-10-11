export const MOCK_EVENTS = [
  {
    id: "tm_mock_001",
    name: "Coldplay Live in Concert",
    type: "event",
    url: "https://www.ticketmaster.com",
    locale: "en-us",
    images: [
      {
        ratio: "16_9",
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
        width: 1000,
        height: 562,
      }
    ],
    dates: {
      start: {
        localDate: "2026-11-20",
        localTime: "19:30:00",
      },
      status: {
        code: "onsale",
      },
    },
    classifications: [
      {
        segment: { name: "Music" },
        genre: { name: "Pop" },
      },
    ],
    priceRanges: [
      {
        currency: "USD",
        min: 65.0,
        max: 250.0,
      },
    ],
    _embedded: {
      venues: [
        {
          name: "Wembley Stadium",
          city: { name: "London" },
          country: { name: "United Kingdom" },
          address: { line1: "Wembley Stadium, Wembley" },
          postalCode: "HA9 0WS",
        },
      ],
    },
    info: "Live concert performance featuring music from Coldplay.",
  },
  {
    id: "tm_mock_002",
    name: "Basketball Championship Final",
    type: "event",
    url: "https://www.ticketmaster.com",
    locale: "en-us",
    images: [
      {
        ratio: "16_9",
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80",
        width: 1000,
        height: 562,
      },
    ],
    dates: {
      start: {
        localDate: "2026-12-05",
        localTime: "20:00:00",
      },
      status: { code: "onsale" },
    },
    classifications: [
      {
        segment: { name: "Sports" },
        genre: { name: "Basketball" },
      },
    ],
    priceRanges: [
      {
        currency: "USD",
        min: 120.0,
        max: 500.0,
      },
    ],
    _embedded: {
      venues: [
        {
          name: "Madison Square Garden",
          city: { name: "New York" },
          country: { name: "United States" },
          address: { line1: "4 Pennsylvania Plaza" },
          postalCode: "10001",
        },
      ],
    },
    info: "Annual basketball championship game.",
  },
  {
    id: "tm_mock_003",
    name: "Hamilton Musical Theatre",
    type: "event",
    url: "https://www.ticketmaster.com",
    locale: "en-us",
    images: [
      {
        ratio: "16_9",
        url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80",
        width: 1000,
        height: 562,
      },
    ],
    dates: {
      start: {
        localDate: "2026-11-28",
        localTime: "19:00:00",
      },
      status: { code: "onsale" },
    },
    classifications: [
      {
        segment: { name: "Arts & Theatre" },
        genre: { name: "Theatre" },
      },
    ],
    priceRanges: [
      {
        currency: "USD",
        min: 90.0,
        max: 300.0,
      },
    ],
    _embedded: {
      venues: [
        {
          name: "Richard Rodgers Theatre",
          city: { name: "New York" },
          country: { name: "United States" },
          address: { line1: "226 W 46th St" },
          postalCode: "10036",
        },
      ],
    },
    info: "Hamilton broadway musical drama.",
  },
  {
    id: "tm_mock_004",
    name: "City Film Festival Screening",
    type: "event",
    url: "https://www.ticketmaster.com",
    locale: "en-us",
    images: [
      {
        ratio: "16_9",
        url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
        width: 1000,
        height: 562,
      },
    ],
    dates: {
      start: {
        localDate: "2026-12-12",
        localTime: "18:00:00",
      },
      status: { code: "onsale" },
    },
    classifications: [
      {
        segment: { name: "Film" },
        genre: { name: "Festival" },
      },
    ],
    priceRanges: [
      {
        currency: "USD",
        min: 25.0,
        max: 60.0,
      },
    ],
    _embedded: {
      venues: [
        {
          name: "Dolby Theatre",
          city: { name: "Los Angeles" },
          country: { name: "United States" },
          address: { line1: "6801 Hollywood Blvd" },
          postalCode: "90028",
        },
      ],
    },
    info: "Independent short films and filmmaker discussions.",
  },
  {
    id: "tm_mock_005",
    name: "Annual Web Tech Conference",
    type: "event",
    url: "https://www.ticketmaster.com",
    locale: "en-us",
    images: [
      {
        ratio: "16_9",
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
        width: 1000,
        height: 562,
      },
    ],
    dates: {
      start: {
        localDate: "2026-11-15",
        localTime: "09:00:00",
      },
      status: { code: "onsale" },
    },
    classifications: [
      {
        segment: { name: "Miscellaneous" },
        genre: { name: "Conference" },
      },
    ],
    priceRanges: [
      {
        currency: "USD",
        min: 100.0,
        max: 350.0,
      },
    ],
    _embedded: {
      venues: [
        {
          name: "Moscone Center",
          city: { name: "San Francisco" },
          country: { name: "United States" },
          address: { line1: "747 Howard St" },
          postalCode: "94103",
        },
      ],
    },
    info: "Conference about modern web frameworks, frontend development, and APIs.",
  },
  {
    id: "tm_mock_006",
    name: "Summer Food and Music Fair (Past Event)",
    type: "event",
    url: "https://www.ticketmaster.com",
    locale: "en-us",
    images: [
      {
        ratio: "16_9",
        url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80",
        width: 1000,
        height: 562,
      },
    ],
    dates: {
      start: {
        localDate: "2026-06-15",
        localTime: "12:00:00",
      },
      status: { code: "onsale" },
    },
    classifications: [
      {
        segment: { name: "Miscellaneous" },
        genre: { name: "Food & Drink" },
      },
    ],
    priceRanges: [
      {
        currency: "USD",
        min: 20.0,
        max: 50.0,
      },
    ],
    _embedded: {
      venues: [
        {
          name: "Grant Park",
          city: { name: "Chicago" },
          country: { name: "United States" },
          address: { line1: "337 E Randolph St" },
          postalCode: "60601",
        },
      ],
    },
    info: "Outdoor food truck festival and local music performances.",
  }
];
