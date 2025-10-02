const BASE_URL = "/api";

const getAllLocations = async () => {
  try {
    const response = await fetch(`${BASE_URL}/locations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all locations:", error);
    throw error;
  }
};

export default {
  getAllLocations,
};
