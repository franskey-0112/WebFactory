// Static data for MasterTicket - Ticketmaster clone

// Fixed dates to ensure reproducibility (not system dependent)
const fixedDates = {
  today: '2024-03-15',
  thisWeek: [
    '2024-03-15', '2024-03-16', '2024-03-17', '2024-03-18', 
    '2024-03-19', '2024-03-20', '2024-03-21'
  ],
  thisMonth: [
    '2024-03-15', '2024-03-16', '2024-03-17', '2024-03-18', '2024-03-19', '2024-03-20', '2024-03-21',
    '2024-03-22', '2024-03-23', '2024-03-24', '2024-03-25', '2024-03-26', '2024-03-27', '2024-03-28',
    '2024-03-29', '2024-03-30', '2024-03-31', '2024-04-01', '2024-04-02', '2024-04-03', '2024-04-04',
    '2024-04-05', '2024-04-06', '2024-04-07', '2024-04-08', '2024-04-09', '2024-04-10', '2024-04-11',
    '2024-04-12', '2024-04-13', '2024-04-14', '2024-04-15'
  ],
  nextMonth: [
    '2024-04-16', '2024-04-17', '2024-04-18', '2024-04-19', '2024-04-20', '2024-04-21', '2024-04-22',
    '2024-04-23', '2024-04-24', '2024-04-25', '2024-04-26', '2024-04-27', '2024-04-28', '2024-04-29',
    '2024-04-30', '2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04', '2024-05-05', '2024-05-06',
    '2024-05-07', '2024-05-08', '2024-05-09', '2024-05-10', '2024-05-11', '2024-05-12', '2024-05-13',
    '2024-05-14', '2024-05-15'
  ]
};

// Artists data
const artists = [
  {
    id: 'taylor-swift',
    name: 'Taylor Swift',
    genre: 'Pop',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Grammy-winning pop superstar known for hits like "Shake It Off" and "Anti-Hero"',
    followers: 89500000,
    verified: true,
    upcomingShows: 8
  },
  {
    id: 'ed-sheeran',
    name: 'Ed Sheeran',
    genre: 'Pop/Folk',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'British singer-songwriter known for "Shape of You" and "Perfect"',
    followers: 47200000,
    verified: true,
    upcomingShows: 12
  },
  {
    id: 'coldplay',
    name: 'Coldplay',
    genre: 'Alternative Rock',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'British rock band known for "Yellow", "Viva La Vida", and spectacular live performances',
    followers: 35800000,
    verified: true,
    upcomingShows: 6
  },
  {
    id: 'billie-eilish',
    name: 'Billie Eilish',
    genre: 'Alternative Pop',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'Grammy-winning artist known for "Bad Guy" and unique style',
    followers: 42100000,
    verified: true,
    upcomingShows: 9
  },
  {
    id: 'beyonce',
    name: 'Beyoncé',
    genre: 'R&B/Pop',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Iconic performer and Grammy winner, known for powerful vocals and stage presence',
    followers: 71300000,
    verified: true,
    upcomingShows: 4
  },
  {
    id: 'harry-styles',
    name: 'Harry Styles',
    genre: 'Pop Rock',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Former One Direction member turned solo artist, known for "Watermelon Sugar"',
    followers: 39600000,
    verified: true,
    upcomingShows: 7
  },
  
  // Additional Pop/Rock Artists
  {
    id: 'ariana-grande',
    name: 'Ariana Grande',
    genre: 'Pop/R&B',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Multi-platinum artist known for powerful vocals and hits like "Thank U, Next"',
    followers: 85200000,
    verified: true,
    upcomingShows: 11
  },
  {
    id: 'bruno-mars',
    name: 'Bruno Mars',
    genre: 'Pop/Funk',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Grammy-winning entertainer known for "Uptown Funk" and energetic performances',
    followers: 38900000,
    verified: true,
    upcomingShows: 9
  },
  {
    id: 'dua-lipa',
    name: 'Dua Lipa',
    genre: 'Pop/Dance',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'British pop sensation known for "Levitating" and disco-influenced sound',
    followers: 44700000,
    verified: true,
    upcomingShows: 14
  },
  {
    id: 'the-weeknd',
    name: 'The Weeknd',
    genre: 'R&B/Pop',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Canadian R&B star known for "Blinding Lights" and atmospheric sound',
    followers: 52100000,
    verified: true,
    upcomingShows: 8
  },
  {
    id: 'adele',
    name: 'Adele',
    genre: 'Pop/Soul',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'British soul singer known for powerful ballads like "Hello" and "Someone Like You"',
    followers: 31500000,
    verified: true,
    upcomingShows: 6
  },
  {
    id: 'olivia-rodrigo',
    name: 'Olivia Rodrigo',
    genre: 'Pop/Alternative',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Rising star known for "Driver\'s License" and emotional songwriting',
    followers: 28900000,
    verified: true,
    upcomingShows: 16
  },
  
  // Rock/Alternative Artists
  {
    id: 'imagine-dragons',
    name: 'Imagine Dragons',
    genre: 'Alternative Rock',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'American rock band known for "Radioactive" and anthemic stadium rock',
    followers: 27800000,
    verified: true,
    upcomingShows: 13
  },
  {
    id: 'twenty-one-pilots',
    name: 'Twenty One Pilots',
    genre: 'Alternative/Indie',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Duo known for genre-blending music and energetic live performances',
    followers: 24300000,
    verified: true,
    upcomingShows: 18
  },
  {
    id: 'arctic-monkeys',
    name: 'Arctic Monkeys',
    genre: 'Indie Rock',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'British indie rock band known for clever lyrics and guitar-driven sound',
    followers: 19700000,
    verified: true,
    upcomingShows: 10
  },
  {
    id: 'foo-fighters',
    name: 'Foo Fighters',
    genre: 'Rock',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Legendary rock band led by Dave Grohl, known for powerful live shows',
    followers: 22400000,
    verified: true,
    upcomingShows: 7
  },
  {
    id: 'red-hot-chili-peppers',
    name: 'Red Hot Chili Peppers',
    genre: 'Rock/Funk',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Iconic funk rock band known for energetic performances and unique style',
    followers: 18900000,
    verified: true,
    upcomingShows: 9
  },
  
  // Hip-Hop/Rap Artists
  {
    id: 'drake',
    name: 'Drake',
    genre: 'Hip-Hop/Rap',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Canadian rapper and singer, one of the best-selling music artists worldwide',
    followers: 78300000,
    verified: true,
    upcomingShows: 12
  },
  {
    id: 'kendrick-lamar',
    name: 'Kendrick Lamar',
    genre: 'Hip-Hop/Rap',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Pulitzer Prize-winning rapper known for socially conscious lyrics',
    followers: 34200000,
    verified: true,
    upcomingShows: 8
  },
  {
    id: 'post-malone',
    name: 'Post Malone',
    genre: 'Hip-Hop/Pop',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Genre-blending artist known for melodic rap and rock influences',
    followers: 41800000,
    verified: true,
    upcomingShows: 15
  },
  {
    id: 'travis-scott',
    name: 'Travis Scott',
    genre: 'Hip-Hop/Rap',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Houston rapper known for psychedelic sound and high-energy performances',
    followers: 37600000,
    verified: true,
    upcomingShows: 11
  },
  
  // Electronic/Dance Artists
  {
    id: 'calvin-harris',
    name: 'Calvin Harris',
    genre: 'Electronic/Dance',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Scottish DJ and producer known for massive EDM hits and collaborations',
    followers: 26700000,
    verified: true,
    upcomingShows: 22
  },
  {
    id: 'david-guetta',
    name: 'David Guetta',
    genre: 'Electronic/Dance',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'French DJ who helped bring EDM to mainstream pop music',
    followers: 23400000,
    verified: true,
    upcomingShows: 28
  },
  {
    id: 'marshmello',
    name: 'Marshmello',
    genre: 'Electronic/Dance',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Masked DJ known for melodic electronic music and gaming collaborations',
    followers: 31200000,
    verified: true,
    upcomingShows: 25
  },
  {
    id: 'deadmau5',
    name: 'deadmau5',
    genre: 'Electronic/Progressive',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Canadian electronic music producer known for progressive house and iconic mouse head',
    followers: 18600000,
    verified: true,
    upcomingShows: 19
  },
  
  // Country Artists
  {
    id: 'luke-combs',
    name: 'Luke Combs',
    genre: 'Country',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Chart-topping country star known for heartfelt lyrics and powerful voice',
    followers: 16400000,
    verified: true,
    upcomingShows: 21
  },
  {
    id: 'carrie-underwood',
    name: 'Carrie Underwood',
    genre: 'Country/Pop',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'American Idol winner turned country superstar with powerful vocals',
    followers: 14800000,
    verified: true,
    upcomingShows: 13
  },
  {
    id: 'blake-shelton',
    name: 'Blake Shelton',
    genre: 'Country',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Country music veteran and TV personality known for traditional country sound',
    followers: 13200000,
    verified: true,
    upcomingShows: 17
  },
  
  // Jazz/Blues Artists
  {
    id: 'john-mayer',
    name: 'John Mayer',
    genre: 'Blues/Rock',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Grammy-winning guitarist and singer-songwriter known for blues-influenced pop',
    followers: 21700000,
    verified: true,
    upcomingShows: 14
  },
  {
    id: 'alicia-keys',
    name: 'Alicia Keys',
    genre: 'R&B/Soul',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'Multi-Grammy winner known for soulful voice and piano-driven songs',
    followers: 19300000,
    verified: true,
    upcomingShows: 10
  },
  
  // International Artists
  {
    id: 'bad-bunny',
    name: 'Bad Bunny',
    genre: 'Reggaeton/Latin',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Puerto Rican reggaeton star, one of the most-streamed artists globally',
    followers: 62400000,
    verified: true,
    upcomingShows: 16
  },
  {
    id: 'bts',
    name: 'BTS',
    genre: 'K-Pop',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Global K-pop sensation with massive international fanbase',
    followers: 94700000,
    verified: true,
    upcomingShows: 5
  },
  {
    id: 'blackpink',
    name: 'BLACKPINK',
    genre: 'K-Pop',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'South Korean girl group with global pop appeal and fashion influence',
    followers: 56800000,
    verified: true,
    upcomingShows: 7
  }
];

