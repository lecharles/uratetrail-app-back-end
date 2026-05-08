const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Trail = require('./models/trail');

const trails = [
  {
    name: 'Lands End Trail',
    lat: 37.7858035,
    lng: -122.5033753,
    description: 'A 3.4-mile coastal trail along the northwestern edge of San Francisco with views of the Golden Gate Bridge, Marin Headlands, and shipwreck remains at low tide.',
    imageUrl: 'https://images.unsplash.com/photo-1568393691080-c0e9d6b73a39?w=1200',
    address: 'Lands End Trail, San Francisco, CA 94121, USA'
  },
  {
    name: 'Dipsea Trail',
    lat: 37.9024181,
    lng: -122.5577838,
    description: 'A historic 7.5-mile trail from Mill Valley to Stinson Beach, climbing through redwood groves and crossing Mount Tamalpais. Home to the oldest trail race in America.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200',
    address: 'Dipsea Trail, Mill Valley, CA, USA'
  },
  {
    name: 'Mount Tamalpais East Peak',
    lat: 37.9291167,
    lng: -122.5777194,
    description: 'A short but rewarding hike to the 2,571-foot summit of Mt Tam with 360-degree views of the Bay Area, Pacific Ocean, and on clear days the Sierra Nevada.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
    address: 'Old Railroad Grade Trail, Mill Valley, CA 94941, USA'
  },
  {
    name: 'Mission Peak',
    lat: 37.5043239,
    lng: -121.908399,
    description: 'A challenging 6-mile out-and-back from Stanford Avenue staging area with 2,100 feet of elevation gain. The iconic summit pole offers sweeping views of the South Bay.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    address: '680 Stanford Ave, Fremont, CA 94539, USA'
  },
  {
    name: 'Tennessee Valley Trail',
    lat: 37.860487,
    lng: -122.5362384,
    description: 'An easy 3.4-mile round-trip through the Marin Headlands ending at a secluded cove beach. Great for families and beginners with mostly paved sections.',
    imageUrl: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200',
    address: '591 Tennessee Valley Rd, Mill Valley, CA 94941, USA'
  },
  {
    name: 'Purisima Creek Redwoods',
    lat: 37.423076,
    lng: -122.3603686,
    description: 'A lush old-growth redwood preserve in the Santa Cruz Mountains above Half Moon Bay. Multiple loop options ranging from 4 to 10 miles through fern-lined creeks.',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200',
    address: 'Half Moon Bay, CA 94019, USA'
  },
  {
    name: 'Eagle Falls Trail',
    lat: 38.9520158,
    lng: -120.1135197,
    description: 'A short 2-mile round-trip on the western shore of Lake Tahoe leading to Eagle Lake. Features a dramatic waterfall and granite staircases. Five-dollar parking fee at the trailhead.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200',
    address: 'South Lake Tahoe, CA 96150, USA'
  },
  {
    name: 'Mist Trail to Vernal Fall',
    lat: 37.726083,
    lng: -119.5490334,
    description: 'A strenuous 3-mile round-trip in Yosemite Valley climbing 1,000 feet via stone staircases alongside Vernal Fall. Hikers get drenched by spray in spring runoff season.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    address: 'Mist Trail, Yosemite National Park, CA 95389, USA'
  }
  ,
  {
    name: 'Vernal Falls Footbridge',
    lat: 37.7260607,
    lng: -119.5516341,
    description: 'A 2-mile out-and-back paved trail along the Mist Trail in Yosemite Valley leading to a footbridge with views of Vernal Fall in the distance. Moderate elevation gain, good water and restroom facilities at the bridge.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    address: 'John Muir Trail, Yosemite National Park, CA 95389, USA'
  }
];

const seedTrails = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);

    await Trail.deleteMany({});
    console.log('Existing trails removed.');

    const created = await Trail.insertMany(trails);
    console.log(`${created.length} trails seeded successfully.`);

    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.log(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedTrails();