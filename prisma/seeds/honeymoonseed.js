const travelPackage = [
  {
    title: "Romantic Wales Honeymoon Getaway",
    slug: "romantic-wales-honeymoon-getaway",
    shortDesc:
      "Experience a perfect romantic escape through Cardiff and the stunning mountain valleys of Snowdonia.",
    description:
      "A meticulously curated honeymoon package for couples. Explore historic castles, peaceful countryside resorts, and scenic train rides with complete peace of mind.",

    price: 2499,
    duration: {
      days: 6,
      nights: 5
    },

    month: "june",
    star: 4,
    type: "honeymoon",

    country: "United Kingdom",
    city: "Wales",
    category: "honeymoon",
    featured: true,
    hotels: {
      create: [
        {
          name: "Hilton Cardiff",
          city: "Cardiff",
          durationNights: 3,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Elegant city hotel located near Cardiff Castle and the main shopping district, offering comfortable rooms and romantic city views."
        },
        {
          name: "Royal Victoria Hotel Snowdonia",
          city: "Snowdonia / North Wales",
          durationNights: 2,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Beautiful countryside hotel located inside Snowdonia National Park with mountain views and peaceful surroundings perfect for honeymoon couples."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/wales1.jpg" },
        { url: "imgs/honeymoon/wales2.jpg" },
        { url: "imgs/honeymoon/wales3.jpg" },
        { url: "imgs/honeymoon/wales4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "London Heathrow (LHR)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "British Airways"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "London Heathrow → Cardiff Hotel → Snowdonia → Heathrow Airport",
        extras:
          "Optional scenic drives through Welsh countryside, coastal routes, and mountain valleys."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion:
          "UK Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Cardiff Castle – Historic castle in the city center",
          "Cardiff Bay – Waterfront restaurants and romantic walks",
          "National Museum Cardiff – Art and history collections",
          "Snowdonia National Park – Mountains, lakes, and scenic views",
          "Mount Snowdon – Wales' highest peak with railway access",
          "Conwy Castle – UNESCO medieval fortress"
        ],
        romanticExperiences: [
          "Sunset picnic in Snowdonia National Park",
          "Couples spa & wellness treatments at countryside resorts",
          "Scenic train ride to Mount Snowdon summit",
          "Candlelight dinner overlooking Cardiff Bay"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Northern Cyprus Honeymoon Escape",
    slug: "romantic-northern-cyprus-honeymoon-escape",
    shortDesc:
      "A luxury Mediterranean escape through the romantic harbor of Kyrenia and the beachfront resorts of Famagusta.",
    description:
      "Discover the perfect blend of historic charm and seaside luxury. Enjoy rooftop infinity pools, Roman ruins, medieval castles, and pristine private beaches with your companion.",

    price: 1999, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Cyprus",
    city: "Northern Cyprus",
    category: "honeymoon",
    featured: true,

    // 1. Hotels (One-to-Many nested models)
    hotels: {
      create: [
        {
          name: "The Arkin Colony Hotel",
          city: "Kyrenia (Girne)",
          durationNights: 3,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury hotel in the heart of Kyrenia with rooftop pool, spa facilities, and romantic views of the Mediterranean Sea."
        },
        {
          name: "Salamis Bay Conti Resort Hotel",
          city: "Famagusta",
          durationNights: 1,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Beachfront resort offering private beach access, spa facilities, and relaxing honeymoon atmosphere."
        }
      ]
    },

    // 2. Images (Placeholder paths following your structure)
    images: {
      create: [
        { url: "imgs/honeymoon/cyprus1.jpg" },
        { url: "imgs/honeymoon/cyprus2.jpg" },
        { url: "imgs/honeymoon/cyprus3.jpg" },
        { url: "imgs/honeymoon/cyprus4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Ercan International Airport (ECN)",
        airlines: [
          "Turkish Airlines",
          "Pegasus Airlines",
          "Qatar Airways"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Ercan Airport → Kyrenia Hotel → Famagusta → Ercan Airport",
        extras:
          "Optional scenic coastal drives along the Mediterranean coastline and Kyrenia mountain range."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion:
          "Northern Cyprus tourist entry assistance for Pakistani travelers (via Turkey transit route)",
        agency: "VFS Global / Turkish Embassy",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Hotel reservations",
          "Flight bookings",
          "Travel insurance"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Kyrenia Harbour – Romantic waterfront cafés",
          "Kyrenia Castle – Historic fortress overlooking the sea",
          "Bellapais Abbey – Medieval monastery with panoramic views",
          "Salamis Ancient City – Roman ruins and amphitheater",
          "Othello Castle – Historic Venetian fortress",
          "Beaches along the eastern Mediterranean coast"
        ],
        romanticExperiences: [
          "Sunset dinner overlooking Kyrenia Harbour",
          "Couples spa treatments at beachfront resorts",
          "Private Mediterranean yacht cruise",
          "Romantic beach picnic near Salamis ruins"
        ],
        guideIncluded: true
      }
    }
  },  {
    title: "Romantic San Marino Medieval Honeymoon",
    slug: "romantic-san-marino-medieval-honeymoon",
    shortDesc:
      "A luxury microstate getaway featuring sweeping Adriatic coast views, medieval fortress walks, and premium spa treatments.",
    description:
      "Perched high on Mount Titano, experience a fairytale honeymoon in one of the world's oldest republics. Stay in the historic center of San Marino City, enjoy candlelight dining overlooking the coast, and explore ancient stone alleys with private guided tours.",

    price: 2699, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "San Marino",
    city: "San Marino City",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Grand Hotel San Marino",
          city: "San Marino City",
          durationNights: 4,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury hotel in the historic center of San Marino with panoramic views of the Adriatic coast, elegant rooms, and romantic amenities perfect for honeymoon couples."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/sanmarino1.jpg" },
        { url: "imgs/honeymoon/sanmarino2.jpg" },
        { url: "imgs/honeymoon/sanmarino3.jpg" },
        { url: "imgs/honeymoon/sanmarino4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Rimini Federico Fellini Airport (RMI)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Alitalia / ITA Airways"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Rimini Airport → San Marino Hotel → Rimini Airport for departure",
        extras:
          "Optional scenic drives through the Adriatic coast and Apennine foothills."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Guaita Tower / Three Towers of San Marino – Iconic medieval mountain fortresses",
          "Basilica di San Marino – Historic cathedral and cultural sightseeing",
          "Piazza della Libertà – Scenic square with government palace views",
          "Funicular ride between Borgo Maggiore and San Marino City",
          "Rimini beaches and seaside promenade excursion (Italy)",
          "Day trip to Rimini – Historic streets, Roman arches, and Italian cuisine"
        ],
        romanticExperiences: [
          "Sunset viewpoint picnic at Guaita Tower",
          "Couples spa and wellness treatments at Grand Hotel San Marino",
          "Candlelight dinner with panoramic Adriatic views",
          "Private guided tour of medieval alleys and towers"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Liechtenstein Alpine Honeymoon Escape",
    slug: "romantic-liechtenstein-alpine-honeymoon-escape",
    shortDesc:
      "A luxury boutique escape featuring dramatic Rhine Valley landscapes, private vineyard wine tasting, and premium Alpine spa retreats.",
    description:
      "Nestled between Switzerland and Austria, experience an exclusive fairytale honeymoon in the heart of the Alps. Stay at a premier boutique hotel in Vaduz, enjoy sunset picnics overlooking the Rhine Valley, and explore royal castle pathways with a private guide.",

    price: 2899, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Liechtenstein",
    city: "Vaduz",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Park Hotel Sonnenhof",
          city: "Vaduz",
          durationNights: 4,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury boutique hotel with panoramic views of the Rhine Valley and Alps, offering elegant rooms, spa facilities, and romantic settings ideal for honeymoon couples."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/liechtenstein1.jpg" },
        { url: "imgs/honeymoon/liechtenstein2.jpg" },
        { url: "imgs/honeymoon/liechtenstein3.jpg" },
        { url: "imgs/honeymoon/liechtenstein4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Zurich Airport (ZRH)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Swiss International Air Lines"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Zurich Airport → Vaduz Hotel → Zurich Airport for departure",
        extras:
          "Optional scenic drives through Liechtenstein countryside, Rhine Valley, and surrounding Alpine routes."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Vaduz Castle – Official royal residence overlooking the city with panoramic valley views",
          "Kunstmuseum Liechtenstein – Modern and contemporary art museum experience",
          "Liechtenstein National Museum – Cultural exploration of deep-rooted local history",
          "Scenic mountain walk along the iconic Rhine River paths",
          "Malbun ski resort excursion for Alpine mountain activities (seasonal)",
          "Exclusive wine tasting experience at the Prince of Liechtenstein vineyards",
          "Day trip extension to neighboring historic Sankt Gallen or pristine Lake Constance"
        ],
        romanticExperiences: [
          "Couples luxury spa and wellness treatments at Park Hotel Sonnenhof",
          "Private sunset picnic overlooking the dramatic Rhine Valley",
          "Romantic horseback riding trail session deep in the Alps",
          "Candlelight dinner at the hotel terrace with panoramic mountain and valley views"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Vatican City & Rome Luxury Honeymoon",
    slug: "romantic-vatican-city-rome-luxury-honeymoon",
    shortDesc:
      "An upscale Roman escape featuring private rooftop views of St. Peter’s Basilica, guided historical tours, and classical twilight carriage rides.",
    description:
      "Immerse yourselves in history and timeless romance in the heart of Rome. Stay steps away from the Vatican, admire Michelangelo's iconic masterpieces with a private guide, and enjoy exquisite candlelight dining overlooking the illuminated historic skyline.",

    price: 2599, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Italy",
    city: "Rome",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Hotel Atlante Star",
          city: "Rome (Vatican Area)",
          durationNights: 4,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury hotel located near Vatican City, offering elegant rooms, rooftop terrace with views of St. Peter’s Basilica, and romantic amenities perfect for honeymoon couples."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/rome1.jpg" },
        { url: "imgs/honeymoon/rome2.jpg" },
        { url: "imgs/honeymoon/rome3.jpg" },
        { url: "imgs/honeymoon/rome4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Rome Fiumicino Airport (FCO)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Alitalia / ITA Airways"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Rome Fiumicino Airport → Hotel → Airport for departure",
        extras:
          "Optional guided walking tours around Vatican City and Rome included."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "St. Peter’s Basilica – Comprehensive guided tour including exclusive dome climb access",
          "Sistine Chapel – World-famous masterpiece viewing of Michelangelo's historical frescoes",
          "Vatican Museums – In-depth exploration of vast art, history, and religious collections",
          "St. Peter’s Square – Iconic open plaza perfect for memorable photos and sunset strolls",
          "Colosseum & Roman Forum guided historical excursion highlight option",
          "Trevi Fountain & Spanish Steps iconic monument sightseeing walk",
          "Piazza Navona and the Pantheon classical architecture exploration"
        ],
        romanticExperiences: [
          "Private sunset rooftop dinner with breathtaking views of St. Peter’s Basilica",
          "Couples luxury spa and wellness treatments directly at the hotel facilities",
          "Romantic private horse-drawn carriage ride through historic Roman streets",
          "Atmospheric evening candlelight stroll through Piazza Navona and Ponte Sant’Angelo"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Kosovo Heritage & Culture Honeymoon",
    slug: "romantic-kosovo-heritage-culture-honeymoon",
    shortDesc:
      "A charming cultural escape through the modern vibrant streets of Pristina and the romantic, historic Ottoman-era alleys of Prizren.",
    description:
      "Immerse yourselves in Southeastern Europe's hidden gem. Discover dramatic fortress sunsets, stroll across ancient stone bridges, and relax with private riverside candlelight dining and premium boutique hotel stays tailored for couples.",

    price: 1849, // Estimated base price in £ pp
    duration: {
      days: 6,
      nights: 5
    },

    month: "june",
    star: 4,
    type: "honeymoon",

    country: "Kosovo",
    city: "Pristina & Prizren",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Hotel Sirius",
          city: "Pristina",
          durationNights: 3,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Modern hotel in the capital city offering comfortable rooms, romantic ambiance, and convenient access to cultural landmarks."
        },
        {
          name: "Marigona Hotel",
          city: "Prizren",
          durationNights: 2,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Charming boutique hotel in historic Prizren with river views and easy access to Ottoman-era streets and architecture."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/kosovo1.jpg" },
        { url: "imgs/honeymoon/kosovo2.jpg" },
        { url: "imgs/honeymoon/kosovo3.jpg" },
        { url: "imgs/honeymoon/kosovo4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Pristina International Airport (PRN)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Pristina International Airport → Pristina Hotel → Prizren → Pristina Airport for departure",
        extras:
          "Optional scenic drives included along Kosovo countryside and historical sites."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen / Kosovo Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Newborn Monument – Iconic contemporary city landmark in Pristina",
          "Mother Teresa Square – Central pedestrian promenade exploration",
          "Germia Park – Nature walks, scenic hikes, and tranquil forest spots",
          "Sinan Pasha Mosque – Breathtaking 17th-century Ottoman architecture",
          "Prizren Fortress / Kaljaja – Stunning panoramic sunset views over the town",
          "Historic stone-arched bridges and cobblestone old town alleyways"
        ],
        romanticExperiences: [
          "Sunset picnic at Prizren Fortress overlooking the historical city skyline",
          "Couples specialized spa & wellness treatments at selected boutique hotels",
          "Private guided walking tour through old town and cobblestone streets",
          "Evening candlelight dinner along the flowing Bistrica River in Prizren"
        ],
        guideIncluded: true
      }
    }
  },  {
    title: "Romantic Transnistria Heritage & Culture Honeymoon",
    slug: "romantic-transnistria-heritage-culture-honeymoon",
    shortDesc:
      "An intriguing cultural journey through the retro-Soviet streets of Tiraspol, historic Ottoman river fortresses, and pristine Dniester valleys.",
    description:
      "Step back into a uniquely preserved chapter of history for a truly distinct honeymoon experience. Stay in premium central accommodation, explore ancient castles, stroll along tranquil river promenades, and indulge in private local vineyard culinary picnics.",

    price: 1799, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 4,
    type: "honeymoon",

    country: "Moldova / Transnistria",
    city: "Tiraspol & Bender",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Russia Hotel",
          city: "Tiraspol",
          durationNights: 3,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Comfortable hotel in central Tiraspol with modern amenities, city views, and easy access to main attractions."
        },
        {
          name: "Hotel Prieteniya",
          city: "Bender",
          durationNights: 1,
          starRating: 3,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Cozy hotel near historic landmarks and the Dniester River, ideal for exploring the town’s culture and history."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/transnistria1.jpg" },
        { url: "imgs/honeymoon/transnistria2.jpg" },
        { url: "imgs/honeymoon/transnistria3.jpg" },
        { url: "imgs/honeymoon/transnistria4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Chișinău International Airport (RMO)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Chișinău International Airport → Tiraspol Hotel → Bender → Chișinău Airport for departure",
        extras:
          "Optional scenic drives along the Dniester River valley and countryside with guide border control accompaniment."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Transnistria entry permit & Moldova travel authorization support for Pakistani travelers",
        agency: "VFS Global / Registration upon arrival",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Hotel reservations",
          "Travel insurance",
          "Flight bookings"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Suvorov Square – Main historic public square and iconic monuments in Tiraspol",
          "House of Soviets – Spectacular vintage mid-century monument and architecture",
          "Tranquil walking tour along the scenic Dniester river promenade paths",
          "Bender Fortress – Massive historical medieval Ottoman fortress complex",
          "Bender old town exploration including traditional local open-air markets",
          "Panoramic riverside sunset viewpoints over the sweeping valley"
        ],
        romanticExperiences: [
          "Romantic sunset stroll directly along the Dniester River banks",
          "Private custom culinary tasting menu featuring Moldovan and Transnistrian cuisine",
          "Couples specialized cultural tour exploring unique Soviet heritage landmarks",
          "Private romantic countryside picnic near the pristine vineyards outside Tiraspol"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Abkhazia Black Sea & Mountains Honeymoon",
    slug: "romantic-abkhazia-black-sea-mountains-honeymoon",
    shortDesc:
      "A breathtaking seaside escape featuring romantic Black Sea sunsets in Sukhumi and sub-tropical mountain spa luxury in Gagra.",
    description:
      "Escape to the dramatic intersection of the Caucasus Mountains and the Black Sea coast. Discover iconic maritime colonnades, explore hidden alpine lakes, relax in top-tier sub-tropical wellness resorts, and experience private candlelight dining with complete border-crossing assistance.",

    price: 1899, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Georgia / Abkhazia",
    city: "Sukhumi & Gagra",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Hotel Inter-Sukhum",
          city: "Sukhumi",
          durationNights: 3,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Comfortable seaside hotel located along the Black Sea coast, offering ocean views, peaceful surroundings, and romantic sunset scenery."
        },
        {
          name: "Amra Park Hotel & Spa",
          city: "Gagra",
          durationNights: 1,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury resort surrounded by mountains and sea views, perfect for couples seeking relaxation and spa experiences."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/abkhazia1.jpg" },
        { url: "imgs/honeymoon/abkhazia2.jpg" },
        { url: "imgs/honeymoon/abkhazia3.jpg" },
        { url: "imgs/honeymoon/abkhazia4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Sochi International Airport (AER)",
        airlines: [
          "Qatar Airways",
          "Turkish Airlines",
          "Emirates"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Sochi Airport → Abkhazia Hotels → Sochi Airport for departure",
        extras:
          "Optional scenic drives included along the Black Sea coast and Caucasus mountains with guide border accompaniment."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Abkhazia entry permit & Russian double-entry visa support for Pakistani travelers",
        agency: "VFS Global / Pre-arrival clearance authorities",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Sukhumi Botanical Garden – Historic sub-tropical flora sanctuary",
          "Sukhumi Embankment – Romantic seaside promenade path walk",
          "Abkhazian State Museum – Cultural and regional historical exhibitions",
          "Gagra Colonnade – Iconic elegant seaside landmark structural ruin",
          "Ritsa National Park – Breathtaking mountain lake and pristine nature reserve",
          "Scenic Black Sea coastal beaches and mountain valley viewpoints"
        ],
        romanticExperiences: [
          "Tranquil sunset stroll directly along the Black Sea coast in Sukhumi",
          "Couples luxury spa and wellness treatments at Amra Park Hotel",
          "Private custom excursion to the emerald Lake Ritsa deep in the mountains",
          "Romantic candlelight dinner directly overlooking the panoramic sea horizon"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic South Ossetia Mountain Honeymoon Escape",
    slug: "romantic-south-ossetia-mountain-honeymoon-escape",
    shortDesc:
      "An exclusive Alpine retreat combining cultural discovery in Tskhinvali with peaceful, secluded mountain romance in the Caucasus peaks of Java.",
    description:
      "Venture deep into the majestic Caucasus Mountains for a truly unique and unforgettable honeymoon. Stay in cozy city and mountain lodges, explore dramatic gorges and alpine valleys with a private guide, and celebrate your union with candlelit Ossetian dining and private sunset viewpoints.",

    price: 1850, // Estimated base price in £ pp
    duration: {
      days: 6,
      nights: 5
    },

    month: "june",
    star: 4,
    type: "honeymoon",

    country: "Georgia / South Ossetia",
    city: "Tskhinvali & Java",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Alan Hotel",
          city: "Tskhinvali",
          durationNights: 3,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Comfortable city hotel offering mountain views, cozy rooms, and convenient access to cultural and historical attractions."
        },
        {
          name: "Iryston Hotel",
          city: "Java / Mountain Region",
          durationNights: 2,
          starRating: 3,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Peaceful mountain lodge surrounded by Caucasus landscapes, ideal for couples seeking a quiet romantic escape."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/southossetia1.jpg" },
        { url: "imgs/honeymoon/southossetia2.jpg" },
        { url: "imgs/honeymoon/southossetia3.jpg" },
        { url: "imgs/honeymoon/southossetia4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Beslan Airport / Vladikavkaz (OGZ)",
        airlines: [
          "Qatar Airways",
          "Turkish Airlines",
          "Emirates"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Vladikavkaz Airport → Tskhinvali Hotel → Java → Vladikavkaz Airport for departure",
        extras:
          "Optional scenic drives through Caucasus mountains and alpine valleys with dedicated guide assistance for border formalities."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "South Ossetia entry permit & Russian double-entry visa support for Pakistani travelers",
        agency: "VFS Global / Pre-clearance transit coordination",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Hotel reservations",
          "Travel insurance",
          "Flight bookings"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Tskhinvali Central Square – Vibrant cultural and historical heart of the city",
          "South Ossetian State Museum – Rich discovery of regional heritage and deep history",
          "Leisurly walking tours through traditional markets and local artisan cafés",
          "Kudaro Gorge – Breathtaking mountain gaps with towering rock faces",
          "Dzau Valley – Picturesque nature walks and panoramic landscape photography spots",
          "Scenic high-altitude drives through pristine alpine ridges"
        ],
        romanticExperiences: [
          "Private custom mountain picnic nestled in the scenic Kudaro Gorge",
          "Couples relaxing wellness and sauna sessions in a quiet mountain lodge setting",
          "Stunning secret sunset viewpoints overlooking the sweeping Caucasus Range",
          "Traditional candlelit Ossetian dinner accompanied by authentic local acoustic music"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Northern Cyprus Mediterranean Honeymoon",
    slug: "romantic-northern-cyprus-mediterranean-honeymoon",
    shortDesc:
      "A luxury coastal getaway combining the vibrant historic harbor of Kyrenia with the pristine beachfront resorts of Famagusta.",
    description:
      "Escape to the sun-drenched shores of Northern Cyprus. Stay in premium 5-star luxury resorts, explore ancient Roman ruins and medieval castles, sail on a private yacht cruise, and indulge in beachfront spa treatments designed exclusively for couples.",

    price: 2199, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Cyprus",
    city: "Northern Cyprus",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "The Arkin Colony Hotel",
          city: "Kyrenia (Girne)",
          durationNights: 3,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury hotel in the heart of Kyrenia with rooftop pool, spa facilities, and romantic views of the Mediterranean Sea."
        },
        {
          name: "Salamis Bay Conti Resort Hotel",
          city: "Famagusta",
          durationNights: 1,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Beachfront resort offering private beach access, spa facilities, and relaxing honeymoon atmosphere."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/cyprus1.jpg" },
        { url: "imgs/honeymoon/cyprus2.jpg" },
        { url: "imgs/honeymoon/cyprus3.jpg" },
        { url: "imgs/honeymoon/cyprus4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Ercan International Airport (ECN)",
        airlines: [
          "Turkish Airlines",
          "Pegasus Airlines",
          "Qatar Airways"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Ercan International Airport → Kyrenia Hotel → Famagusta → Ercan Airport for departure",
        extras:
          "Optional scenic coastal drives included along the Mediterranean coastline and Kyrenia mountain range."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Northern Cyprus tourist entry assistance for Pakistani travelers",
        agency: "VFS Global (via Turkey transit route guidance)",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Hotel reservations",
          "Flight bookings",
          "Travel insurance"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Kyrenia Harbour – Romantic waterfront walks and lively seaside cafés",
          "Kyrenia Castle – Historic coastal fortress overlooking the Mediterranean Sea",
          "Bellapais Abbey – Medieval monastery ruins with panoramic hillside views",
          "Salamis Ancient City – Exploration of iconic Roman ruins and the amphitheater",
          "Othello Castle – Historic Venetian fortress landmark in Famagusta",
          "Pristine beaches along the breathtaking eastern Mediterranean coast"
        ],
        romanticExperiences: [
          "Sunset dinner overlooking the shimmering Kyrenia Harbour",
          "Couples specialized spa & wellness treatments at luxury beachfront resorts",
          "Private Mediterranean yacht cruise for a romantic day at sea",
          "Secluded romantic beach picnic near the historic Salamis ruins"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Imperial Russia Luxury Honeymoon",
    slug: "imperial-russia-luxury-honeymoon",
    shortDesc:
      "A grand 5-star journey blending the historic power of Moscow with the breathtaking imperial canals and palaces of Saint Petersburg.",
    description:
      "Walk in the footsteps of royalty across Red Square and the gilded halls of the Hermitage. Stay at world-class luxury properties, journey between cities via the high-speed Sapsan train, and indulge in horse-drawn carriage rides and private river cruises tailored for the ultimate romantic escape.",

    price: 2999, // Estimated base price in £ pp
    duration: {
      days: 8,
      nights: 7
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Russia",
    city: "Moscow & Saint Petersburg",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Ararat Park Hyatt Moscow",
          city: "Moscow",
          durationNights: 4,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury hotel located in central Moscow, offering elegant rooms, city views, and romantic ambiance, perfect for honeymoon couples."
        },
        {
          name: "Belmond Grand Hotel Europe",
          city: "Saint Petersburg",
          durationNights: 3,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Historic luxury hotel in the heart of Saint Petersburg, featuring opulent rooms, spa facilities, and easy access to cultural landmarks."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/russia1.jpg" },
        { url: "imgs/honeymoon/russia2.jpg" },
        { url: "imgs/honeymoon/russia3.jpg" },
        { url: "imgs/honeymoon/russia4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Moscow Sheremetyevo Airport (SVO)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Aeroflot"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle & High-Speed Train",
        routeDetails:
          "Moscow Sheremetyevo Airport → Moscow Hotel → Saint Petersburg (via Sapsan Train) → Moscow Sheremetyevo Airport for departure",
        extras:
          "Optional scenic drives included along Moscow city center and Saint Petersburg riverside routes."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Russian Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Red Square & The Kremlin – The historic and political heart of Moscow",
          "Saint Basil’s Cathedral – Iconic multi-colored domed architectural masterpiece",
          "GUM Shopping Mall – Historic and elegant arcade department store",
          "Hermitage Museum & Winter Palace – World-renowned premier art museum in Saint Petersburg",
          "Church of the Savior on Spilled Blood – Spectacular mosaic-filled landmark",
          "Nevsky Prospect – Vibrant central avenue strolling and cultural exploration",
          "Peterhof Palace excursion option featuring magnificent fountains and royal gardens",
          "Scenic boat ride tour option along the historic Saint Petersburg canals"
        ],
        romanticExperiences: [
          "Private sunset cruise along the gliding Moscow River",
          "Couples premium spa & wellness treatments in both Moscow and Saint Petersburg",
          "Candlelight dinner at luxury rooftop restaurants with panoramic city views",
          "Classic horse-drawn carriage ride through Saint Petersburg Old Town alleys",
          "Private guided walking tours of the majestic Peterhof gardens at sunset"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Monaco & French Riviera Luxury Honeymoon",
    slug: "romantic-monaco-french-riviera-luxury-honeymoon",
    shortDesc:
      "An ultra-luxury Mediterranean escape featuring iconic Monte Carlo suites, private Riviera yacht cruises, and world-class Michelin-starred dining.",
    description:
      "Experience a world of unmatched glamour and timeless romance in the heart of Monaco. Stay at the world-renowned Hôtel de Paris Monte-Carlo, stroll through the royal cobblestone alleys of Monaco-Ville, and indulge in private helicopter tours and sunset picnics overlooking the brilliant French Riviera.",

    price: 4999, // Estimated base price in £ pp (Ultra-Luxury tier)
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Monaco",
    city: "Monte Carlo",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Hôtel de Paris Monte-Carlo",
          city: "Monte Carlo",
          durationNights: 4,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Iconic luxury hotel in the heart of Monte Carlo with stunning views of the Mediterranean, elegant suites, and world-class dining — perfect for a romantic honeymoon."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/monaco1.jpg" },
        { url: "imgs/honeymoon/monaco2.jpg" },
        { url: "imgs/honeymoon/monaco3.jpg" },
        { url: "imgs/honeymoon/monaco4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Nice Côte d’Azur Airport (NCE)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Air France"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Nice Côte d’Azur Airport → Monte Carlo Hotel → Nice Airport for departure",
        extras:
          "Optional scenic drives along the spectacular French Riviera coastline included."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Monte Carlo Casino – Tour the iconic gaming house with opulent Belle Époque architecture",
          "Larvotto Beach – Sun-soaked relaxation along the upscale Mediterranean beachfront",
          "Japanese Garden – Quiet and romantic strolls through stylized zen garden spaces",
          "Prince’s Palace of Monaco – Explore the centuries-old royal heritage and historic state rooms",
          "Oceanographic Museum – Historic cliffside sanctuary featuring massive marine science exhibits",
          "Monaco-Ville – Enchanting evening walks through historic medieval stone alleys"
        ],
        romanticExperiences: [
          "Private custom yacht sunset cruise along the glittering French Riviera coastline",
          "Couples specialized luxury spa and thermal wellness therapy sessions at the hotel",
          "Candlelight dinner at the legendary Le Louis XV – Alain Ducasse three-star restaurant",
          "Breathtaking private helicopter sightseeing tour over Monaco and neighboring coastal peaks"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic North Macedonia Lakes & Heritage Honeymoon",
    slug: "romantic-north-macedonia-lakes-heritage-honeymoon",
    shortDesc:
      "A captivating cultural escape combining the grand architecture of Skopje with the serene, ancient lakeside charm of Lake Ohrid.",
    description:
      "Journey into a land of deep history and breathtaking natural beauty. Explore Ottoman-era bazaars, stroll through majestic cliffside churches overlooking crystalline waters, and relax with private lakeside candlelight dining and premium 5-star accommodations tailored for your romantic escape.",

    price: 1949, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "North Macedonia",
    city: "Skopje & Ohrid",
    category: "honeymoon",
    featured: true,

    // 1. Hotels
    hotels: {
      create: [
        {
          name: "Hotel Marriott Skopje",
          city: "Skopje",
          durationNights: 2,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury hotel in the heart of Skopje with panoramic views of the Vardar River, perfect for romantic stays."
        },
        {
          name: "Hotel Belvedere",
          city: "Ohrid",
          durationNights: 2,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Boutique lakeside hotel with stunning views of Lake Ohrid and the surrounding mountains, ideal for honeymoon couples."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/macedonia1.jpg" },
        { url: "imgs/honeymoon/macedonia2.jpg" },
        { url: "imgs/honeymoon/macedonia3.jpg" },
        { url: "imgs/honeymoon/macedonia4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Skopje International Airport (SKP)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Etihad Airways"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Skopje International Airport → Skopje Hotel → Ohrid Transfer → Skopje Airport for departure",
        extras:
          "Optional scenic drives included along the Vardar Valley and the stunning Lake Ohrid coastline routes."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Skopje Fortress (Kale) – Historic defensive walls overlooking the city skyline",
          "Stone Bridge – Iconic Ottoman-era bridge linking the old and new city squares",
          "Old Bazaar – Vibrant cultural maze of historic shops, teahouses, and mosques",
          "Memorial House of Mother Teresa – Moving tribute site in central Skopje",
          "Lake Ohrid – Leisurely exploration of one of Europe's oldest and deepest lakes",
          "Ohrid Old Town – Atmospheric cobblestone paths lined with traditional architecture",
          "Church of St. John at Kaneo – Landmark cliffside church with iconic lake panoramic backdrops",
          "Saint Naum Monastery – Historic springs and monastery excursion near the border"
        ],
        romanticExperiences: [
          "Private boat ride on the tranquil waters of Lake Ohrid at sunset",
          "Couples specialized spa & wellness therapy treatments at Hotel Belvedere",
          "Candlelight dinner at a premium waterfront restaurant overlooking Lake Ohrid",
          "Serene sunset walk through the scenic paths of Ohrid Old Town",
          "Exclusive wine tasting session sampling local varietals at vineyards near Ohrid"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Estonia Baltic Gems & Coastline Honeymoon",
    slug: "romantic-estonia-baltic-gems-coastline-honeymoon",
    shortDesc:
      "A fairytale Baltic journey blending the medieval romance of Tallinn, the cultural charm of Tartu, and the luxury seaside spa retreats of Pärnu.",
    description:
      "Step into a fairytale world of cobblestone alleys and modern seaside luxury. Stay at elite 5-star boutique hotels, stroll through imperial palace gardens, and completely unwind with world-class couples' spa therapies on the peaceful Baltic coast.",

    price: 2499, // Estimated base price in £ pp
    duration: {
      days: 8,
      nights: 7
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Estonia",
    city: "Tallinn, Tartu & Pärnu",
    category: "honeymoon",
    featured: true,

    // 1. Hotels (One-to-Many nested models)
    hotels: {
      create: [
        {
          name: "Hotel Telegraaf Tallinn",
          city: "Tallinn",
          durationNights: 4,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury boutique hotel in Tallinn Old Town with elegant rooms, romantic ambiance, and close access to historic sites."
        },
        {
          name: "Hotel Antonius",
          city: "Tartu",
          durationNights: 2,
          starRating: 4,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Charming boutique hotel in the historic center of Tartu, perfect for couples exploring Estonian culture."
        },
        {
          name: "Estonia Resort Hotel & Spa",
          city: "Pärnu / Estonian Coast",
          durationNights: 1,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury seaside resort with spa and wellness facilities, ideal for a romantic getaway."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/estonia1.jpg" },
        { url: "imgs/honeymoon/estonia2.jpg" },
        { url: "imgs/honeymoon/estonia3.jpg" },
        { url: "imgs/honeymoon/estonia4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Tallinn Airport (TLL)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Finnair"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Tallinn Airport → Tallinn Hotel → Tartu → Pärnu → Tallinn Airport for departure",
        extras:
          "Optional scenic drives included through the beautiful Estonian countryside, deep pine forests, and serene Baltic coastlines."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Tallinn Old Town – Unmatched medieval walled city architecture and cobblestone paths",
          "Alexander Nevsky Cathedral – Grand and ornate Russian Revival orthodox cathedral",
          "Kadriorg Palace – Beautiful petrine baroque palace built for Catherine I by Peter the Great",
          "Toompea Castle – Historic fortress seat of the Estonian Parliament on Toompea hill",
          "Tartu University & Town Hall Square – Vibrant academic heart and neoclassical architecture",
          "Emajõgi River walk – Scenic and peaceful riverside paths in the historic city of Tartu",
          "Pärnu Beach & Old Town – Sandy white beaches and pastel timber resort villas"
        ],
        romanticExperiences: [
          "Private sunset cruise navigating along the beautiful Tallinn Bay",
          "Exclusive couples' luxury spa and thermal wellness treatments at Estonia Resort Hotel",
          "Intimate candlelight dinner inside the historical vault cellars of Tallinn Old Town",
          "Romantic afternoon picnic nestled inside the manicured gardens of Kadriorg Park",
          "Charming horse-drawn carriage ride traversing the central historic squares of Tallinn"
        ],
        guideIncluded: true
      }
    }
  },
    {
    title: "Romantic Latvia Baltic Elegance & Coastline Honeymoon",
    slug: "romantic-latvia-baltic-elegance-coastline-honeymoon",
    shortDesc:
      "A sophisticated Baltic escape pairing the historic architectural opulence of Riga with the serene beachfront spa luxury of Jūrmala.",
    description:
      "Experience timeless charm and coastal romance in Latvia. Stay at the world-class Grand Hotel Kempinski Riga, wander through fairy-tale medieval lanes, and completely unwind with private beach access and luxury spa treatments overlooking the Gulf of Riga.",

    price: 2399, // Estimated base price in £ pp
    duration: {
      days: 5,
      nights: 4
    },

    month: "june",
    star: 5,
    type: "honeymoon",

    country: "Latvia",
    city: "Riga & Jūrmala",
    category: "honeymoon",
    featured: true,

    // 1. Hotels (One-to-Many nested models)
    hotels: {
      create: [
        {
          name: "Grand Hotel Kempinski Riga",
          city: "Riga",
          durationNights: 3,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Luxury city-center hotel with elegant interiors, rooftop views, and romantic ambiance, located near Riga Old Town."
        },
        {
          name: "Baltic Beach Hotel & SPA",
          city: "Jūrmala / Latvian Coast",
          durationNights: 1,
          starRating: 5,
          roomType: "Double / Twin Honeymoon Room",
          description:
            "Seaside resort offering private beach access, spa facilities, and panoramic views of the Gulf of Riga, perfect for honeymoon relaxation."
        }
      ]
    },

    // 2. Images
    images: {
      create: [
        { url: "imgs/honeymoon/latvia1.jpg" },
        { url: "imgs/honeymoon/latvia2.jpg" },
        { url: "imgs/honeymoon/latvia3.jpg" },
        { url: "imgs/honeymoon/latvia4.jpg" }
      ]
    },

    // 3. Flights
    flights: {
      create: {
        departureCities: ["Lahore", "Islamabad", "Karachi"],
        destination: "Riga International Airport (RIX)",
        airlines: [
          "Qatar Airways",
          "Emirates",
          "Turkish Airlines",
          "Finnair"
        ],
        classOption: "Economy Class (Business Class upgrades available)"
      }
    },

    // 4. Transportation
    transportation: {
      create: {
        type: "Private Air-Conditioned Vehicle",
        routeDetails:
          "Riga Airport → Riga Hotel → Jūrmala → Riga Airport for departure",
        extras:
          "Optional scenic drives included along the picturesque Latvian countryside and the scenic Gulf of Riga coastline."
      }
    },

    // 5. Visa Assistance
    visaAssistance: {
      create: {
        supportedRegion: "Schengen Tourist Visa support for Pakistani travelers",
        agency: "VFS Global",
        requiredDocuments: [
          "Valid passport",
          "Passport-size photos",
          "Flight reservations",
          "Hotel confirmations",
          "Travel insurance",
          "Bank statements"
        ]
      }
    },

    // 6. Sightseeing / Activities
    sightseeing: {
      create: {
        items: [
          "Riga Old Town – Enchanting walks through a UNESCO World Heritage medieval center",
          "House of the Blackheads – Marvel at the iconic and ornate 14th-century architectural guild hall",
          "Riga Cathedral – Explore one of the largest and most historic medieval churches in the Baltics",
          "Freedom Monument – Important landmark honoring Latvian national history",
          "Daugava River promenade – Optional romantic evening walk along the riverbanks",
          "Jūrmala Beach – Relax along miles of pristine, white-sand Baltic coastline",
          "Dzintari Forest Park – Romantic strolls among old pine trees and architectural wooden cottages"
        ],
        romanticExperiences: [
          "Private sunset cruise navigating across the beautiful Gulf of Riga",
          "Couples specialized luxury spa and thermal wellness treatments at Baltic Beach Hotel",
          "Candlelight dinner at a premium restaurant overlooking the beach in Jūrmala",
          "Romantic afternoon picnic setup inside the scenic Riga City Canal Park",
          "Charming horse-drawn carriage ride traversing the cobblestone alleys of Riga Old Town"
        ],
        guideIncluded: true
      }
    }
  }

];

export default travelPackage;