// Venues data
const venues = [
  {
    id: 'madison-square-garden',
    name: 'Madison Square Garden',
    city: 'New York',
    state: 'NY',
    address: '4 Pennsylvania Plaza, New York, NY 10001',
    capacity: 20000,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'The World\'s Most Famous Arena',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Boxes', 'Merchandise'],
    sections: {
      floor: { name: 'Floor', priceMultiplier: 3.0, rows: 'A-Z', seats: '1-30' },
      lower: { name: 'Lower Bowl', priceMultiplier: 2.0, rows: '1-20', seats: '1-25' },
      upper: { name: 'Upper Bowl', priceMultiplier: 1.0, rows: '200-230', seats: '1-20' }
    }
  },
  {
    id: 'staples-center',
    name: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    address: '1111 S Figueroa St, Los Angeles, CA 90015',
    capacity: 20000,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Premier entertainment venue in downtown Los Angeles',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Suites', 'Merchandise'],
    sections: {
      floor: { name: 'Floor', priceMultiplier: 3.0, rows: 'A-Z', seats: '1-30' },
      lower: { name: 'Lower Bowl', priceMultiplier: 2.0, rows: '100-120', seats: '1-28' },
      upper: { name: 'Upper Bowl', priceMultiplier: 1.0, rows: '300-330', seats: '1-22' }
    }
  },
  {
    id: 'wembley-stadium',
    name: 'Wembley Stadium',
    city: 'London',
    state: 'UK',
    address: 'Wembley, London HA9 0WS, United Kingdom',
    capacity: 90000,
    type: 'Stadium',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Iconic stadium and home of football',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Boxes', 'Merchandise', 'Hotels Nearby'],
    sections: {
      pitch: { name: 'Pitch Standing', priceMultiplier: 2.5, rows: 'GA', seats: 'Standing' },
      lower: { name: 'Lower Tier', priceMultiplier: 2.0, rows: '1-30', seats: '1-40' },
      upper: { name: 'Upper Tier', priceMultiplier: 1.0, rows: '500-550', seats: '1-35' }
    }
  },
  {
    id: 'royal-albert-hall',
    name: 'Royal Albert Hall',
    city: 'London',
    state: 'UK',
    address: 'Kensington Gore, South Kensington, London SW7 2AP',
    capacity: 5272,
    type: 'Concert Hall',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    description: 'Historic concert hall opened by Queen Victoria in 1871',
    amenities: ['Accessibility', 'Concessions', 'VIP Boxes', 'Historic Architecture'],
    sections: {
      stalls: { name: 'Stalls', priceMultiplier: 2.5, rows: 'A-Z', seats: '1-35' },
      circle: { name: 'Circle', priceMultiplier: 2.0, rows: 'A-M', seats: '1-30' },
      gallery: { name: 'Gallery', priceMultiplier: 1.0, rows: 'A-K', seats: '1-25' }
    }
  },
  {
    id: 'hollywood-bowl',
    name: 'Hollywood Bowl',
    city: 'Los Angeles',
    state: 'CA',
    address: '2301 N Highland Ave, Los Angeles, CA 90068',
    capacity: 17500,
    type: 'Amphitheater',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    description: 'Iconic outdoor amphitheater with stunning city views',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'Picnic Areas', 'Wine Bar'],
    sections: {
      pool: { name: 'Pool Circle', priceMultiplier: 3.0, rows: 'A-F', seats: '1-32' },
      terrace: { name: 'Terrace', priceMultiplier: 2.0, rows: 'T1-T8', seats: '1-40' },
      bench: { name: 'Bench', priceMultiplier: 1.0, rows: 'U1-W3', seats: '1-50' }
    }
  },
  {
    id: 'red-rocks',
    name: 'Red Rocks Amphitheatre',
    city: 'Morrison',
    state: 'CO',
    address: '18300 W Alameda Pkwy, Morrison, CO 80465',
    capacity: 9525,
    type: 'Natural Amphitheater',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Naturally formed amphitheater between red sandstone formations',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'Nature Trails', 'Visitor Center'],
    sections: {
      reserved: { name: 'Reserved', priceMultiplier: 2.0, rows: '1-70', seats: '1-40' },
      general: { name: 'General Admission', priceMultiplier: 1.0, rows: 'GA', seats: 'Standing' }
    }
  },

  // Additional Major Arenas
  {
    id: 'united-center',
    name: 'United Center',
    city: 'Chicago',
    state: 'IL',
    address: '1901 W Madison St, Chicago, IL 60612',
    capacity: 23500,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Home of the Chicago Bulls and Blackhawks, iconic sports and entertainment venue',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Suites', 'Merchandise', 'Restaurants'],
    sections: {
      floor: { name: 'Floor', priceMultiplier: 3.5, rows: 'A-Z', seats: '1-30' },
      lower: { name: 'Lower Level', priceMultiplier: 2.2, rows: '100-130', seats: '1-28' },
      upper: { name: 'Upper Level', priceMultiplier: 1.0, rows: '300-340', seats: '1-25' }
    }
  },
  {
    id: 'td-garden',
    name: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    address: '100 Legends Way, Boston, MA 02114',
    capacity: 19580,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Premier Boston arena hosting major concerts and sporting events',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Boxes', 'Pro Shop', 'Restaurants'],
    sections: {
      floor: { name: 'Floor', priceMultiplier: 3.2, rows: 'A-Y', seats: '1-32' },
      loge: { name: 'Loge Level', priceMultiplier: 2.0, rows: '1-16', seats: '1-24' },
      balcony: { name: 'Balcony', priceMultiplier: 1.0, rows: '301-330', seats: '1-20' }
    }
  },
  {
    id: 'american-airlines-center',
    name: 'American Airlines Center',
    city: 'Dallas',
    state: 'TX',
    address: '2500 Victory Ave, Dallas, TX 75219',
    capacity: 20000,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Modern arena in Dallas hosting top entertainment and sports events',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Suites', 'Merchandise', 'Dining'],
    sections: {
      floor: { name: 'Floor', priceMultiplier: 3.0, rows: 'A-Z', seats: '1-30' },
      lower: { name: 'Lower Bowl', priceMultiplier: 2.1, rows: '100-125', seats: '1-26' },
      upper: { name: 'Upper Bowl', priceMultiplier: 1.0, rows: '300-335', seats: '1-22' }
    }
  },
  {
    id: 'barclays-center',
    name: 'Barclays Center',
    city: 'Brooklyn',
    state: 'NY',
    address: '620 Atlantic Ave, Brooklyn, NY 11217',
    capacity: 19000,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'State-of-the-art arena in Brooklyn with cutting-edge design',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Clubs', 'Merchandise', 'Fine Dining'],
    sections: {
      floor: { name: 'Floor', priceMultiplier: 3.1, rows: 'A-Z', seats: '1-28' },
      lower: { name: 'Lower Bowl', priceMultiplier: 2.0, rows: '1-25', seats: '1-30' },
      upper: { name: 'Upper Bowl', priceMultiplier: 1.0, rows: '200-235', seats: '1-24' }
    }
  },

  // Stadium Venues
  {
    id: 'soldier-field',
    name: 'Soldier Field',
    city: 'Chicago',
    state: 'IL',
    address: '1410 Special Olympics Dr, Chicago, IL 60605',
    capacity: 61500,
    type: 'Stadium',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Historic stadium with modern amenities, perfect for major concerts',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Boxes', 'Merchandise', 'Tailgating'],
    sections: {
      field: { name: 'Field Level', priceMultiplier: 2.8, rows: 'GA', seats: 'Standing' },
      lower: { name: 'Lower Bowl', priceMultiplier: 2.0, rows: '100-150', seats: '1-35' },
      upper: { name: 'Upper Bowl', priceMultiplier: 1.0, rows: '400-450', seats: '1-30' }
    }
  },
  {
    id: 'fenway-park',
    name: 'Fenway Park',
    city: 'Boston',
    state: 'MA',
    address: '4 Yawkey Way, Boston, MA 02215',
    capacity: 37755,
    type: 'Baseball Stadium',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Iconic baseball stadium hosting select concerts with unique atmosphere',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'Green Monster', 'Merchandise', 'History Tours'],
    sections: {
      field: { name: 'Field Box', priceMultiplier: 2.5, rows: '1-30', seats: '1-25' },
      pavilion: { name: 'Pavilion', priceMultiplier: 1.8, rows: '1-20', seats: '1-35' },
      grandstand: { name: 'Grandstand', priceMultiplier: 1.0, rows: '1-35', seats: '1-40' }
    }
  },
  {
    id: 'metlife-stadium',
    name: 'MetLife Stadium',
    city: 'East Rutherford',
    state: 'NJ',
    address: '1 MetLife Stadium Dr, East Rutherford, NJ 07073',
    capacity: 82500,
    type: 'Stadium',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Massive stadium venue perfect for the biggest touring acts',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Suites', 'Merchandise', 'Multiple Entrances'],
    sections: {
      field: { name: 'Field Level', priceMultiplier: 2.6, rows: 'GA', seats: 'Standing' },
      lower: { name: 'Lower Bowl', priceMultiplier: 1.8, rows: '100-150', seats: '1-40' },
      upper: { name: 'Upper Bowl', priceMultiplier: 1.0, rows: '300-350', seats: '1-35' }
    }
  },

  // Theater and Concert Halls
  {
    id: 'carnegie-hall',
    name: 'Carnegie Hall',
    city: 'New York',
    state: 'NY',
    address: '881 7th Ave, New York, NY 10019',
    capacity: 2804,
    type: 'Concert Hall',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    description: 'World-renowned concert hall with exceptional acoustics and history',
    amenities: ['Accessibility', 'Concessions', 'Historic Architecture', 'VIP Boxes', 'Museum'],
    sections: {
      parquet: { name: 'Parquet', priceMultiplier: 3.5, rows: 'A-Z', seats: '1-30' },
      dress: { name: 'Dress Circle', priceMultiplier: 2.5, rows: 'A-O', seats: '1-28' },
      balcony: { name: 'Balcony', priceMultiplier: 1.5, rows: 'A-Y', seats: '1-25' }
    }
  },
  {
    id: 'radio-city',
    name: 'Radio City Music Hall',
    city: 'New York',
    state: 'NY',
    address: '1260 6th Ave, New York, NY 10020',
    capacity: 6015,
    type: 'Theater',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    description: 'Art Deco masterpiece and premier entertainment venue',
    amenities: ['Accessibility', 'Concessions', 'VIP Boxes', 'Historic Architecture', 'Tours'],
    sections: {
      orchestra: { name: 'Orchestra', priceMultiplier: 3.0, rows: 'A-Z', seats: '1-50' },
      mezzanine: { name: 'Mezzanine', priceMultiplier: 2.2, rows: '1-20', seats: '1-45' },
      balcony: { name: 'Balcony', priceMultiplier: 1.2, rows: '1-25', seats: '1-40' }
    }
  },
  {
    id: 'beacon-theatre',
    name: 'Beacon Theatre',
    city: 'New York',
    state: 'NY',
    address: '2124 Broadway, New York, NY 10023',
    capacity: 2894,
    type: 'Theater',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    description: 'Historic theater known for intimate performances and great sightlines',
    amenities: ['Accessibility', 'Concessions', 'Vintage Atmosphere', 'Bar Service'],
    sections: {
      orchestra: { name: 'Orchestra', priceMultiplier: 2.8, rows: 'A-S', seats: '1-40' },
      loge: { name: 'Loge', priceMultiplier: 2.0, rows: 'AA-FF', seats: '1-35' },
      balcony: { name: 'Balcony', priceMultiplier: 1.3, rows: 'A-L', seats: '1-30' }
    }
  },

  // Outdoor Amphitheaters
  {
    id: 'gorge-amphitheatre',
    name: 'Gorge Amphitheatre',
    city: 'George',
    state: 'WA',
    address: '754 Silica Rd NW, George, WA 98848',
    capacity: 27500,
    type: 'Outdoor Amphitheater',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Stunning outdoor venue with panoramic views of Columbia River',
    amenities: ['Parking', 'Concessions', 'Camping', 'Scenic Views', 'Food Vendors'],
    sections: {
      reserved: { name: 'Reserved Seating', priceMultiplier: 2.0, rows: '1-40', seats: '1-50' },
      general: { name: 'General Admission', priceMultiplier: 1.0, rows: 'GA', seats: 'Standing' }
    }
  },
  {
    id: 'greek-theatre-berkeley',
    name: 'Greek Theatre Berkeley',
    city: 'Berkeley',
    state: 'CA',
    address: '2001 Gayley Rd, Berkeley, CA 94720',
    capacity: 8500,
    type: 'Outdoor Theater',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Historic outdoor amphitheater on UC Berkeley campus',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'Campus Setting', 'Natural Acoustics'],
    sections: {
      reserved: { name: 'Reserved', priceMultiplier: 1.8, rows: 'A-Z', seats: '1-45' },
      general: { name: 'General Admission', priceMultiplier: 1.0, rows: 'GA', seats: 'Standing' }
    }
  },

  // International Venues
  {
    id: 'o2-arena-london',
    name: 'The O2 Arena',
    city: 'London',
    state: 'UK',
    address: 'Peninsula Square, London SE10 0DX, UK',
    capacity: 20000,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Premier entertainment venue in London\'s O2 complex',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Boxes', 'Shopping', 'Restaurants'],
    sections: {
      floor: { name: 'Floor Standing', priceMultiplier: 2.5, rows: 'GA', seats: 'Standing' },
      lower: { name: 'Lower Tier', priceMultiplier: 2.0, rows: '100-120', seats: '1-30' },
      upper: { name: 'Upper Tier', priceMultiplier: 1.0, rows: '400-420', seats: '1-25' }
    }
  },
  {
    id: 'accorhotels-arena',
    name: 'AccorHotels Arena',
    city: 'Paris',
    state: 'France',
    address: '8 Bd de Bercy, 75012 Paris, France',
    capacity: 20300,
    type: 'Arena',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Modern arena in Paris hosting international touring acts',
    amenities: ['Parking', 'Concessions', 'Accessibility', 'VIP Areas', 'Metro Access'],
    sections: {
      parterre: { name: 'Parterre', priceMultiplier: 2.8, rows: 'GA', seats: 'Standing' },
      gradins: { name: 'Gradins', priceMultiplier: 1.8, rows: '100-130', seats: '1-35' },
      balcon: { name: 'Balcon', priceMultiplier: 1.0, rows: '200-220', seats: '1-30' }
    }
  },

  // Festival Grounds
  {
    id: 'coachella-valley',
    name: 'Coachella Valley Music Festival Grounds',
    city: 'Indio',
    state: 'CA',
    address: '81800 51st Ave, Indio, CA 92201',
    capacity: 125000,
    type: 'Festival Grounds',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Iconic festival grounds hosting major music festivals',
    amenities: ['Parking', 'Food Vendors', 'Art Installations', 'Multiple Stages', 'Camping'],
    sections: {
      general: { name: 'General Admission', priceMultiplier: 1.0, rows: 'GA', seats: 'Standing' },
      vip: { name: 'VIP Area', priceMultiplier: 3.0, rows: 'VIP', seats: 'Standing' }
    }
  },
  {
    id: 'bonnaroo-farm',
    name: 'Bonnaroo Farm',
    city: 'Manchester',
    state: 'TN',
    address: '2269 Bushy Branch Rd, Manchester, TN 37355',
    capacity: 80000,
    type: 'Festival Grounds',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
    description: 'Rural festival site known for diverse music programming',
    amenities: ['Camping', 'Food Vendors', 'Multiple Stages', 'Art Areas', 'Silent Disco'],
    sections: {
      pit: { name: 'Pit', priceMultiplier: 2.5, rows: 'GA', seats: 'Standing' },
      general: { name: 'General Admission', priceMultiplier: 1.0, rows: 'GA', seats: 'Standing' }
    }
  }
];

