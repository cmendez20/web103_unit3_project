import { pool } from './database.js';

async function getAllEvents() {
  const query = `
    SELECT * FROM events;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
}

export { getAllEvents };
