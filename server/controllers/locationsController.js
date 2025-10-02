import { pool } from './database.js';

async function getAllLocations() {
  const query = `
    SELECT * FROM locations;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all locations:', error);
    throw error;
  }
}

export { getAllLocations };