// Categories
const categories = [
  { id: 'concerts', name: 'Concerts', icon: '🎵' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'theater', name: 'Theater', icon: '🎭' },
  { id: 'comedy', name: 'Comedy', icon: '😂' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'festivals', name: 'Festivals', icon: '🎪' }
];

// Events data with fixed dates
const events = [
  {
    id: 'taylor-swift-eras-tour-nyc',
    title: 'Taylor Swift: The Eras Tour',
    artist: 'taylor-swift',
    artistName: 'Taylor Swift',
    venue: 'madison-square-garden',
    venueName: 'Madison Square Garden',
    city: 'New York',
    state: 'NY',
    date: '2024-03-22',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Experience Taylor Swift\'s spectacular Eras Tour featuring hits from every album era.',
    duration: '3 hours 30 minutes',
    ageRestriction: 'All ages',
    basePrice: 89.50,
    ticketTypes: [
      { id: 'general', name: 'General Admission', price: 89.50, available: 156 },
      { id: 'premium', name: 'Premium Seating', price: 189.50, available: 45 },
      { id: 'vip', name: 'VIP Experience', price: 349.50, available: 12 }
    ],
    highlights: [
      'Three-hour show spanning all album eras',
      'Spectacular stage production',
      'Special guest appearances',
      'Exclusive merchandise available'
    ],
    seatMap: {
      floor: { price: 349.50, available: 45, total: 50 },
      lower: { price: 189.50, available: 234, total: 300 },
      upper: { price: 89.50, available: 567, total: 800 }
    }
  },
  {
    id: 'ed-sheeran-mathematics-tour-la',
    title: 'Ed Sheeran: Mathematics Tour',
    artist: 'ed-sheeran',
    artistName: 'Ed Sheeran',
    venue: 'staples-center',
    venueName: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    date: '2024-03-28',
    time: '19:30',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Ed Sheeran returns with his intimate Mathematics Tour featuring acoustic and full band performances.',
    duration: '2 hours 45 minutes',
    ageRestriction: 'All ages',
    basePrice: 75.00,
    ticketTypes: [
      { id: 'general', name: 'General Admission', price: 75.00, available: 234 },
      { id: 'premium', name: 'Premium Seating', price: 155.00, available: 67 },
      { id: 'vip', name: 'VIP Package', price: 295.00, available: 18 }
    ],
    highlights: [
      'Intimate acoustic performances',
      'Full band electric set',
      'New songs from latest album',
      'Loop pedal performances'
    ],
    seatMap: {
      floor: { price: 295.00, available: 67, total: 80 },
      lower: { price: 155.00, available: 345, total: 400 },
      upper: { price: 75.00, available: 678, total: 900 }
    }
  },
  {
    id: 'coldplay-music-spheres-london',
    title: 'Coldplay: Music of the Spheres World Tour',
    artist: 'coldplay',
    artistName: 'Coldplay',
    venue: 'wembley-stadium',
    venueName: 'Wembley Stadium',
    city: 'London',
    state: 'UK',
    date: '2024-04-05',
    time: '19:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Coldplay\'s spectacular stadium show with stunning visuals and eco-friendly production.',
    duration: '2 hours 30 minutes',
    ageRestriction: 'All ages',
    basePrice: 65.00,
    ticketTypes: [
      { id: 'pitch', name: 'Pitch Standing', price: 85.00, available: 1234 },
      { id: 'lower', name: 'Lower Tier', price: 125.00, available: 456 },
      { id: 'upper', name: 'Upper Tier', price: 65.00, available: 2345 }
    ],
    highlights: [
      'Sustainable eco-friendly production',
      'LED wristbands for all attendees',
      'Special guest performances',
      'Spectacular light show'
    ],
    seatMap: {
      pitch: { price: 85.00, available: 2345, total: 3000 },
      lower: { price: 125.00, available: 1234, total: 1500 },
      upper: { price: 65.00, available: 3456, total: 4000 }
    }
  },
  {
    id: 'billie-eilish-happier-than-ever-la',
    title: 'Billie Eilish: Happier Than Ever World Tour',
    artist: 'billie-eilish',
    artistName: 'Billie Eilish',
    venue: 'hollywood-bowl',
    venueName: 'Hollywood Bowl',
    city: 'Los Angeles',
    state: 'CA',
    date: '2024-03-30',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'Billie Eilish brings her haunting melodies and captivating performance to the iconic Hollywood Bowl.',
    duration: '2 hours',
    ageRestriction: 'All ages',
    basePrice: 95.00,
    ticketTypes: [
      { id: 'pool', name: 'Pool Circle', price: 195.00, available: 45 },
      { id: 'terrace', name: 'Terrace', price: 135.00, available: 123 },
      { id: 'bench', name: 'Bench Seating', price: 95.00, available: 234 }
    ],
    highlights: [
      'Intimate outdoor setting',
      'Special acoustic arrangements',
      'Stunning visual production',
      'Perfect LA evening atmosphere'
    ],
    seatMap: {
      pool: { price: 195.00, available: 123, total: 150 },
      terrace: { price: 135.00, available: 234, total: 300 },
      bench: { price: 95.00, available: 456, total: 600 }
    }
  },
  {
    id: 'beyonce-renaissance-tour-nyc',
    title: 'Beyoncé: Renaissance World Tour',
    artist: 'beyonce',
    artistName: 'Beyoncé',
    venue: 'madison-square-garden',
    venueName: 'Madison Square Garden',
    city: 'New York',
    state: 'NY',
    date: '2024-04-12',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Queen B returns with the Renaissance World Tour celebrating her latest acclaimed album.',
    duration: '2 hours 45 minutes',
    ageRestriction: 'All ages',
    basePrice: 125.00,
    ticketTypes: [
      { id: 'general', name: 'General Admission', price: 125.00, available: 89 },
      { id: 'premium', name: 'Premium Seating', price: 245.00, available: 34 },
      { id: 'vip', name: 'VIP Experience', price: 495.00, available: 8 }
    ],
    highlights: [
      'Renaissance album performed live',
      'Elaborate costume changes',
      'World-class choreography',
      'Special guest appearances'
    ],
    seatMap: {
      floor: { price: 495.00, available: 23, total: 30 },
      lower: { price: 245.00, available: 156, total: 200 },
      upper: { price: 125.00, available: 345, total: 500 }
    }
  },
  {
    id: 'harry-styles-love-on-tour-colorado',
    title: 'Harry Styles: Love On Tour',
    artist: 'harry-styles',
    artistName: 'Harry Styles',
    venue: 'red-rocks',
    venueName: 'Red Rocks Amphitheatre',
    city: 'Morrison',
    state: 'CO',
    date: '2024-04-08',
    time: '19:30',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Harry Styles brings his Love On Tour to the stunning natural amphitheater of Red Rocks.',
    duration: '2 hours 15 minutes',
    ageRestriction: 'All ages',
    basePrice: 115.00,
    ticketTypes: [
      { id: 'reserved', name: 'Reserved Seating', price: 155.00, available: 167 },
      { id: 'general', name: 'General Admission', price: 115.00, available: 234 }
    ],
    highlights: [
      'Spectacular Red Rocks setting',
      'Intimate 9,500 capacity venue',
      'Natural acoustics',
      'Sunset show timing'
    ],
    seatMap: {
      reserved: { price: 155.00, available: 234, total: 300 },
      general: { price: 115.00, available: 345, total: 450 }
    }
  },

  // Additional Pop/Rock Concerts
  {
    id: 'ariana-grande-sweetener-tour-chicago',
    title: 'Ariana Grande: Sweetener World Tour',
    artist: 'ariana-grande',
    artistName: 'Ariana Grande',
    venue: 'united-center',
    venueName: 'United Center',
    city: 'Chicago',
    state: 'IL',
    date: '2024-03-26',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'Ariana Grande brings her powerful vocals and stunning production to Chicago.',
    duration: '2 hours 30 minutes',
    ageRestriction: 'All ages',
    basePrice: 85.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Level', price: 85.00, available: 234 },
      { id: 'lower', name: 'Lower Level', price: 165.00, available: 89 },
      { id: 'floor', name: 'Floor', price: 285.00, available: 23 }
    ],
    highlights: [
      'Stunning vocal performances',
      'High-energy choreography',
      'Special guest appearances',
      'Interactive stage production'
    ],
    seatMap: {
      upper: { price: 85.00, available: 567, total: 800 },
      lower: { price: 165.00, available: 234, total: 400 },
      floor: { price: 285.00, available: 45, total: 80 }
    }
  },
  {
    id: 'bruno-mars-24k-magic-boston',
    title: 'Bruno Mars: 24K Magic World Tour',
    artist: 'bruno-mars',
    artistName: 'Bruno Mars',
    venue: 'td-garden',
    venueName: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    date: '2024-04-02',
    time: '19:30',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Bruno Mars delivers his signature blend of funk, pop, and R&B.',
    duration: '2 hours 15 minutes',
    ageRestriction: 'All ages',
    basePrice: 95.00,
    ticketTypes: [
      { id: 'balcony', name: 'Balcony', price: 95.00, available: 178 },
      { id: 'loge', name: 'Loge Level', price: 175.00, available: 67 },
      { id: 'floor', name: 'Floor', price: 295.00, available: 18 }
    ],
    highlights: [
      'Live band performance',
      'Retro-funk atmosphere',
      'Hit songs and dance moves',
      'High-energy show'
    ],
    seatMap: {
      balcony: { price: 95.00, available: 456, total: 600 },
      loge: { price: 175.00, available: 178, total: 250 },
      floor: { price: 295.00, available: 34, total: 60 }
    }
  },
  {
    id: 'dua-lipa-future-nostalgia-dallas',
    title: 'Dua Lipa: Future Nostalgia Tour',
    artist: 'dua-lipa',
    artistName: 'Dua Lipa',
    venue: 'american-airlines-center',
    venueName: 'American Airlines Center',
    city: 'Dallas',
    state: 'TX',
    date: '2024-03-29',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'Dua Lipa\'s disco-influenced pop hits come alive on stage.',
    duration: '2 hours',
    ageRestriction: 'All ages',
    basePrice: 78.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 78.00, available: 298 },
      { id: 'lower', name: 'Lower Bowl', price: 148.00, available: 134 },
      { id: 'floor', name: 'Floor', price: 258.00, available: 45 }
    ],
    highlights: [
      'Disco ball lighting effects',
      'Dance-pop choreography',
      'Hit singles from Future Nostalgia',
      'Visual spectacle'
    ],
    seatMap: {
      upper: { price: 78.00, available: 678, total: 900 },
      lower: { price: 148.00, available: 234, total: 350 },
      floor: { price: 258.00, available: 56, total: 100 }
    }
  },
  {
    id: 'the-weeknd-after-hours-brooklyn',
    title: 'The Weeknd: After Hours Til Dawn Stadium Tour',
    artist: 'the-weeknd',
    artistName: 'The Weeknd',
    venue: 'barclays-center',
    venueName: 'Barclays Center',
    city: 'Brooklyn',
    state: 'NY',
    date: '2024-04-06',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'The Weeknd\'s atmospheric R&B experience with stunning visuals.',
    duration: '2 hours 45 minutes',
    ageRestriction: 'All ages',
    basePrice: 92.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 92.00, available: 267 },
      { id: 'lower', name: 'Lower Bowl', price: 182.00, available: 89 },
      { id: 'floor', name: 'Floor', price: 312.00, available: 28 }
    ],
    highlights: [
      'Cinematic visual production',
      'Atmospheric lighting design',
      'Chart-topping hits',
      'Immersive experience'
    ],
    seatMap: {
      upper: { price: 92.00, available: 534, total: 700 },
      lower: { price: 182.00, available: 167, total: 250 },
      floor: { price: 312.00, available: 34, total: 70 }
    }
  },

  // Rock and Alternative Concerts
  {
    id: 'imagine-dragons-mercury-tour-chicago',
    title: 'Imagine Dragons: Mercury World Tour',
    artist: 'imagine-dragons',
    artistName: 'Imagine Dragons',
    venue: 'soldier-field',
    venueName: 'Soldier Field',
    city: 'Chicago',
    state: 'IL',
    date: '2024-04-10',
    time: '19:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Stadium-sized anthems from Imagine Dragons in an epic outdoor setting.',
    duration: '2 hours 30 minutes',
    ageRestriction: 'All ages',
    basePrice: 65.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 65.00, available: 1234 },
      { id: 'lower', name: 'Lower Bowl', price: 125.00, available: 567 },
      { id: 'field', name: 'Field Level', price: 195.00, available: 234 }
    ],
    highlights: [
      'Stadium-scale production',
      'Anthemic rock hits',
      'Pyrotechnics and effects',
      'Special guest performers'
    ],
    seatMap: {
      upper: { price: 65.00, available: 2345, total: 3000 },
      lower: { price: 125.00, available: 1234, total: 1800 },
      field: { price: 195.00, available: 456, total: 800 }
    }
  },
  {
    id: 'twenty-one-pilots-scaled-icy-tour-boston',
    title: 'Twenty One Pilots: Scaled And Icy Tour',
    artist: 'twenty-one-pilots',
    artistName: 'Twenty One Pilots',
    venue: 'fenway-park',
    venueName: 'Fenway Park',
    city: 'Boston',
    state: 'MA',
    date: '2024-04-14',
    time: '19:30',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    description: 'Twenty One Pilots brings their unique blend of genres to historic Fenway.',
    duration: '2 hours 45 minutes',
    ageRestriction: 'All ages',
    basePrice: 88.00,
    ticketTypes: [
      { id: 'grandstand', name: 'Grandstand', price: 88.00, available: 456 },
      { id: 'pavilion', name: 'Pavilion', price: 158.00, available: 189 },
      { id: 'field', name: 'Field Box', price: 228.00, available: 78 }
    ],
    highlights: [
      'Interactive stage design',
      'Genre-blending music',
      'Unique venue atmosphere',
      'Fan engagement moments'
    ],
    seatMap: {
      grandstand: { price: 88.00, available: 789, total: 1200 },
      pavilion: { price: 158.00, available: 234, total: 400 },
      field: { price: 228.00, available: 123, total: 200 }
    }
  },

  // Hip-Hop and Rap Concerts
  {
    id: 'drake-champions-tour-nyc',
    title: 'Drake: Champions Tour',
    artist: 'drake',
    artistName: 'Drake',
    venue: 'barclays-center',
    venueName: 'Barclays Center',
    city: 'Brooklyn',
    state: 'NY',
    date: '2024-04-01',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Drake delivers his chart-topping hits in an intimate arena setting.',
    duration: '2 hours 30 minutes',
    ageRestriction: 'All ages',
    basePrice: 135.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 135.00, available: 234 },
      { id: 'lower', name: 'Lower Bowl', price: 235.00, available: 89 },
      { id: 'floor', name: 'Floor', price: 385.00, available: 34 }
    ],
    highlights: [
      'Chart-topping hit performances',
      'Special guest appearances',
      'High-production value show',
      'Interactive fan moments'
    ],
    seatMap: {
      upper: { price: 135.00, available: 456, total: 600 },
      lower: { price: 235.00, available: 123, total: 200 },
      floor: { price: 385.00, available: 45, total: 80 }
    }
  },
  {
    id: 'kendrick-lamar-big-steppers-tour-la',
    title: 'Kendrick Lamar: The Big Steppers Tour',
    artist: 'kendrick-lamar',
    artistName: 'Kendrick Lamar',
    venue: 'staples-center',
    venueName: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    date: '2024-03-31',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Kendrick Lamar\'s powerful lyricism and stage presence in Los Angeles.',
    duration: '2 hours 15 minutes',
    ageRestriction: 'All ages',
    basePrice: 125.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Level', price: 125.00, available: 298 },
      { id: 'lower', name: 'Lower Level', price: 225.00, available: 134 },
      { id: 'floor', name: 'Floor', price: 375.00, available: 45 }
    ],
    highlights: [
      'Socially conscious lyricism',
      'Powerful live performance',
      'Visual storytelling',
      'Guest artist features'
    ],
    seatMap: {
      upper: { price: 125.00, available: 567, total: 800 },
      lower: { price: 225.00, available: 234, total: 400 },
      floor: { price: 375.00, available: 67, total: 120 }
    }
  },

  // Electronic/Dance Concerts
  {
    id: 'calvin-harris-funk-wav-bounces-miami',
    title: 'Calvin Harris: Funk Wav Bounces',
    artist: 'calvin-harris',
    artistName: 'Calvin Harris',
    venue: 'american-airlines-center',
    venueName: 'American Airlines Center',
    city: 'Dallas',
    state: 'TX',
    date: '2024-04-05',
    time: '21:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Calvin Harris brings his EDM hits and dance production to Dallas.',
    duration: '2 hours',
    ageRestriction: '18+',
    basePrice: 75.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 75.00, available: 345 },
      { id: 'lower', name: 'Lower Bowl', price: 145.00, available: 178 },
      { id: 'floor', name: 'Floor/Dance', price: 245.00, available: 89 }
    ],
    highlights: [
      'EDM and dance music',
      'Light show production',
      'High-energy atmosphere',
      'Dance floor experience'
    ],
    seatMap: {
      upper: { price: 75.00, available: 678, total: 900 },
      lower: { price: 145.00, available: 234, total: 350 },
      floor: { price: 245.00, available: 123, total: 200 }
    }
  },
  {
    id: 'marshmello-joytime-tour-vegas',
    title: 'Marshmello: Joytime Tour',
    artist: 'marshmello',
    artistName: 'Marshmello',
    venue: 'american-airlines-center',
    venueName: 'American Airlines Center',
    city: 'Dallas',
    state: 'TX',
    date: '2024-04-11',
    time: '21:30',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Marshmello\'s signature masked performance with electronic beats.',
    duration: '2 hours 30 minutes',
    ageRestriction: '18+',
    basePrice: 85.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 85.00, available: 234 },
      { id: 'lower', name: 'Lower Bowl', price: 155.00, available: 123 },
      { id: 'floor', name: 'Floor/Dance', price: 255.00, available: 67 }
    ],
    highlights: [
      'Signature mask and costume',
      'Electronic music experience',
      'Visual effects and lasers',
      'Gaming and pop culture references'
    ],
    seatMap: {
      upper: { price: 85.00, available: 456, total: 600 },
      lower: { price: 155.00, available: 189, total: 300 },
      floor: { price: 255.00, available: 89, total: 150 }
    }
  },

  // Country Concerts
  {
    id: 'luke-combs-what-you-see-tour-nashville',
    title: 'Luke Combs: What You See Is What You Get Tour',
    artist: 'luke-combs',
    artistName: 'Luke Combs',
    venue: 'soldier-field',
    venueName: 'Soldier Field',
    city: 'Chicago',
    state: 'IL',
    date: '2024-04-13',
    time: '19:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Luke Combs brings his heartfelt country music to the stadium stage.',
    duration: '2 hours 45 minutes',
    ageRestriction: 'All ages',
    basePrice: 58.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 58.00, available: 1567 },
      { id: 'lower', name: 'Lower Bowl', price: 98.00, available: 678 },
      { id: 'field', name: 'Field Level', price: 148.00, available: 234 }
    ],
    highlights: [
      'Authentic country storytelling',
      'Stadium-scale production',
      'Fan-favorite hits',
      'Special guest artists'
    ],
    seatMap: {
      upper: { price: 58.00, available: 2345, total: 3000 },
      lower: { price: 98.00, available: 1234, total: 1800 },
      field: { price: 148.00, available: 456, total: 800 }
    }
  },

  // International Artists
  {
    id: 'bad-bunny-mundo-tour-miami',
    title: 'Bad Bunny: Un Verano Sin Ti World Tour',
    artist: 'bad-bunny',
    artistName: 'Bad Bunny',
    venue: 'american-airlines-center',
    venueName: 'American Airlines Center',
    city: 'Dallas',
    state: 'TX',
    date: '2024-03-27',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'Bad Bunny brings reggaeton and Latin trap to Dallas with spectacular production.',
    duration: '2 hours 30 minutes',
    ageRestriction: 'All ages',
    basePrice: 115.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 115.00, available: 298 },
      { id: 'lower', name: 'Lower Bowl', price: 215.00, available: 156 },
      { id: 'floor', name: 'Floor', price: 365.00, available: 67 }
    ],
    highlights: [
      'Latin music celebration',
      'High-energy performance',
      'Spectacular stage design',
      'Reggaeton and trap hits'
    ],
    seatMap: {
      upper: { price: 115.00, available: 567, total: 800 },
      lower: { price: 215.00, available: 234, total: 400 },
      floor: { price: 365.00, available: 89, total: 150 }
    }
  },

  // Jazz and Blues Concerts
  {
    id: 'john-mayer-sob-rock-tour-nyc',
    title: 'John Mayer: Sob Rock Tour',
    artist: 'john-mayer',
    artistName: 'John Mayer',
    venue: 'radio-city',
    venueName: 'Radio City Music Hall',
    city: 'New York',
    state: 'NY',
    date: '2024-04-07',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    description: 'John Mayer\'s guitar mastery and soulful vocals in an intimate setting.',
    duration: '2 hours 30 minutes',
    ageRestriction: 'All ages',
    basePrice: 125.00,
    ticketTypes: [
      { id: 'balcony', name: 'Balcony', price: 125.00, available: 156 },
      { id: 'mezzanine', name: 'Mezzanine', price: 225.00, available: 89 },
      { id: 'orchestra', name: 'Orchestra', price: 325.00, available: 45 }
    ],
    highlights: [
      'Guitar virtuosity showcase',
      'Intimate venue acoustics',
      'Blues and rock fusion',
      'Soulful vocal performance'
    ],
    seatMap: {
      balcony: { price: 125.00, available: 234, total: 400 },
      mezzanine: { price: 225.00, available: 134, total: 200 },
      orchestra: { price: 325.00, available: 67, total: 120 }
    }
  },
  {
    id: 'alicia-keys-keys-world-tour-boston',
    title: 'Alicia Keys: Keys World Tour',
    artist: 'alicia-keys',
    artistName: 'Alicia Keys',
    venue: 'td-garden',
    venueName: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    date: '2024-04-09',
    time: '20:00',
    category: 'concerts',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
    description: 'Alicia Keys brings her powerful vocals and piano skills to Boston.',
    duration: '2 hours 15 minutes',
    ageRestriction: 'All ages',
    basePrice: 98.00,
    ticketTypes: [
      { id: 'balcony', name: 'Balcony', price: 98.00, available: 189 },
      { id: 'loge', name: 'Loge Level', price: 178.00, available: 123 },
      { id: 'floor', name: 'Floor', price: 278.00, available: 56 }
    ],
    highlights: [
      'Piano-driven performances',
      'Soulful R&B vocals',
      'Empowering message',
      'Classic hits and new songs'
    ],
    seatMap: {
      balcony: { price: 98.00, available: 345, total: 500 },
      loge: { price: 178.00, available: 189, total: 300 },
      floor: { price: 278.00, available: 78, total: 150 }
    }
  }
];

