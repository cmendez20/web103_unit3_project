import { pool } from './database.js';
import { eventsJSON } from '../data/events.js';

async function createTables() {
  const dropTableQuery = 'DROP TABLE IF EXISTS events, locations;';

  const createLocationsTableQuery = `
    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        location_name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
    );
  `;

  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        artists TEXT NOT NULL,
        date VARCHAR(255) NOT NULL,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
        genre TEXT NOT NULL,
        ticket_price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(dropTableQuery);
    await pool.query(createLocationsTableQuery);
    await pool.query(createEventsTableQuery);
    console.log('🎉 events & locations table created successfully');
  } catch (err) {
    console.error('⚠️ error creating events or locations table', err);
  }
}

async function seedTables() {
  await createTables();

  const uniqueLocations = new Map();
  eventsJSON.forEach(event => {
    if (!uniqueLocations.has(event.venue)) {
      uniqueLocations.set(event.venue, {
        name: event.venue,
        address: event.address,
        imageUrl: event.imageUrl,
      });
    }
  });

  const locationNameToIdMap = new Map();
  console.log('Seeding locations...');

  const insertLocationQuery = `
    INSERT INTO locations (location_name, address, image_url) 
    VALUES ($1, $2, $3) 
    RETURNING id, location_name;
  `;

  for (const location of uniqueLocations.values()) {
    try {
      const res = await pool.query(insertLocationQuery, [
        location.name,
        location.address,
        location.imageUrl,
      ]);
      const { id, location_name } = res.rows[0];
      locationNameToIdMap.set(location_name, id);
      console.log(`✅ Added location: ${location_name}`);
    } catch (err) {
      console.error(`⚠️ Error inserting location "${location.name}"`, err);
    }
  }

  console.log('Seeding events...');
  const insertEventQuery = `
      INSERT INTO events (
          event_name, artists, date, location_id, genre, ticket_price, image_url
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  for (const event of eventsJSON) {
    const locationId = locationNameToIdMap.get(event.venue);
    if (!locationId) {
      console.error(`Could not find ID for venue: ${event.venue}`);
      continue;
    }

    const values = [
      event.eventName,
      JSON.stringify(event.artists),
      event.date,
      locationId,
      event.genre,
      event.ticketPrice,
      event.imageUrl,
    ];

    try {
      await pool.query(insertEventQuery, values);
      console.log(`✅ ${event.eventName} added successfully`);
    } catch (err) {
      console.error('⚠️ error inserting event', err);
    }
  }
}

seedTables();
