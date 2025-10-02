import { pool } from "../config/database.js";

async function getAllLocations(req, res) {
  const query = `
    SELECT * FROM locations;
  `;

  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all locations:", error);
    throw error;
  }
}

export { getAllLocations };