// Sports events
const sportsEvents = [
  {
    id: 'lakers-vs-warriors',
    title: 'Los Angeles Lakers vs Golden State Warriors',
    teamHome: 'Los Angeles Lakers',
    teamAway: 'Golden State Warriors',
    venue: 'staples-center',
    venueName: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    date: '2024-03-25',
    time: '19:30',
    category: 'sports',
    sport: 'Basketball',
    league: 'NBA',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
    description: 'Western Conference showdown between two NBA powerhouses.',
    basePrice: 45.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Level', price: 45.00, available: 456 },
      { id: 'lower', name: 'Lower Level', price: 125.00, available: 234 },
      { id: 'courtside', name: 'Courtside', price: 895.00, available: 12 }
    ],
    seatMap: {
      upper: { price: 45.00, available: 567, total: 800 },
      lower: { price: 125.00, available: 234, total: 400 },
      courtside: { price: 895.00, available: 8, total: 16 }
    }
  },
  {
    id: 'celtics-vs-heat-playoffs',
    title: 'Boston Celtics vs Miami Heat - NBA Playoffs',
    teamHome: 'Boston Celtics',
    teamAway: 'Miami Heat',
    venue: 'td-garden',
    venueName: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    date: '2024-04-03',
    time: '20:00',
    category: 'sports',
    sport: 'Basketball',
    league: 'NBA',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
    description: 'Eastern Conference playoff intensity at TD Garden.',
    basePrice: 85.00,
    ticketTypes: [
      { id: 'balcony', name: 'Balcony', price: 85.00, available: 234 },
      { id: 'loge', name: 'Loge Level', price: 185.00, available: 89 },
      { id: 'courtside', name: 'Courtside', price: 1250.00, available: 8 }
    ],
    seatMap: {
      balcony: { price: 85.00, available: 456, total: 600 },
      loge: { price: 185.00, available: 167, total: 250 },
      courtside: { price: 1250.00, available: 4, total: 12 }
    }
  },
  {
    id: 'bulls-vs-knicks',
    title: 'Chicago Bulls vs New York Knicks',
    teamHome: 'Chicago Bulls',
    teamAway: 'New York Knicks',
    venue: 'united-center',
    venueName: 'United Center',
    city: 'Chicago',
    state: 'IL',
    date: '2024-03-28',
    time: '19:00',
    category: 'sports',
    sport: 'Basketball',
    league: 'NBA',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
    description: 'Classic matchup between Eastern Conference rivals.',
    basePrice: 55.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Level', price: 55.00, available: 567 },
      { id: 'lower', name: 'Lower Level', price: 145.00, available: 234 },
      { id: 'floor', name: 'Floor Seats', price: 385.00, available: 45 }
    ],
    seatMap: {
      upper: { price: 55.00, available: 789, total: 1000 },
      lower: { price: 145.00, available: 345, total: 500 },
      floor: { price: 385.00, available: 67, total: 100 }
    }
  },
  {
    id: 'yankees-vs-red-sox',
    title: 'New York Yankees vs Boston Red Sox',
    teamHome: 'Boston Red Sox',
    teamAway: 'New York Yankees',
    venue: 'fenway-park',
    venueName: 'Fenway Park',
    city: 'Boston',
    state: 'MA',
    date: '2024-04-12',
    time: '19:10',
    category: 'sports',
    sport: 'Baseball',
    league: 'MLB',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop',
    description: 'Historic rivalry continues at the iconic Fenway Park.',
    basePrice: 35.00,
    ticketTypes: [
      { id: 'grandstand', name: 'Grandstand', price: 35.00, available: 678 },
      { id: 'pavilion', name: 'Pavilion', price: 65.00, available: 345 },
      { id: 'field', name: 'Field Box', price: 125.00, available: 156 }
    ],
    seatMap: {
      grandstand: { price: 35.00, available: 1234, total: 1800 },
      pavilion: { price: 65.00, available: 456, total: 700 },
      field: { price: 125.00, available: 234, total: 400 }
    }
  },
  {
    id: 'bears-vs-packers',
    title: 'Chicago Bears vs Green Bay Packers',
    teamHome: 'Chicago Bears',
    teamAway: 'Green Bay Packers',
    venue: 'soldier-field',
    venueName: 'Soldier Field',
    city: 'Chicago',
    state: 'IL',
    date: '2024-04-08',
    time: '13:00',
    category: 'sports',
    sport: 'Football',
    league: 'NFL',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1508986926386-44d1e12e6d2b?w=800&h=600&fit=crop',
    description: 'NFC North rivalry in the Windy City.',
    basePrice: 125.00,
    ticketTypes: [
      { id: 'upper', name: 'Upper Bowl', price: 125.00, available: 1234 },
      { id: 'lower', name: 'Lower Bowl', price: 245.00, available: 567 },
      { id: 'field', name: 'Field Level', price: 485.00, available: 89 }
    ],
    seatMap: {
      upper: { price: 125.00, available: 2345, total: 3500 },
      lower: { price: 245.00, available: 1234, total: 2000 },
      field: { price: 485.00, available: 156, total: 300 }
    }
  }
];

