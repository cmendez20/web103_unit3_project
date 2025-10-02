const BASE_URL = "/api";

const getAllEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};

const getEventsByLocationId = async locationId => {
  try {
    const response = await fetch(`${BASE_URL}/events/locations/${locationId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching events for location ${locationId}:`, error);
    throw error;
  }
};

export default {
  getAllEvents,
  getEventsByLocationId,
};
