import { pool } from "../config/database.js";

async function getAllEvents(req, res) {
  const query = `
    SELECT * FROM events;
  `;

  try {
    const result = await pool.query(query);
    result.json(result.rows);
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
}

async function getAllEvents(req, res) {
  const { locationId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE location_id = $1",
      [locationId]
    );

    result.json(result.rows);
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
}

export { getAllEvents, getAllEvents };