// Theater events
const theaterEvents = [
  {
    id: 'hamilton-london',
    title: 'Hamilton',
    venue: 'royal-albert-hall',
    venueName: 'Royal Albert Hall',
    city: 'London',
    state: 'UK',
    date: '2024-04-15',
    time: '19:30',
    category: 'theater',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    description: 'The revolutionary musical about Alexander Hamilton comes to London.',
    duration: '2 hours 45 minutes (including intermission)',
    ageRestriction: 'Recommended 10+',
    basePrice: 65.00,
    ticketTypes: [
      { id: 'gallery', name: 'Gallery', price: 65.00, available: 145 },
      { id: 'circle', name: 'Circle', price: 95.00, available: 89 },
      { id: 'stalls', name: 'Stalls', price: 135.00, available: 67 }
    ],
    highlights: [
      'Tony Award-winning musical',
      'Original London cast',
      'Historic venue setting',
      'Revolutionary hip-hop score'
    ],
    seatMap: {
      gallery: { price: 65.00, available: 234, total: 300 },
      circle: { price: 95.00, available: 156, total: 200 },
      stalls: { price: 135.00, available: 89, total: 120 }
    }
  },
  {
    id: 'lion-king-broadway-nyc',
    title: 'The Lion King',
    venue: 'radio-city',
    venueName: 'Radio City Music Hall',
    city: 'New York',
    state: 'NY',
    date: '2024-03-24',
    time: '14:00',
    category: 'theater',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    description: 'Disney\'s spectacular musical brings the Pride Lands to life on stage.',
    duration: '2 hours 30 minutes (including intermission)',
    ageRestriction: 'All ages',
    basePrice: 89.00,
    ticketTypes: [
      { id: 'balcony', name: 'Balcony', price: 89.00, available: 234 },
      { id: 'mezzanine', name: 'Mezzanine', price: 159.00, available: 134 },
      { id: 'orchestra', name: 'Orchestra', price: 229.00, available: 78 }
    ],
    highlights: [
      'Disney\'s beloved musical',
      'Stunning costumes and masks',
      'Circle of Life opening',
      'Perfect for families'
    ],
    seatMap: {
      balcony: { price: 89.00, available: 345, total: 500 },
      mezzanine: { price: 159.00, available: 189, total: 300 },
      orchestra: { price: 229.00, available: 123, total: 200 }
    }
  },
  {
    id: 'phantom-opera-broadway',
    title: 'The Phantom of the Opera',
    venue: 'beacon-theatre',
    venueName: 'Beacon Theatre',
    city: 'New York',
    state: 'NY',
    date: '2024-04-04',
    time: '20:00',
    category: 'theater',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    description: 'Andrew Lloyd Webber\'s haunting masterpiece in an intimate theater setting.',
    duration: '2 hours 35 minutes (including intermission)',
    ageRestriction: 'Recommended 8+',
    basePrice: 75.00,
    ticketTypes: [
      { id: 'balcony', name: 'Balcony', price: 75.00, available: 156 },
      { id: 'loge', name: 'Loge', price: 125.00, available: 89 },
      { id: 'orchestra', name: 'Orchestra', price: 185.00, available: 45 }
    ],
    highlights: [
      'Longest-running Broadway show',
      'Iconic chandelier scene',
      'Beautiful costumes and sets',
      'Timeless love story'
    ],
    seatMap: {
      balcony: { price: 75.00, available: 234, total: 350 },
      loge: { price: 125.00, available: 134, total: 200 },
      orchestra: { price: 185.00, available: 67, total: 120 }
    }
  },
  {
    id: 'chicago-musical-boston',
    title: 'Chicago: The Musical',
    venue: 'td-garden',
    venueName: 'TD Garden',
    city: 'Boston',
    state: 'MA',
    date: '2024-03-30',
    time: '19:30',
    category: 'theater',
    status: 'on-sale',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    description: 'The sultry musical about murder, greed, corruption, and show business.',
    duration: '2 hours 15 minutes (including intermission)',
    ageRestriction: 'Recommended 13+',
    basePrice: 68.00,
    ticketTypes: [
      { id: 'balcony', name: 'Balcony', price: 68.00, available: 289 },
      { id: 'loge', name: 'Loge Level', price: 118.00, available: 167 },
      { id: 'floor', name: 'Floor Seating', price: 168.00, available: 89 }
    ],
    highlights: [
      'Jazz Age glamour',
      'Award-winning choreography',
      'Sultry musical numbers',
      'All that jazz!'
    ],
    seatMap: {
      balcony: { price: 68.00, available: 456, total: 700 },
      loge: { price: 118.00, available: 234, total: 400 },
      floor: { price: 168.00, available: 123, total: 200 }
    }
  }
];

// Combine all events
const allEvents = [...events, ...sportsEvents, ...theaterEvents];

// Cities
const cities = [
  { id: 'new-york', name: 'New York', state: 'NY', country: 'USA', eventCount: 85 },
  { id: 'los-angeles', name: 'Los Angeles', state: 'CA', country: 'USA', eventCount: 72 },
  { id: 'london', name: 'London', state: 'UK', country: 'UK', eventCount: 56 },
  { id: 'chicago', name: 'Chicago', state: 'IL', country: 'USA', eventCount: 48 },
  { id: 'san-francisco', name: 'San Francisco', state: 'CA', country: 'USA', eventCount: 42 },
  { id: 'boston', name: 'Boston', state: 'MA', country: 'USA', eventCount: 38 },
  { id: 'dallas', name: 'Dallas', state: 'TX', country: 'USA', eventCount: 35 },
  { id: 'brooklyn', name: 'Brooklyn', state: 'NY', country: 'USA', eventCount: 32 },
  { id: 'miami', name: 'Miami', state: 'FL', country: 'USA', eventCount: 29 },
  { id: 'seattle', name: 'Seattle', state: 'WA', country: 'USA', eventCount: 28 },
  { id: 'atlanta', name: 'Atlanta', state: 'GA', country: 'USA', eventCount: 26 },
  { id: 'denver', name: 'Denver', state: 'CO', country: 'USA', eventCount: 24 },
  { id: 'phoenix', name: 'Phoenix', state: 'AZ', country: 'USA', eventCount: 22 },
  { id: 'philadelphia', name: 'Philadelphia', state: 'PA', country: 'USA', eventCount: 21 },
  { id: 'houston', name: 'Houston', state: 'TX', country: 'USA', eventCount: 20 },
  { id: 'detroit', name: 'Detroit', state: 'MI', country: 'USA', eventCount: 19 },
  { id: 'nashville', name: 'Nashville', state: 'TN', country: 'USA', eventCount: 18 },
  { id: 'las-vegas', name: 'Las Vegas', state: 'NV', country: 'USA', eventCount: 35 },
  { id: 'orlando', name: 'Orlando', state: 'FL', country: 'USA', eventCount: 17 },
  { id: 'minneapolis', name: 'Minneapolis', state: 'MN', country: 'USA', eventCount: 16 },
  { id: 'washington-dc', name: 'Washington DC', state: 'DC', country: 'USA', eventCount: 25 },
  { id: 'san-diego', name: 'San Diego', state: 'CA', country: 'USA', eventCount: 15 },
  { id: 'portland', name: 'Portland', state: 'OR', country: 'USA', eventCount: 14 },
  { id: 'austin', name: 'Austin', state: 'TX', country: 'USA', eventCount: 23 },
  { id: 'cleveland', name: 'Cleveland', state: 'OH', country: 'USA', eventCount: 13 },
  { id: 'pittsburgh', name: 'Pittsburgh', state: 'PA', country: 'USA', eventCount: 12 },
  { id: 'kansas-city', name: 'Kansas City', state: 'MO', country: 'USA', eventCount: 11 },
  
  // International Cities
  { id: 'paris', name: 'Paris', state: 'France', country: 'France', eventCount: 45 },
  { id: 'berlin', name: 'Berlin', state: 'Germany', country: 'Germany', eventCount: 38 },
  { id: 'amsterdam', name: 'Amsterdam', state: 'Netherlands', country: 'Netherlands', eventCount: 32 },
  { id: 'barcelona', name: 'Barcelona', state: 'Spain', country: 'Spain', eventCount: 29 },
  { id: 'rome', name: 'Rome', state: 'Italy', country: 'Italy', eventCount: 26 },
  { id: 'dublin', name: 'Dublin', state: 'Ireland', country: 'Ireland', eventCount: 22 },
  { id: 'stockholm', name: 'Stockholm', state: 'Sweden', country: 'Sweden', eventCount: 20 },
  { id: 'copenhagen', name: 'Copenhagen', state: 'Denmark', country: 'Denmark', eventCount: 18 },
  { id: 'vienna', name: 'Vienna', state: 'Austria', country: 'Austria', eventCount: 16 },
  { id: 'zurich', name: 'Zurich', state: 'Switzerland', country: 'Switzerland', eventCount: 15 },
  { id: 'brussels', name: 'Brussels', state: 'Belgium', country: 'Belgium', eventCount: 14 },
  { id: 'oslo', name: 'Oslo', state: 'Norway', country: 'Norway', eventCount: 13 },
  
  // Canadian Cities
  { id: 'toronto', name: 'Toronto', state: 'ON', country: 'Canada', eventCount: 42 },
  { id: 'vancouver', name: 'Vancouver', state: 'BC', country: 'Canada', eventCount: 28 },
  { id: 'montreal', name: 'Montreal', state: 'QC', country: 'Canada', eventCount: 24 },
  { id: 'calgary', name: 'Calgary', state: 'AB', country: 'Canada', eventCount: 18 },
  { id: 'ottawa', name: 'Ottawa', state: 'ON', country: 'Canada', eventCount: 15 },
  
  // Additional International Cities
  { id: 'tokyo', name: 'Tokyo', state: 'Japan', country: 'Japan', eventCount: 38 },
  { id: 'sydney', name: 'Sydney', state: 'Australia', country: 'Australia', eventCount: 32 },
  { id: 'melbourne', name: 'Melbourne', state: 'Australia', country: 'Australia', eventCount: 26 },
  { id: 'seoul', name: 'Seoul', state: 'South Korea', country: 'South Korea', eventCount: 35 },
  { id: 'singapore', name: 'Singapore', state: 'Singapore', country: 'Singapore', eventCount: 22 },
  { id: 'hong-kong', name: 'Hong Kong', state: 'Hong Kong', country: 'Hong Kong', eventCount: 24 },
  { id: 'mumbai', name: 'Mumbai', state: 'India', country: 'India', eventCount: 28 },
  { id: 'sao-paulo', name: 'São Paulo', state: 'Brazil', country: 'Brazil', eventCount: 25 },
  { id: 'mexico-city', name: 'Mexico City', state: 'Mexico', country: 'Mexico', eventCount: 23 },
  { id: 'buenos-aires', name: 'Buenos Aires', state: 'Argentina', country: 'Argentina', eventCount: 21 }
];

// Featured content
const featuredEvents = [
  'taylor-swift-eras-tour-nyc',
  'coldplay-music-spheres-london',
  'beyonce-renaissance-tour-nyc',
  'harry-styles-love-on-tour-colorado',
  'ariana-grande-sweetener-tour-chicago',
  'drake-champions-tour-nyc',
  'bad-bunny-mundo-tour-miami',
  'imagine-dragons-mercury-tour-chicago'
];

const trendingEvents = [
  'billie-eilish-happier-than-ever-la',
  'ed-sheeran-mathematics-tour-la',
  'lakers-vs-warriors',
  'hamilton-london',
  'bruno-mars-24k-magic-boston',
  'the-weeknd-after-hours-brooklyn',
  'celtics-vs-heat-playoffs',
  'lion-king-broadway-nyc',
  'kendrick-lamar-big-steppers-tour-la',
  'calvin-harris-funk-wav-bounces-miami',
  'yankees-vs-red-sox',
  'phantom-opera-broadway'
];

// Seat types and pricing
const seatTypes = [
  { id: 'general', name: 'General Admission', description: 'Standard seating' },
  { id: 'premium', name: 'Premium', description: 'Better view and comfort' },
  { id: 'vip', name: 'VIP', description: 'Best seats with exclusive perks' },
  { id: 'floor', name: 'Floor', description: 'Closest to stage' },
  { id: 'balcony', name: 'Balcony', description: 'Elevated view' }
];

// Filters
const filters = {
  categories: categories,
  priceRanges: [
    { id: 'under-50', name: 'Under $50', min: 0, max: 50 },
    { id: '50-100', name: '$50 - $100', min: 50, max: 100 },
    { id: '100-200', name: '$100 - $200', min: 100, max: 200 },
    { id: 'over-200', name: '$200+', min: 200, max: 9999 }
  ],
  dates: [
    { id: 'today', name: 'Today', dates: [fixedDates.today] },
    { id: 'this-week', name: 'This Week', dates: fixedDates.thisWeek },
    { id: 'this-month', name: 'This Month', dates: fixedDates.thisMonth },
    { id: 'next-month', name: 'Next Month', dates: fixedDates.nextMonth }
  ],
  venues: venues.map(venue => ({
    id: venue.id,
    name: venue.name,
    city: venue.city
  }))
};

// Export the data
const staticMasterTicketData = {
  fixedDates,
  artists,
  venues,
  categories,
  events: allEvents,
  cities,
  featuredEvents,
  trendingEvents,
  seatTypes,
  filters
};

export default staticMasterTicketData;
